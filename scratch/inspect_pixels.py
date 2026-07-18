from PIL import Image

img = Image.open(r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\media__1782922957551.png")
rgb_img = img.convert("RGB")
width, height = img.size

# Print brightness (average R, G, B) for every 10 pixels along y=550
y = 550
row_brightness = []
for x in range(0, width, 10):
    r, g, b = rgb_img.getpixel((x, y))
    brightness = (r + g + b) // 3
    row_brightness.append((x, brightness))

print("Row brightness at y=550 (every 10px):")
for i in range(0, len(row_brightness), 10):
    chunk = row_brightness[i:i+10]
    print(" ".join(f"{x}:{b}" for x, b in chunk))
