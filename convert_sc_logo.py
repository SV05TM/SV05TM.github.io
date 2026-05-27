from PIL import Image, ImageDraw, ImageFont
import os

sizes = [200, 512]
bg_color = (10, 15, 28)
bracket_color = (56, 189, 248)
text_color = (226, 232, 240)

for size in sizes:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = size // 10
    draw.rounded_rectangle([0, 0, size-1, size-1], radius=radius, fill=bg_color)

    font_size = int(size * 0.30)
    try:
        font = ImageFont.truetype("consola.ttf", font_size)
    except (OSError, IOError):
        font = ImageFont.load_default()

    full_text = "{SC}"
    bbox = draw.textbbox((0, 0), full_text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]

    current_x = x
    for char in "{SC}":
        color = bracket_color if char in "{}" else text_color
        draw.text((current_x, y), char, fill=color, font=font)
        char_bbox = draw.textbbox((0, 0), char, font=font)
        current_x += char_bbox[2] - char_bbox[0]

    output_file = os.path.join("images", f"sc-logo-{size}.png")
    img.save(output_file, "PNG")
    print(f"Created {output_file} ({size}x{size})")

print("Done!")
