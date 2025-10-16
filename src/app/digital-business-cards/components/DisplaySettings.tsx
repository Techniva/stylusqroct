"use client";

import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import Cropper from "react-easy-crop";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DisplaySettingsProps = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  uniqueCode: string;
  // ✅ Add these new props
  profileUrl: string | null;
  setProfileUrl: React.Dispatch<React.SetStateAction<string | null>>;
  coverUrl: string | null;
  setCoverUrl: React.Dispatch<React.SetStateAction<string | null>>;
  logoUrl: string | null;
  setLogoUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

// ✅ Utility: crop image with exact pixels
async function getCroppedImage(
  file: File,
  croppedAreaPixels: { x: number; y: number; width: number; height: number }
) {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9); // ✅ JPEG, matches backend
  });
}

export default function DisplaySettings({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  uniqueCode,
  profileUrl,
  setProfileUrl,
  coverUrl,
  setCoverUrl,
  logoUrl,
  setLogoUrl,
}: DisplaySettingsProps) {
  
  // Modal state
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  const handleCropComplete = useCallback((_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleUpload = async () => {
    if (!file || !croppedAreaPixels) return;

    const blob = await getCroppedImage(file, croppedAreaPixels);
    if (!blob) return;

    const formData = new FormData();
    formData.append("file", new File([blob], "profile.jpg", { type: "image/jpeg" }));
    formData.append("uniqueCode", uniqueCode);

    try {
      const res = await fetch("/api/digital-business-cards/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setProfileUrl(data.url);
        setOpen(false);
        setFile(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white/80 text-xs">
      <div className="flex flex-wrap gap-6">
        {/* Column 1: Upload Images */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-medium text-[#021B35] mb-2">Images</h3>
          <div className="flex gap-3 flex-wrap">
            {/* Profile (opens modal) */}
            <div
              className="h-16 w-16 rounded-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition overflow-hidden shadow border bg-gray-50"
              onClick={() => setOpen(true)}
            >
              {profileUrl ? (
                <img src={profileUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-600 text-[10px]">
                  <Upload className="w-4 h-4 mb-0.5 text-[#021B35]" />
                  Profile
                </div>
              )}
            </div>

            {/* Cover and Logo */}
            {[
              { label: "Cover", setter: setCoverUrl, url: coverUrl, shape: "rounded" },
              { label: "Logo", setter: setLogoUrl, url: logoUrl, shape: "rounded" },
            ].map((item) => (
              <label
                key={item.label}
                className={`h-16 w-16 ${item.shape} flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition overflow-hidden shadow border bg-gray-50`}
              >
                {item.url ? (
                  <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-gray-600 text-[10px]">
                    <Upload className="w-4 h-4 mb-0.5 text-[#021B35]" />
                    {item.label}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (!e.target.files || !e.target.files[0]) return;
                    const f = e.target.files[0];
                    const formData = new FormData();
                    formData.append("file", f);
                    formData.append("uniqueCode", uniqueCode); // ✅ now included
                    const res = await fetch("/api/digital-business-cards/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.url) item.setter(data.url);
                  }}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Column 2: Theme Presets */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-medium text-[#021B35] mb-2">Theme</h3>
          <div className="flex gap-3 flex-wrap">
            {[
              { primary: "#FCC736", secondary: "#2196F3" },
              { primary: "#4CAF50", secondary: "#FFC107" },
              { primary: "#E91E63", secondary: "#9C27B0" },
            ].map((theme, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrimaryColor(theme.primary);
                  setSecondaryColor(theme.secondary);
                }}
                className={`h-16 w-16 rounded-full transition hover:scale-105 shadow ${
                  primaryColor === theme.primary && secondaryColor === theme.secondary
                    ? "ring-2 ring-[#021B35] scale-110"
                    : "ring-1 ring-gray-300"
                }`}
                style={{
                  background: `conic-gradient(${theme.primary} 0% 50%, ${theme.secondary} 50% 100%)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Column 3: Custom Colors */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-medium text-[#021B35] mb-2">Custom Colors</h3>
          <div className="flex flex-wrap gap-4">
            {/* Primary */}
            <div className="flex flex-col gap-1">
              <span className="text-[#021B35] font-medium text-[11px]">Primary</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="border rounded px-2 py-0.5 text-[11px] w-20 focus:ring-1 focus:ring-[#021B35] focus:outline-none"
                />
              </div>
            </div>

            {/* Secondary */}
            <div className="flex flex-col gap-1">
              <span className="text-[#021B35] font-medium text-[11px]">Secondary</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="border rounded px-2 py-0.5 text-[11px] w-20 focus:ring-1 focus:ring-[#021B35] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Profile Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md p-4 sm:p-5">
          <DialogHeader>
            <DialogTitle>Upload Profile Photo</DialogTitle>
          </DialogHeader>

          <input type="file" accept="image/*" onChange={handleFileSelect} className="mb-3" />

          {file && (
            <div className="relative w-full h-52 sm:h-60 md:h-64 lg:h-72 bg-gray-100 rounded overflow-hidden">
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
          )}

          {file && (
            <div className="mt-2">
              <span className="text-xs text-gray-600">Zoom</span>
              <Slider
                min={0.5}
                max={2}
                step={0.01}
                value={zoom}
                onChange={(value) => typeof value === "number" && setZoom(value)}
              />
            </div>
          )}

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!file}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
