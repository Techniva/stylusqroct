#!/usr/bin/env python3
"""
Image Processor for QR Code Generation
Handles logo, background upload/processing, and merging QR codes with a background.
"""

import os
import sys
import time
import base64
from io import BytesIO
from pathlib import Path
from PIL import Image


class ImageProcessor:
    def __init__(self,
                 logo_dir="public/uploads/logos",
                 bg_dir="public/uploads/backgrounds"):
        self.logo_dir = Path(logo_dir)
        self.bg_dir = Path(bg_dir)
        self.logo_dir.mkdir(parents=True, exist_ok=True)
        self.bg_dir.mkdir(parents=True, exist_ok=True)

    # ---------------- LOGO ----------------
    def process_logo(self, image_path, output_name=None, size=(40, 40)):
        return self._process_image(
            image_path=image_path,
            output_name=output_name,
            size=size,
            target_dir=self.logo_dir,
            prefix="logo",
            add_white_bg=True
        )

    def process_base64_logo(self, base64_data, output_name=None, size=(40, 40)):
        return self._process_base64_image(
            base64_data=base64_data,
            output_name=output_name,
            size=size,
            target_dir=self.logo_dir,
            prefix="logo",
            add_white_bg=True
        )

    # ---------------- BACKGROUND ----------------
    def process_background(self, image_path, output_name=None, size=(800, 800)):
        return self._process_image(
            image_path=image_path,
            output_name=output_name,
            size=size,
            target_dir=self.bg_dir,
            prefix="bg",
            add_white_bg=False
        )

    def process_base64_background(self, base64_data, output_name=None, size=(800, 800)):
        return self._process_base64_image(
            base64_data=base64_data,
            output_name=output_name,
            size=size,
            target_dir=self.bg_dir,
            prefix="bg",
            add_white_bg=False
        )

    # ---------------- MERGE QR + BACKGROUND ----------------
    def merge_qr_with_background(self, qr_path, bg_path, output_path=None):
        """
        Merges a QR code image on top of a background image.
        Both images are centered. Output is saved to output_path or overwrites QR code.
        Output image size is always 800x800 for high QR scannability.
        """
        try:
            with Image.open(bg_path).convert("RGBA") as bg_img, \
                 Image.open(qr_path).convert("RGBA") as qr_img:

                # Resize both images to 800x800
                target_size = (800, 800)
                if bg_img.size != target_size:
                    bg_img = bg_img.resize(target_size, Image.Resampling.LANCZOS)
                if qr_img.size != target_size:
                    qr_img = qr_img.resize(target_size, Image.Resampling.LANCZOS)

                # Merge QR code onto background
                merged_img = Image.alpha_composite(bg_img, qr_img)

                if not output_path:
                    output_path = qr_path  # Overwrite QR file if no output path given

                merged_img.save(output_path, "PNG", optimize=True)

                return {
                    "success": True,
                    "output_path": str(output_path),
                    "size": os.path.getsize(output_path),
                    "dimensions": merged_img.size
                }
        except Exception as e:
            return {"success": False, "error": str(e)}

    # ---------------- COMMON ----------------
    def _process_image(self, image_path, output_name, size, target_dir, prefix, add_white_bg):
        try:
            with Image.open(image_path) as img:
                img = img.convert("RGBA")
                img = img.resize(size, Image.Resampling.LANCZOS)

                if add_white_bg:
                    background = Image.new("RGBA", size, (255, 255, 255, 255))
                    background.paste(img, (0, 0), img)
                    img = background

                if not output_name:
                    output_name = f"{prefix}_{int(time.time())}.png"

                output_path = target_dir / output_name
                img.save(output_path, "PNG", optimize=True)

                return {
                    "success": True,
                    "url": f"/uploads/{target_dir.name}/{output_name}",
                    "file_path": str(output_path),
                    "size": os.path.getsize(output_path),
                    "dimensions": img.size
                }
        except Exception as e:
            return {"success": False, "error": str(e)}

    def _process_base64_image(self, base64_data, output_name, size, target_dir, prefix, add_white_bg):
        try:
            if base64_data.startswith("data:image/"):
                base64_data = base64_data.split(",")[1]

            img_data = base64.b64decode(base64_data)
            img = Image.open(BytesIO(img_data)).convert("RGBA")
            img = img.resize(size, Image.Resampling.LANCZOS)

            if add_white_bg:
                background = Image.new("RGBA", size, (255, 255, 255, 255))
                background.paste(img, (0, 0), img)
                img = background

            if not output_name:
                output_name = f"{prefix}_{int(time.time())}.png"

            output_path = target_dir / output_name
            img.save(output_path, "PNG", optimize=True)

            return {
                "success": True,
                "url": f"/uploads/{target_dir.name}/{output_name}",
                "file_path": str(output_path),
                "size": os.path.getsize(output_path),
                "dimensions": img.size
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

    # ---------------- LIST / DELETE ----------------
    def list_images(self, target="logo"):
        target_dir = self.logo_dir if target == "logo" else self.bg_dir
        images = []
        for file_path in target_dir.glob("*.png"):
            images.append({
                "name": file_path.name,
                "url": f"/uploads/{target_dir.name}/{file_path.name}",
                "size": file_path.stat().st_size,
                "modified": file_path.stat().st_mtime
            })
        return images

    def delete_image(self, filename, target="logo"):
        target_dir = self.logo_dir if target == "logo" else self.bg_dir
        try:
            file_path = target_dir / filename
            if file_path.exists():
                file_path.unlink()
                return {"success": True, "message": f"Deleted {filename}"}
            else:
                return {"success": False, "error": f"File {filename} not found"}
        except Exception as e:
            return {"success": False, "error": str(e)}


# ---------------- CLI SUPPORT ----------------
if __name__ == "__main__":
    processor = ImageProcessor()

    if len(sys.argv) > 1:
        cmd = sys.argv[1]

        if cmd == "merge" and len(sys.argv) >= 4:
            qr_path = sys.argv[2]
            bg_path = sys.argv[3]
            output_path = sys.argv[4] if len(sys.argv) > 4 else None
            print(processor.merge_qr_with_background(qr_path, bg_path, output_path))

        elif cmd == "process_logo" and len(sys.argv) >= 3:
            print(processor.process_logo(sys.argv[2]))

        elif cmd == "process_background" and len(sys.argv) >= 3:
            print(processor.process_background(sys.argv[2]))

        elif cmd == "list" and len(sys.argv) >= 3:
            print(processor.list_images(sys.argv[2]))

        elif cmd == "delete" and len(sys.argv) >= 4:
            print(processor.delete_image(sys.argv[2], sys.argv[3]))

        else:
            print("Invalid command or missing arguments.")
    else:
        print("Usage examples:")
        print("  python image_processor.py merge qr.png bg.png [output.png]")
        print("  python image_processor.py process_logo logo.png")
        print("  python image_processor.py process_background bg.png")
