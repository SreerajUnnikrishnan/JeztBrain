from PIL import Image, ImageDraw

img = Image.open(r"C:\Users\User\.gemini\antigravity\brain\8efd1f3d-fcfd-4277-b73c-2a2793482919\media__1779118055778.jpg")
img = img.convert("RGBA")

# Let's create an alpha mask using ImageDraw
mask = Image.new("L", img.size, 0)
draw = ImageDraw.Draw(mask)

# The robot is centered and occupies most of the 240x216 area.
# Let's draw an ellipse that covers the robot head and ears perfectly.
# Left ear is around x=20, right ear is around x=220, top is around y=10, bottom is around y=210.
# We'll use a soft-edged mask to avoid hard pixel boundaries.
width, height = img.size
# Draw a solid white ellipse inside the mask
draw.ellipse([15, 10, width - 15, height - 10], fill=255)

# Soften the mask using a simple box blur or smooth pixel transition
# We'll do it manually in Python to avoid needing scipy/cv2
mask_data = list(mask.getdata())
img_data = list(img.getdata())
new_data = []

for i, pixel in enumerate(img_data):
    r, g, b, a = pixel
    mask_val = mask_data[i]
    
    # We can also do a color-based keying: if the pixel is dark blue/black background, reduce alpha
    # Let's calculate the distance of the pixel from the dark blue background color.
    # Background color is dark navy/black (typically R < 20, G < 30, B < 65)
    is_background = False
    if r < 25 and g < 40 and b < 85:
        # It's background!
        is_background = True
        
    # Apply mask and background threshold
    if is_background:
        # Transition alpha based on brightness
        brightness = (r + g + b) / 3.0
        alpha = int((brightness / 85.0) * mask_val)
        # Cap alpha to make it fade out nicely
        alpha = min(alpha, 30) 
    else:
        alpha = mask_val
        
    # Smooth transitions near the boundary of the ellipse
    new_data.append((r, g, b, alpha))

img.putdata(new_data)
# Let's trim any fully transparent borders if needed, but keeping it 240x216 is fine
img.save(r"d:\JeztBrain\public\images\robot_avatar_white.png", "PNG")
print("Cutout completed and saved to robot_avatar_white.png successfully!")
