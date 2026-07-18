from PIL import Image

def crop_skyline_further(img_path, output_path):
    img = Image.open(img_path)
    width, height = img.size
    print(f"Original size: {width}x{height}")
    
    # Let's crop from x=580 to x=1024, and y=0 to y=1024
    cropped = img.crop((580, 0, 1024, 1024))
    cropped.save(output_path)
    print(f"Skyline cropped and saved to {output_path} with size {cropped.size}")

if __name__ == "__main__":
    img_path = r"d:\JeztBrain\public\images\hero_bg_clean_v5.png"
    output_path = r"d:\JeztBrain\public\images\skyline_bg.png"
    crop_skyline_further(img_path, output_path)
