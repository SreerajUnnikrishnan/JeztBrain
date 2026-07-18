import sys
from PIL import Image

def unpremultiply_black(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for r, g, b, a in data:
        # The brightness determines the transparency
        alpha = max(r, g, b)
        
        if alpha == 0:
            new_data.append((0, 0, 0, 0))
        else:
            # We scale the RGB to extract the true color values
            new_r = min(255, int((r / alpha) * 255))
            new_g = min(255, int((g / alpha) * 255))
            new_b = min(255, int((b / alpha) * 255))
            
            # Smoothly fade out dark gray background areas (thresholding alpha)
            # If the pixel is very dark black/gray, make it completely transparent
            if alpha < 12:
                adjusted_alpha = 0
            else:
                # Smooth quadratic curve for alpha fade
                adjusted_alpha = int(((alpha - 12) / 243.0) ** 1.3 * 255)
                adjusted_alpha = max(0, min(255, adjusted_alpha))
                
            new_data.append((new_r, new_g, new_b, adjusted_alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    unpremultiply_black("public/jeztbrain_robot_enhanced.png", "public/jeztbrain_robot_transparent.png")
    print("Background removal complete!")
