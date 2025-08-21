import React from "react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { qrSVGs, cornerSVGs, eyeSVGs } from "./qrSvgPresets";

interface ShapeTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const ShapeTab: React.FC<ShapeTabProps> = ({ qrSettings, onSettingsChange }) => {
  const handleSettingChange = (key: keyof QRCodeSettings, value: string) => {
    const newSettings = { ...qrSettings, [key]: value };
    onSettingsChange(newSettings);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleSettingChange('backgroundImage', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Body Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white p-3 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-xs text-gray-700 font-medium">
          Body Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto " style={{scrollbarWidth: "none", msOverflowStyle: "none",}}>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 min-w-max">
            {qrSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('qrShape', shape.value)}
                className={`p-1 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.qrShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white p-3 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-xs text-gray-700 font-medium">
          Corner Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto " style={{scrollbarWidth: "none", msOverflowStyle: "none",}}>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 min-w-max">
            {cornerSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('cornerShape', shape.value)}
                className={`p-1 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.cornerShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Eye Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white p-3 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-xs text-gray-700 font-medium">
          Eye Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto " style={{scrollbarWidth: "none", msOverflowStyle: "none",}}>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 min-w-max">
            {eyeSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('eyeShape', shape.value)}
                className={`p-1 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.eyeShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeTab;
