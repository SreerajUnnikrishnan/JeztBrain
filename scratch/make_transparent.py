from PIL import Image

# Load the image
img = Image.open(r"C:\Users\User\.gemini\antigravity\brain\8efd1f3d-fcfd-4277-b73c-2a2793482919\white_robot_avatar_black_1779117482983.png")
img = img.convert("RGBA")

data = img.getdata()
new_data = []
for item in data:
    # If the pixel is very dark (black background), make it transparent
    r, g, b, a = item
    if r < 12 and g < 12 and b < 12:
        new_data.append((0, 0, 0, 0))
    else:
        # Soft transition for dark edge pixels to prevent jaggedness
        brightness = (r + g + b) / 3.0
        if brightness < 35:
            alpha = int((brightness / 35.0) * 255)
            new_data.append((r, g, b, min(alpha, a)))
        else:
            new_data.append((r, g, b, a))

img.putdata(new_data)
img.save(r"d:\JeztBrain\public\images\robot_avatar_white.png", "PNG")
print("Saved transparent white robot avatar successfully!")
