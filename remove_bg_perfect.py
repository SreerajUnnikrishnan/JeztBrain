from PIL import Image

def unpremultiply_black(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for r, g, b, a in data:
        alpha = max(r, g, b)
        
        if alpha == 0:
            new_data.append((0, 0, 0, 0))
        else:
            # Unpremultiply the color to extract the true luminous color
            # We scale it slightly to boost the brightness
            new_r = min(255, int((r / alpha) * 255))
            new_g = min(255, int((g / alpha) * 255))
            new_b = min(255, int((b / alpha) * 255))
            
            # Reduce alpha slightly in the very dark areas to ensure no square edges
            # A smooth curve for alpha:
            adjusted_alpha = int((alpha / 255.0) ** 1.5 * 255)
            
            new_data.append((new_r, new_g, new_b, adjusted_alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

unpremultiply_black("public/shield_brain_hero.png", "public/shield_brain_hero_transparent.png")
