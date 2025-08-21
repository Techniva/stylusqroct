#!/usr/bin/env python3
"""
Logo Processor for QR Code Generation
Handles logo upload, processing, and optimization for QR code integration.
"""

import os
import sys
import json
import base64
from PIL import Image, ImageOps
from io import BytesIO
import argparse
from pathlib import Path

class LogoProcessor:
    def __init__(self, upload_dir="public/uploads/logos"):
        self.upload_dir = Path(upload_dir)
        self.upload_dir.mkdir(parents=True, exist_ok=True)
        
    def process_logo(self, image_path, output_name=None):
        """
        Process and optimize logo for QR code usage.
        
        Args:
            image_path (str): Path to the input image
            output_name (str): Optional output filename
            
        Returns:
            dict: Processing result with file info
        """
        try:
            # Open and process image
            with Image.open(image_path) as img:
                # Convert to RGBA if necessary
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')
                
                # Resize to optimal size for QR code (40x40 pixels)
                img = img.resize((40, 40), Image.Resampling.LANCZOS)
                
                # Create white background
                background = Image.new('RGBA', (40, 40), (255, 255, 255, 255))
                background.paste(img, (0, 0), img)
                
                # Generate output filename
                if not output_name:
                    timestamp = int(os.path.getmtime(image_path))
                    output_name = f"logo_{timestamp}.png"
                
                output_path = self.upload_dir / output_name
                
                # Save optimized logo
                background.save(output_path, 'PNG', optimize=True)
                
                # Generate public URL
                public_url = f"/uploads/logos/{output_name}"
                
                return {
                    "success": True,
                    "url": public_url,
                    "file_path": str(output_path),
                    "size": os.path.getsize(output_path),
                    "dimensions": background.size
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def process_base64_logo(self, base64_data, output_name=None):
        """
        Process logo from base64 data.
        
        Args:
            base64_data (str): Base64 encoded image data
            output_name (str): Optional output filename
            
        Returns:
            dict: Processing result
        """
        try:
            # Remove data URL prefix if present
            if base64_data.startswith('data:image/'):
                base64_data = base64_data.split(',')[1]
            
            # Decode base64 data
            image_data = base64.b64decode(base64_data)
            
            # Create image from bytes
            img = Image.open(BytesIO(image_data))
            
            # Convert to RGBA if necessary
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Resize to optimal size
            img = img.resize((40, 40), Image.Resampling.LANCZOS)
            
            # Create white background
            background = Image.new('RGBA', (40, 40), (255, 255, 255, 255))
            background.paste(img, (0, 0), img)
            
            # Generate output filename
            if not output_name:
                import time
                timestamp = int(time.time())
                output_name = f"logo_{timestamp}.png"
            
            output_path = self.upload_dir / output_name
            
            # Save optimized logo
            background.save(output_path, 'PNG', optimize=True)
            
            # Generate public URL
            public_url = f"/uploads/logos/{output_name}"
            
            return {
                "success": True,
                "url": public_url,
                "file_path": str(output_path),
                "size": os.path.getsize(output_path),
                "dimensions": background.size
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def list_processed_logos(self):
        """
        List all processed logos in the upload directory.
        
        Returns:
            list: List of logo files with their info
        """
        logos = []
        for file_path in self.upload_dir.glob("*.png"):
            logos.append({
                "name": file_path.name,
                "url": f"/uploads/logos/{file_path.name}",
                "size": file_path.stat().st_size,
                "modified": file_path.stat().st_mtime
            })
        return logos
    
    def delete_logo(self, filename):
        """
        Delete a processed logo.
        
        Args:
            filename (str): Name of the file to delete
            
        Returns:
            dict: Deletion result
        """
        try:
            file_path = self.upload_dir / filename
            if file_path.exists():
                file_path.unlink()
                return {"success": True, "message": f"Deleted {filename}"}
            else:
                return {"success": False, "error": f"File {filename} not found"}
        except Exception as e:
            return {"success": False, "error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="Logo Processor for QR Code Generation")
    parser.add_argument("--input", "-i", help="Input image file path")
    parser.add_argument("--base64", "-b", help="Base64 encoded image data")
    parser.add_argument("--output", "-o", help="Output filename")
    parser.add_argument("--list", "-l", action="store_true", help="List processed logos")
    parser.add_argument("--delete", "-d", help="Delete logo by filename")
    parser.add_argument("--upload-dir", "-u", default="public/uploads/logos", help="Upload directory")
    
    args = parser.parse_args()
    
    processor = LogoProcessor(args.upload_dir)
    
    if args.list:
        logos = processor.list_processed_logos()
        print(json.dumps(logos, indent=2))
        return
    
    if args.delete:
        result = processor.delete_logo(args.delete)
        print(json.dumps(result, indent=2))
        return
    
    if args.input:
        if not os.path.exists(args.input):
            print(json.dumps({"success": False, "error": "Input file not found"}, indent=2))
            return
        
        result = processor.process_logo(args.input, args.output)
        print(json.dumps(result, indent=2))
        return
    
    if args.base64:
        result = processor.process_base64_logo(args.base64, args.output)
        print(json.dumps(result, indent=2))
        return
    
    print("Logo Processor for QR Code Generation")
    print("Usage:")
    print("  python logo_processor.py --input image.png --output logo.png")
    print("  python logo_processor.py --base64 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'")
    print("  python logo_processor.py --list")
    print("  python logo_processor.py --delete logo_123.png")

if __name__ == "__main__":
    main() 