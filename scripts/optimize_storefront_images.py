from __future__ import annotations

from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageOps


ASSET_ROOT = Path("/home/ubuntu/webdev-static-assets/edwardsamps-image-optimization")
ORIGINALS_DIR = ASSET_ROOT / "originals"
DERIVATIVES_DIR = ASSET_ROOT / "webp"

IMAGE_SOURCES = {
    "amplifiers-category": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/HxWvXrXByRutKLRu.png",
    "speaker-cabinets-category": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/oyCouNzgwsXcCoCJ.png",
    "effects-pedals-category": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/neTvaNnewbtGWlJi.png",
    "neville-featured-pairing": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/yAHIhJMJHoggjcEH.png",
    "elusive-overdrive-24w-combo": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/JACFUyXnlETZXiPN.png",
    "elusive-overdrive-24w-head": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/DZCtJmZcueXeWWHH.png",
    "elusive-overdrive-40w-combo": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/IkpsGzIgZaNNBWvN.png",
    "elusive-overdrive-40w-head": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/SAaBUSeQdkolQktJ.png",
    "king-richard-head": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/yzvzYwHkmOboYgNE.png",
    "hot-mama-head": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/RfPFxYKPksLKfmbf.png",
    "princess-reverb-combo": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/jwOShzdTobsIfyDg.png",
    "queen-reverb-combo": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/CKMthZKxMRyQquQv.png",
    "69-73-combo": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/YaXwzjrutnydogit.png",
    "elusive-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/JSHSnkrQfwrskOmq.png",
    "mystery-drive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/UKXgPRWjTOPghZqv.png",
    "blackjack-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/JenULkvLoYWtSgAx.png",
    "fuzzy-octave-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/koAMOaCtVLfXRpWf.png",
    "evil-grin-fuzz-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/YTRvttdlyAenIgMH.png",
}

LOCAL_IMAGE_SOURCES = {
    "elusive-overdrive-24w-combo-exact": Path(
        "/home/ubuntu/webdev-static-assets/elusiveoverdrivecombo1-reference.png"
    ),
    "elusive-overdrive-40w-combo-blue-floral-exact": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-40w-combo-exact-blue-floral.png"
    ),
    "elusive-overdrive-24w-combo-stage-exact": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-24w-combo-stage-exact-client.png"
    ),
    "elusive-overdrive-40w-combo-stage-exact-blue-floral": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-40w-combo-stage-exact-blue-floral.png"
    ),
    "elusive-overdrive-24w-combo-stage-badge-angle": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-24w-combo-stage-exact-badge-angle.png"
    ),
    "elusive-overdrive-40w-combo-stage-blue-floral-badge-angle": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-40w-combo-stage-exact-blue-floral-badge-angle.png"
    ),
    "elusive-overdrive-24w-combo-stage-matched-badge-angle": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-24w-combo-stage-matched-badge-angle.png"
    ),
    "elusive-overdrive-40w-combo-stage-matched-badge-angle": Path(
        "/home/ubuntu/webdev-static-assets/elusive-overdrive-40w-combo-stage-matched-badge-angle.png"
    ),
}

DERIVATIVES = {
    "desktop": {"max_width": 1440, "quality": 84},
    "mobile": {"max_width": 720, "quality": 78},
}


def download(url: str, destination: Path) -> None:
    request = Request(url, headers={"User-Agent": "EdwardsAmps image delivery optimizer/1.0"})
    with urlopen(request, timeout=60) as response:
        destination.write_bytes(response.read())


def make_webp(source_path: Path, destination_path: Path, max_width: int, quality: int) -> tuple[int, int]:
    with Image.open(source_path) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode in {"RGBA", "LA"} or (image.mode == "P" and "transparency" in image.info):
            working = image.convert("RGBA")
        else:
            working = image.convert("RGB")

        if working.width > max_width:
            height = round(working.height * (max_width / working.width))
            working = working.resize((max_width, height), Image.Resampling.LANCZOS)

        working.save(destination_path, "WEBP", quality=quality, method=6)
        return working.width, working.height


def main() -> None:
    ORIGINALS_DIR.mkdir(parents=True, exist_ok=True)
    DERIVATIVES_DIR.mkdir(parents=True, exist_ok=True)
    manifest_lines = ["asset\tvariant\twidth\theight\tbytes\tpath"]

    source_paths: dict[str, Path] = {}

    for key, url in IMAGE_SOURCES.items():
        original_path = ORIGINALS_DIR / f"{key}.png"
        if not original_path.exists():
            download(url, original_path)

        source_paths[key] = original_path

    for key, local_path in LOCAL_IMAGE_SOURCES.items():
        if not local_path.exists():
            raise FileNotFoundError(f"Generated source is not ready: {local_path}")

        source_paths[key] = local_path

    for key, original_path in source_paths.items():
        for variant, settings in DERIVATIVES.items():
            output_path = DERIVATIVES_DIR / f"{key}-{variant}.webp"
            width, height = make_webp(
                original_path,
                output_path,
                max_width=settings["max_width"],
                quality=settings["quality"],
            )
            manifest_lines.append(f"{key}\t{variant}\t{width}\t{height}\t{output_path.stat().st_size}\t{output_path}")

    (ASSET_ROOT / "manifest.tsv").write_text("\n".join(manifest_lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
