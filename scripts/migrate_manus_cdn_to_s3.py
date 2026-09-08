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
DOWNLOAD_ROOT = Path("/home/ubuntu/webdev-static-assets/edwardsamps-s3-migration")
MANIFEST_PATH = DOWNLOAD_ROOT / "manifest.json"
BUCKET = "edwardsamps"
REGION = "us-east-2"
KEY_PREFIX = "storefront-images/2026-09-08"
URL_PATTERN = re.compile(r"https://files\.manuscdn\.com[^\"'`\s)>,;]+")
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
    request = Request(url, headers={"User-Agent": "EdwardsAmps S3 migration/1.0"})
    try:
        with urlopen(request, timeout=60) as response:
            content_type = response.headers.get_content_type() or "application/octet-stream"
            content = response.read()
    except (HTTPError, URLError) as error:
        raise RuntimeError(f"Unable to download {url}: {error}") from error

    destination.write_bytes(content)
    return content, content_type


def existing_sha256(s3, key: str) -> str | None:
    try:
        response = s3.head_object(Bucket=BUCKET, Key=key)
    except ClientError as error:
        if error.response.get("Error", {}).get("Code") in {"404", "NoSuchKey", "NotFound"}:
            return None
        raise

    return response.get("Metadata", {}).get("sha256")


def public_url(key: str) -> str:
    return f"https://{BUCKET}.s3.{REGION}.amazonaws.com/{key}"


def main() -> None:
    DOWNLOAD_ROOT.mkdir(parents=True, exist_ok=True)
    urls, reference_count = collect_source_urls()
    if not urls:
        raise RuntimeError("No storefront Manus CDN URLs were found. Stop and review the source inventory before migration.")

    print(f"Found {reference_count} source references representing {len(urls)} unique Manus CDN assets.")

    s3 = boto3.client("s3", region_name=REGION)
    records: list[dict[str, str | int]] = []

    for index, url in enumerate(urls, start=1):
        filename = asset_name(url)
        local_path = DOWNLOAD_ROOT / filename
        key = f"{KEY_PREFIX}/{filename}"
        content, content_type = download_asset(url, local_path)
        digest = hashlib.sha256(content).hexdigest()

        if existing_sha256(s3, key) != digest:
            if content_type == "application/octet-stream":
                content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"

            s3.put_object(
                Bucket=BUCKET,
                Key=key,
                Body=content,
                ContentType=content_type,
                CacheControl="public, max-age=31536000, immutable",
                Metadata={"source-url": url, "sha256": digest},
            )

        records.append(
            {
                "source_url": url,
                "s3_key": key,
                "s3_url": public_url(key),
                "bytes": len(content),
                "content_type": content_type,
                "sha256": digest,
            }
        )
        print(f"[{index}/{len(urls)}] {filename} -> {public_url(key)}")

    MANIFEST_PATH.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} verified records to {MANIFEST_PATH}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Migration aborted: {error}", file=sys.stderr)
        raise
