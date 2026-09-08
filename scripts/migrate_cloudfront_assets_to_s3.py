from __future__ import annotations

import hashlib
import json
import mimetypes
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

import boto3
from botocore.exceptions import ClientError


PROJECT_ROOT = Path("/home/ubuntu/edwardsamps-rebuild")
SOURCE_DIRECTORIES = (PROJECT_ROOT / "client", PROJECT_ROOT / "shared")
DOWNLOAD_ROOT = Path("/home/ubuntu/webdev-static-assets/edwards-s3-migration/cloudfront-assets")
MANIFEST_PATH = DOWNLOAD_ROOT / "manifest.json"
BUCKET = "edwardsamps"
REGION = "us-east-2"
KEY_PREFIX = "storefront-images/2026-09-08/core"
URL_PATTERN = re.compile(r"https://d2xsxph8kpxj0f\.cloudfront\.net[^\"'`\s)>,;]+")
TEXT_EXTENSIONS = {".ts", ".tsx"}


def collect_source_urls() -> tuple[list[str], int]:
    urls: set[str] = set()
    reference_count = 0

    for directory in SOURCE_DIRECTORIES:
        for path in directory.rglob("*"):
            if path.suffix not in TEXT_EXTENSIONS:
                continue
            matches = URL_PATTERN.findall(path.read_text(encoding="utf-8"))
            urls.update(matches)
            reference_count += len(matches)

    return sorted(urls), reference_count


def asset_name(url: str) -> str:
    return url.rsplit("/", 1)[-1]


def download_asset(url: str, destination: Path) -> tuple[bytes, str]:
    request = Request(url, headers={"User-Agent": "EdwardsAmps S3 core asset migration/1.0"})
    try:
        with urlopen(request, timeout=60) as response:
            return response.read(), response.headers.get_content_type() or "application/octet-stream"
    except (HTTPError, URLError) as error:
        raise RuntimeError(f"Unable to download {url}: {error}") from error


def main() -> None:
    DOWNLOAD_ROOT.mkdir(parents=True, exist_ok=True)
    urls, reference_count = collect_source_urls()
    if not urls:
        if not MANIFEST_PATH.exists():
            raise RuntimeError("No residual CloudFront storefront image URLs or existing migration manifest were found.")
        records = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        urls = [record["source_url"] for record in records]
        reference_count = len(urls)
        print("No original CloudFront URLs remain in source; refreshing objects listed in the existing manifest.")

    print(f"Found {reference_count} source references representing {len(urls)} unique CloudFront assets.")
    s3 = boto3.client("s3", region_name=REGION)
    records: list[dict[str, str | int]] = []

    for index, url in enumerate(urls, start=1):
        filename = asset_name(url)
        content, content_type = download_asset(url, DOWNLOAD_ROOT / filename)
        local_path = DOWNLOAD_ROOT / filename
        local_path.write_bytes(content)
        digest = hashlib.sha256(content).hexdigest()
        key = f"{KEY_PREFIX}/{filename}"
        if content_type == "application/octet-stream":
            content_type = mimetypes.guess_type(filename)[0] or content_type

        try:
            current = s3.head_object(Bucket=BUCKET, Key=key)
            uploaded_digest = current.get("Metadata", {}).get("sha256")
            uploaded_content_type = current.get("ContentType")
        except ClientError as error:
            if error.response.get("Error", {}).get("Code") in {"404", "NoSuchKey", "NotFound"}:
                uploaded_digest = None
                uploaded_content_type = None
            else:
                raise

        if uploaded_digest != digest or uploaded_content_type != content_type:
            s3.put_object(
                Bucket=BUCKET,
                Key=key,
                Body=content,
                ContentType=content_type,
                CacheControl="public, max-age=31536000, immutable",
                Metadata={"source-url": url, "sha256": digest},
            )

        s3_url = f"https://{BUCKET}.s3.{REGION}.amazonaws.com/{key}"
        records.append(
            {
                "source_url": url,
                "s3_key": key,
                "s3_url": s3_url,
                "bytes": len(content),
                "content_type": content_type,
                "sha256": digest,
            }
        )
        print(f"[{index}/{len(urls)}] {filename} -> {s3_url}")

    MANIFEST_PATH.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} verified records to {MANIFEST_PATH}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Migration aborted: {error}", file=sys.stderr)
        raise
