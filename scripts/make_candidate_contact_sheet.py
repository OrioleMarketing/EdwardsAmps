from PIL import Image, ImageOps, ImageDraw
from pathlib import Path

source_dir = Path('/home/ubuntu/webdev-static-assets/edwards-amps-candidates')
files = sorted(source_dir.glob('*.jpg'))
thumb_w, thumb_h = 260, 220
label_h = 36
cols = 2
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + label_h)), 'white')

for i, path in enumerate(files):
    img = Image.open(path).convert('RGB')
    img.thumbnail((thumb_w - 20, thumb_h - 20))
    canvas = Image.new('RGB', (thumb_w, thumb_h), 'white')
    x = (thumb_w - img.width) // 2
    y = (thumb_h - img.height) // 2
    canvas.paste(img, (x, y))

    draw = ImageDraw.Draw(canvas)
    draw.rectangle([0, 0, thumb_w - 1, thumb_h - 1], outline='black', width=1)

    label = Image.new('RGB', (thumb_w, label_h), '#f1f1f1')
    label_draw = ImageDraw.Draw(label)
    label_draw.text((10, 10), path.stem, fill='black')

    x0 = (i % cols) * thumb_w
    y0 = (i // cols) * (thumb_h + label_h)
    sheet.paste(canvas, (x0, y0))
    sheet.paste(label, (x0, y0 + thumb_h))

out = Path('/home/ubuntu/edwardsamps-rebuild/candidate-contact-sheet.jpg')
sheet.save(out, quality=92)
print(out)
