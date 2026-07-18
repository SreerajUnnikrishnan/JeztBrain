import os
from PIL import Image

def remove_black_background(input_path, output_path):
    print(f"Opening input image: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for r, g, b, a in data:
        # Calculate brightness/luminance
        brightness = max(r, g, b)
        
        # Soft transition for near-black pixels to prevent harsh borders
        if brightness < 12:
            new_data.append((0, 0, 0, 0))
        elif brightness < 45:
            # Interpolate alpha between 0 and 255
            factor = (brightness - 12) / (45 - 12)
            alpha = int(factor * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully saved transparent image to: {output_path}")

input_img = r"C:\Users\User\.gemini\antigravity-ide\brain\9df8379d-1c5c-420c-bbb5-74082ab87357\jeztbrain_sentinel_white_profile_1781771531406.png"
output_img = r"d:\JeztBrain\public\cyber_sentinel_hero.png"

remove_black_background(input_img, output_img)
