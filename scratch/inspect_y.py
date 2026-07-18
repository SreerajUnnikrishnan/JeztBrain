from PIL import Image

img = Image.open(r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\media__1782922957551.png")
rgb_img = img.convert("RGB")
width, height = img.size

# Let's check brightness along the vertical line at x=250 for each pixel from y=300 to 625
x = 250
column_brightness = []
for y in range(300, height):
    r, g, b = rgb_img.getpixel((x, y))
    brightness = (r + g + b) // 3
    column_brightness.append((y, brightness))

print("Column brightness at x=250 (from y=300 onwards):")
for i in range(0, len(column_brightness), 10):
    chunk = column_brightness[i:i+10]
    print(" ".join(f"{y}:{b}" for y, b in chunk))
