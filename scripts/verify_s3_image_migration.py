from __future__ import annotations

import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

import boto3


MANIFEST_PATHS = (
    Path("/home/ubuntu/webdev-static-assets/edwardsamps-s3-migration/manifest.json"),
    Path("/home/ubuntu/webdev-static-assets/edwards-s3-migration/cloudfront-assets/manifest.json"),
)
BUCKET = "edwardsamps"
REGION = "us-east-2"


def verify_public_url(url: str) -> tuple[str, int, str]:
    request = Request(url, method="HEAD", headers={"User-Agent": "EdwardsAmps S3 verification/1.0"})
    try:
        with urlopen(request, timeout=30) as response:
            return url, response.status, response.headers.get_content_type()
    except HTTPError as error:
        return url, error.code, error.headers.get_content_type() if error.headers else ""
    except URLError as error:
        raise RuntimeError(f"Unable to reach {url}: {error}") from error


def main() -> None:
    records = [
        record
        for manifest_path in MANIFEST_PATHS
        for record in json.loads(manifest_path.read_text(encoding="utf-8"))
    ]
    if not records:
        raise RuntimeError("Migration manifest is empty.")

    s3 = boto3.client("s3", region_name=REGION)
    for record in records:
        response = s3.head_object(Bucket=BUCKET, Key=record["s3_key"])
        if response["ContentLength"] != record["bytes"]:
            raise RuntimeError(f"Byte length mismatch for {record['s3_key']}")
        if response.get("Metadata", {}).get("sha256") != record["sha256"]:
            raise RuntimeError(f"Checksum mismatch for {record['s3_key']}")

    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = [executor.submit(verify_public_url, record["s3_url"]) for record in records]
        results = [future.result() for future in as_completed(futures)]

    failed = [result for result in results if result[1] != 200]
    if failed:
        failures = "\n".join(f"{status} {url}" for url, status, _ in failed)
        raise RuntimeError(f"Public URL verification failed:\n{failures}")

    invalid_content_types = [result for result in results if not result[2].startswith("image/")]
    if invalid_content_types:
        failures = "\n".join(f"{content_type} {url}" for url, _, content_type in invalid_content_types)
        raise RuntimeError(f"Non-image content type returned:\n{failures}")

    print(f"Verified {len(records)} S3 objects by stored checksum and {len(results)} public image URLs by HTTP response.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Verification failed: {error}", file=sys.stderr)
        raise
