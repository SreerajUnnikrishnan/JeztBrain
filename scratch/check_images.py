import os
from PIL import Image

def check_image_dimensions(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if "hero_bg" in file or "bg" in file:
                path = os.path.join(root, file)
                try:
                    img = Image.open(path)
                    print(f"File: {file} | Size: {img.size} | Mode: {img.mode}")
                except Exception as e:
                    print(f"Error reading {file}: {e}")

if __name__ == "__main__":
    check_image_dimensions(r"d:\JeztBrain\public")
