from PIL import Image

def crop_exact(img_path, output_path):
    img = Image.open(img_path)
    # Crop exactly using the coordinates: left=50, top=475, right=480, bottom=626
    cropped = img.crop((50, 475, 480, 626))
    cropped.save(output_path)
    print(f"Saved exact crop to {output_path} with size {cropped.size}")

if __name__ == "__main__":
    img_path = r"C:\Users\User\.gemini\antigravity-ide\brain\e1712021-c3a4-4be2-b492-289f08d326e4\media__1782922957551.png"
    output_path = r"d:\JeztBrain\public\images\office_building_night.png"
    crop_exact(img_path, output_path)
