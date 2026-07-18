from PIL import Image

def make_transparent_glow(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        brightness = max(r, g, b)
        
        if brightness < 15:
            new_data.append((0, 0, 0, 0))
        else:
            alpha = min(255, int(brightness * 1.3))
            new_data.append((r, g, b, alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

make_transparent_glow("public/clean_wireframe_shield.png", "public/true_transparent_shield.png")
