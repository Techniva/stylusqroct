"use client";

import React, { FC, useState, DragEvent } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/app/lib/getCroppedImg";

interface UploadFile {
  id: string;
  name: string;
  url: string;
}

interface UploadsMenuProps {
  uploadedFiles: UploadFile[];
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectFile: (fileId: string, fileUrl: string) => void;
  handleDeleteFile: (fileId: string) => void;
  handleAddFilter: (fileUrl: string) => void;
  selectedFileId?: string | null;
}

const filters = [
  { name: "Original", className: "" },
  { name: "Grayscale", className: "grayscale" },
  { name: "Sepia", className: "sepia" },
  { name: "Bright", className: "brightness-125" },
  { name: "Contrast", className: "contrast-125" },
  { name: "Pixelate", className: "pixelate" },
  { name: "Glow", className: "drop-shadow-[0_0_10px_rgba(0,0,255,0.7)]" },
];

const customStyles = `
.pixelate {
  image-rendering: pixelated;
  transform: scale(1.2);
}
.mask-circle img {
  clip-path: circle(50% at 50% 50%);
}
.mask-rectangle img {
  clip-path: inset(0 round 12px);
}
`;

const UploadsMenu: FC<UploadsMenuProps> = ({
  uploadedFiles,
  handleAddImage,
  handleSelectFile,
  handleDeleteFile,
  handleAddFilter,
  selectedFileId,
}) => {
  const [dragOver, setDragOver] = useState(false);

  // Cropper state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [cropId, setCropId] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1); // default square

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const syntheticEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleAddImage(syntheticEvent);
    }
  };

  const showCropper = (id: string, url: string) => {
    setCropId(id);
    setCropImage(url);
    setCropModalOpen(true);
    setAspectRatio(1); // reset to square by default
    setZoom(1); // reset zoom
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (cropImage && cropId && croppedAreaPixels) {
      const croppedUrl = await getCroppedImg(cropImage, croppedAreaPixels, "png");

      // Replace the original image URL with cropped URL
      const index = uploadedFiles.findIndex((f) => f.id === cropId);
      if (index !== -1) {
        uploadedFiles[index].url = croppedUrl;
      }

      setCropModalOpen(false);
      setCropImage(null);
      setCropId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-[500px] overflow-y-auto scrollbar-hide">
      <style>{customStyles}</style>

      {/* Drag & Upload */}
      <div
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition 
        ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("image-upload-input")?.click()}
      >
        <span className="text-sm font-medium text-gray-700">
          Drag & drop your image or click to upload
        </span>
        <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF</span>
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="hidden"
        />
      </div>

      {uploadedFiles.length === 0 && (
        <div className="text-center text-gray-500 text-xs mt-4">No uploads found</div>
      )}

      <div className="flex flex-col gap-6 mt-2">
        {uploadedFiles.map((file) => (
          <div
            key={file.id}
            className={`border rounded-lg shadow-lg p-3 transition-transform ${
              selectedFileId === file.id ? "ring-2 ring-blue-500 scale-105" : ""
            }`}
          >
            {/* Main Image with Crop Overlay */}
            <div
              className="relative w-32 h-32 cursor-pointer"
              onClick={() => showCropper(file.id, file.url)}
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                <span className="text-white font-semibold text-sm">Crop</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.id); }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                title="Delete"
              >
                ✕
              </button>
            </div>

            {/* Filter Previews */}
            <div className="mt-3">
              <span className="text-xs font-medium text-gray-600 mb-1 block">
                Filter Previews (Choose Shape)
              </span>

              {/* Circle Previews */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {filters.map((f, i) => (
                  <div
                    key={`circle-${file.id}-${i}`}
                    className="border rounded-lg relative p-1 flex flex-col items-center cursor-pointer group"
                    onClick={() => handleAddFilter(file.url)}
                  >
                    <div className="w-full h-20 overflow-hidden mask-circle">
                      <img
                        src={file.url}
                        alt={`circle-${f.name}`}
                        className={`w-full h-full object-cover ${f.className}`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1">Circle {f.name}</span>

                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-all duration-300 transform scale-75 group-hover:scale-100 cursor-pointer">
                      <span className="text-white text-3xl animate-pulse">+</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rectangle Previews */}
              <div className="grid grid-cols-3 gap-2">
                {filters.map((f, i) => (
                  <div
                    key={`rect-${file.id}-${i}`}
                    className="border rounded-lg relative p-1 flex flex-col items-center cursor-pointer group"
                    onClick={() => handleAddFilter(file.url)}
                  >
                    <div className="w-full h-20 overflow-hidden mask-rectangle">
                      <img
                        src={file.url}
                        alt={`rect-${f.name}`}
                        className={`w-full h-full object-cover ${f.className}`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1">Rectangle {f.name}</span>

                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-all duration-300 transform scale-75 group-hover:scale-100 cursor-pointer">
                      <span className="text-white text-3xl animate-pulse">+</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crop Modal */}
      {cropModalOpen && cropImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative w-[400px] h-[450px]">
            {/* Aspect Ratio Selector */}
            <div className="absolute top-2 left-2 flex gap-2">
              <button
                className={`px-2 py-1 rounded ${aspectRatio === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setAspectRatio(1)}
              >
                1:1
              </button>
              <button
                className={`px-2 py-1 rounded ${aspectRatio === undefined ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setAspectRatio(undefined)}
              >
                Free
              </button>
            </div>

            <Cropper
              image={cropImage}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />

            {/* Zoom Slider */}
            <div className="absolute bottom-16 left-4 right-4 flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={saveCroppedImage}
              className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Crop
            </button>
            <button
              onClick={() => setCropModalOpen(false)}
              className="absolute top-2 right-2 text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadsMenu;
