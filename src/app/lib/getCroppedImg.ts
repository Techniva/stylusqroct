// src/app/lib/getCroppedImg.ts

export default function getCroppedImg(
    imageSrc: string,
    crop: { x: number; y: number; width: number; height: number },
    outputFormat: "jpeg" | "png" = "png"
  ) {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous"; // Handle cross-origin images
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas context not found");
  
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height); // preserve transparency
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
  
        const dataUrl =
          outputFormat === "jpeg"
            ? canvas.toDataURL("image/jpeg")
            : canvas.toDataURL("image/png");
  
        resolve(dataUrl);
      };
  
      image.onerror = () => reject("Failed to load image");
    });
  }
  