import os
from PIL import Image

def compose_4k_background(input_path, output_path):
    print("Composing 4K background from the pin-sharp high-quality asset...")
    width, height = 3840, 2160
    bg_color = (3, 7, 18, 255) # #030712
    
    # Create black base canvas
    base = Image.new("RGBA", (width, height), bg_color)
    
    # Open high-quality source image
    img = Image.open(input_path).convert("RGBA")
    
    # Resize to 2160x2160 to fit height of 4K canvas using LANCZOS (high-quality sharpening filter)
    img_scaled = img.resize((2160, 2160), Image.Resampling.LANCZOS)
    
    # Paste onto the right side of the canvas (from x=1680 to x=3840)
    paste_x = width - 2160 # 1680
    base.paste(img_scaled, (paste_x, 0), img_scaled)
    
    # Apply horizontal and vertical blending gradients
    pixels = base.load()
    
    print("Applying blending gradients...")
    for y in range(height):
        for x in range(paste_x, width):
            # Horizontal blending factor:
            # - x <= 1680: solid black
            # - x >= 2100: fully visible
            # - 1680 < x < 2100: linear fade
            h_factor = 1.0
            if x < 1680:
                h_factor = 0.0
            elif x < 2100:
                h_factor = (x - 1680) / (2100 - 1680)
                
            # Vertical blending factor:
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
                
    # Save the 4K composed image
    print(f"Saving final 4K composed image to: {output_path}")
    base.save(output_path, "PNG")
    print("4K Background composed successfully!")

if __name__ == "__main__":
    input_img = r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\skyline_mesh_sharp_4k_1782925833045.png"
    output_img = r"d:\JeztBrain\public\images\skyline_bg_4k.png"
    compose_4k_background(input_img, output_img)
