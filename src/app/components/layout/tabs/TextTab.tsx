import React from "react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";

interface TextTabProps {
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const TextTab: React.FC<TextTabProps> = () => {
  return (
    <div className="p-4 text-gray-500">Text QR content and design options coming soon...</div>
  );
};

export default TextTab;
