from PIL import Image

def perfect_transparent_circle(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    cx, cy = width / 2, height / 2
    max_radius = min(width, height) * 0.48
    
    data = img.getdata()
    new_data = []
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = data[y * width + x]
            
            dist = ((x - cx)**2 + (y - cy)**2) ** 0.5
            
            if dist > max_radius:
                new_data.append((0, 0, 0, 0))
                continue
                
            brightness = max(r, g, b)
            if brightness < 20:
                new_data.append((0, 0, 0, 0))
            else:
                # Map to cyan color
                new_data.append((0, 212, 255, brightness))
                
    img.putdata(new_data)
    img.save(output_path, "PNG")

perfect_transparent_circle("public/clean_wireframe_shield.png", "public/final_shield.png")
