from PIL import Image, ImageOps

src = "/home/ubuntu/upload/Logo.jpg"
out = "/home/ubuntu/webdev-static-assets/edwards-logo-original-white.png"

img = Image.open(src).convert("L")
# Build alpha from darkness so the light background disappears and the dark logo remains.
alpha = ImageOps.invert(img)
# Increase contrast so the mark stays crisp while preserving the original shape.
alpha = alpha.point(lambda p: 0 if p < 18 else min(255, int((p - 18) * 1.35)))
rgba = Image.new("RGBA", img.size, (255, 255, 255, 0))
rgba.putalpha(alpha)

bbox = alpha.getbbox()
if bbox:
    left, top, right, bottom = bbox
    margin = 18
    left = max(0, left - margin)
    top = max(0, top - margin)
    right = min(img.size[0], right + margin)
    bottom = min(img.size[1], bottom + margin)
    rgba = rgba.crop((left, top, right, bottom))

rgba.save(out)
print(out)
