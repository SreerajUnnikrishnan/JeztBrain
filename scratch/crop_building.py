from PIL import Image

def crop_building(img_path, output_path):
    img = Image.open(img_path)
    rgb_img = img.convert("RGB")
    width, height = img.size
    
    # We know the building photo is approximately in y=[475, 625], x=[50, 480]
    # Let's find the exact boundary by checking pixels.
    # Scan from x=20 to x=100 at y=500 to find the left boundary of the building image
    left_x = None
    for x in range(20, 100):
        r, g, b = rgb_img.getpixel((x, 500))
        # Building image has a border or content that is brighter than pure page bg.
        # Page background is dark gray/navy.
        if (r > 15 or g > 15 or b > 15):
            left_x = x
            break
            
    # Scan from x=400 to x=500 at y=500 to find the right boundary
    right_x = None
    for x in range(490, 400, -1):
        r, g, b = rgb_img.getpixel((x, 500))
        if (r > 15 or g > 15 or b > 15):
            right_x = x
            break
            
    # Scan from y=450 to y=500 at x=250 to find the top boundary
    top_y = None
    for y in range(450, 500):
        r, g, b = rgb_img.getpixel((250, y))
        if (r > 15 or g > 15 or b > 15):
            top_y = y
            break
            
    # Scan from y=625 to y=550 at x=250 to find the bottom boundary
    bottom_y = None
    for y in range(625, 550, -1):
        r, g, b = rgb_img.getpixel((250, y))
        if (r > 15 or g > 15 or b > 15):
            bottom_y = y
            break
            
    print(f"Refined box: left={left_x}, top={top_y}, right={right_x}, bottom={bottom_y}")
    
    if left_x and top_y and right_x and bottom_y:
        cropped = img.crop((left_x, top_y, right_x, bottom_y))
        cropped.save(output_path)
        print(f"Successfully cropped building image: {cropped.size} saved to {output_path}")
    else:
        # Hardcoded fallback that is very close
        cropped = img.crop((50, 475, 480, 626))
        cropped.save(output_path)
        print("Used fallback crop: (50, 475, 480, 626)")

if __name__ == "__main__":
    img_path = r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\media__1782922957551.png"
    output_path = r"d:\JeztBrain\public\images\office_building_night.png"
    crop_building(img_path, output_path)
