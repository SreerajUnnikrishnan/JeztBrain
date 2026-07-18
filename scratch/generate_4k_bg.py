import os
from PIL import Image

def generate_4k_background_from_crop(input_path, output_path):
    print("Initializing 4K background generation from clean crop...")
    width, height = 3840, 2160
    bg_color = (3, 7, 18, 255) # #030712 (dark navy/black background)
    
    # Load cropped image
    img = Image.open(input_path).convert("RGBA")
    
    # Resize directly to 3840x2160 using Lanczos high-quality resampling
    img_scaled = img.resize((width, height), Image.Resampling.LANCZOS)
    
    # Apply horizontal and vertical blending gradients directly to the scaled image
    pixels = img_scaled.load()
    
    print("Applying blending gradients...")
    for y in range(height):
        for x in range(width):
            # Horizontal blending factor:
            # - x <= 1000: solid black
            # - x >= 2200: fully visible skyline
            # - 1000 < x < 2200: linear fade
            h_factor = 1.0
            if x <= 1000:
                h_factor = 0.0
            elif x < 2200:
                h_factor = (x - 1000) / (2200 - 1000)
                
            # Vertical blending factor (fade to black at the bottom to match next section):
            # - y >= 2100: solid black
            # - y <= 1500: fully visible
            # - 1500 < y < 2100: linear fade
            v_factor = 1.0
            if y > 1500:
                if y >= 2100:
                    v_factor = 0.0
                else:
                    v_factor = 1.0 - (y - 1500) / (2100 - 1500)
                    
            factor = h_factor * v_factor
            
            if factor < 1.0:
                r, g, b, a = pixels[x, y]
                # Blend with background color
                nr = int(r * factor + bg_color[0] * (1.0 - factor))
                ng = int(g * factor + bg_color[1] * (1.0 - factor))
                nb = int(b * factor + bg_color[2] * (1.0 - factor))
                pixels[x, y] = (nr, ng, nb, a)
                
    # Save the 4K background image
    print(f"Saving final 4K image to: {output_path}")
    img_scaled.save(output_path, "PNG")
    print("4K Background generated successfully!")

if __name__ == "__main__":
    input_img = r"d:\JeztBrain\public\images\skyline_clean_cropped.png"
    output_img = r"d:\JeztBrain\public\images\skyline_bg_4k.png"
    generate_4k_background_from_crop(input_img, output_img)
