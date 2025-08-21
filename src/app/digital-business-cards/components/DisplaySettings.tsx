"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

type DisplaySettingsProps = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
};

export default function DisplaySettings({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
}: DisplaySettingsProps) {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  console.log(primaryColor); // Debugging line
  console.log(secondaryColor); // Debugging line
  
  // Helper function to create a preview URL for images
  const makePreview = (file: File | null, setter: (url: string | null) => void) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setter(null);
    }
  };

  useEffect(() => {
    return makePreview(profilePhoto, setProfileUrl);
  }, [profilePhoto]);

  useEffect(() => {
    return makePreview(coverPhoto, setCoverUrl);
  }, [coverPhoto]);

  useEffect(() => {
    return makePreview(companyLogo, setLogoUrl);
  }, [companyLogo]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) setter(e.target.files[0]);
  };

  return (
    <div className="bg-white/80 text-xs">
      {/* Wrap all sections in a single row */}
      <div className="flex gap-6 flex-wrap ">
        {/* Upload Images */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-medium text-[#021B35] mb-2">Images</h3>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: "Profile", setter: setProfilePhoto, url: profileUrl, shape: "rounded-full" },
              { label: "Cover", setter: setCoverPhoto, url: coverUrl, shape: "rounded-full" },
              { label: "Logo", setter: setCompanyLogo, url: logoUrl, shape: "rounded-full" },
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
                  onChange={(e) => handleFileChange(e, item.setter)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Theme Colors */}
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

        {/* Primary & Secondary Colors */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-medium text-[#021B35] mb-2">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
