import React, { useRef, useState } from "react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface LogoTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
  user?: { id: number; fullName: string; email: string; createdAt: string } | null;
}

const sampleBackgrounds = [
  { name: "Abstract 1", dataUrl: "/background-sample/bg1.jpg" },
  { name: "Abstract 2", dataUrl: "/background-sample/bg2.jpg" },
  { name: "Nature", dataUrl: "/background-sample/bg3.jpg" },
];

const sampleLogos = [
  { name: "Facebook", dataUrl: "/logo-sample/facebook-logo-icon.png" },
  { name: "Instagram", dataUrl: "/logo-sample/instagram-logo-icon.png" },
  { name: "LinkedIn", dataUrl: "/logo-sample/linkedin-logo-icon.png" },
  { name: "Pinterest", dataUrl: "/logo-sample/pinterest-social-network-icon.png" },
  { name: "WhatsApp", dataUrl: "/logo-sample/whatsapp-logo-icon.png" },
  { name: "YouTube", dataUrl: "/logo-sample/youtube-logo-icon.png" },
  { name: "Google Play", dataUrl: "/logo-sample/google-play-store-icon.png" },
  { name: "GPS Location", dataUrl: "/logo-sample/gps.png" },
];

const LogoTab: React.FC<LogoTabProps> = ({ qrSettings, onSettingsChange, user }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadImage = async (
    file: File,
    type: "logo" | "background"
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append(type, file);
      formData.append("userId", user?.id?.toString() || "guest");

      const response = await fetch(`/api/upload/process-${type}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.url) {
        return String(result.url);
      } else {
        setUploadError(result.error || "Upload failed");
        return null;
      }
    } catch (err) {
      setUploadError("Upload failed. Please try again.");
      return null;
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    const url = await uploadImage(file, "logo");
    if (url) {
      onSettingsChange({ ...qrSettings, logoImage: url });
    }
    setIsUploadingLogo(false);
  };

  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBg(true);
    const url = await uploadImage(file, "background");
    if (url) {
      onSettingsChange({ ...qrSettings, backgroundImage: url });
    }
    setIsUploadingBg(false);
  };

  const handleSampleClick = (type: "logo" | "background", dataUrl: string) => {
    if (type === "logo") {
      onSettingsChange({ ...qrSettings, logoImage: dataUrl });
    } else {
      onSettingsChange({ ...qrSettings, backgroundImage: dataUrl });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm flex flex-col gap-5 animate-fadeIn">
      {/* Logo Section */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-5 h-5 text-[#063970]" />
          <h3 className="text-sm font-semibold text-gray-800">Upload Logo</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sample Logos */}
          <div className="flex-[2]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sample Logos</label>
            <div className="flex flex-wrap gap-2">
              {sampleLogos.map((logo) => (
                <button
                  key={logo.name}
                  onClick={() => handleSampleClick("logo", logo.dataUrl)}
                  className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-[#063970]"
                >
                  <img src={logo.dataUrl} alt={logo.name} className="w-7 h-7 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Upload Logo */}
          <div className="flex-[1]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Custom Logo</label>
            <div className="flex items-center gap-3">
              {qrSettings.logoImage ? (
                <img src={qrSettings.logoImage} className="w-10 h-10 object-contain rounded-lg border" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg border">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <button
                  onClick={() => logoInputRef.current?.click()}
                  disabled={isUploadingLogo}
                  className="bg-[#063970] text-white px-4 py-2 rounded-full text-sm"
                >
                  {isUploadingLogo ? "Uploading..." : "Upload Logo"}
                </button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-5 h-5 text-[#063970]" />
          <h3 className="text-sm font-semibold text-gray-800">Upload Background</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4 ">
          {/* Sample Backgrounds */}
          <div className="flex-[2]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sample Backgrounds</label>
            <div className="flex flex-wrap gap-2">
              {sampleBackgrounds.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => handleSampleClick("background", bg.dataUrl)}
                  className="w-12 h-12 rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-[#063970]"
                >
                  <img src={bg.dataUrl} alt={bg.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Upload Background */}
          <div className="flex-[1]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Custom Background</label>
            <div className="flex items-center gap-3">
              {qrSettings.backgroundImage ? (
                <img src={qrSettings.backgroundImage} className="w-12 h-12 object-cover rounded-lg border" />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg border">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div>
                <button
                  onClick={() => bgInputRef.current?.click()}
                  disabled={isUploadingBg}
                  className="bg-[#063970] text-white px-4 py-2 rounded-full text-sm"
                >
                  {isUploadingBg ? "Uploading..." : "Upload Background"}
                </button>
                <input
                  ref={bgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBackgroundUpload}
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
    </div>
  );
};

export default LogoTab;
