from PIL import Image

def crop_clean_skyline(img_path, output_path):
    img = Image.open(img_path)
    # Crop to exclude the cards at the bottom (below y=345) and all text on the left (left of x=450)
    cropped = img.crop((450, 0, 1024, 345))
    cropped.save(output_path)
    print(f"Cropped clean skyline saved to {output_path} with size {cropped.size}")

if __name__ == "__main__":
    img_path = r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\media__1782922957551.png"
    output_path = r"d:\JeztBrain\public\images\skyline_clean_cropped.png"
    crop_clean_skyline(img_path, output_path)
