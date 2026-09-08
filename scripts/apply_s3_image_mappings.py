from __future__ import annotations

import json
from pathlib import Path


PROJECT_ROOT = Path("/home/ubuntu/edwardsamps-rebuild")
MANIFEST_PATH = Path("/home/ubuntu/webdev-static-assets/edwardsamps-s3-migration/manifest.json")
SOURCE_DIRECTORIES = (PROJECT_ROOT / "client", PROJECT_ROOT / "shared")
TEXT_EXTENSIONS = {".ts", ".tsx"}


def main() -> None:
    records = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    replacements = {record["source_url"]: record["s3_url"] for record in records}
    remaining = set(replacements)
    changed_files = 0
    replacement_count = 0

    for directory in SOURCE_DIRECTORIES:
        for path in directory.rglob("*"):
            if path.suffix not in TEXT_EXTENSIONS:
                continue

            original = path.read_text(encoding="utf-8")
            updated = original
            for source_url, s3_url in replacements.items():
                if source_url in updated:
                    occurrences = updated.count(source_url)
                    updated = updated.replace(source_url, s3_url)
                    remaining.discard(source_url)
                    replacement_count += occurrences

            if updated != original:
                path.write_text(updated, encoding="utf-8")
                changed_files += 1
                print(f"Updated {path.relative_to(PROJECT_ROOT)}")

    if remaining:
        missing = "\n".join(sorted(remaining))
        raise RuntimeError(f"Manifest sources not found in current client/shared source:\n{missing}")

    print(f"Replaced {replacement_count} storefront image references across {changed_files} source files.")


if __name__ == "__main__":
    main()
