import React, { useState } from "react";
import WebsiteTab from "@/app/components/layout/tabs/WebsiteTab";
import QRCodePreview from "@/app/components/layout/qr/QRCodePreview";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface QRCodePageProps {
  user?: UserData | null;
  refreshQRStats?: () => void;
}

const QRCodePage: React.FC<QRCodePageProps> = ({ user = null, refreshQRStats }) => {
  const [qrSettings, setQrSettings] = useState<QRCodeSettings>({
    url: '',
    cornerShape: 'square',
    eyeShape: 'square',
    qrShape: 'square',
    qrCodeShape: 'square', // ✅ Added to match interface
    foregroundColor: '#000000',
    dotColor: '#000000',
    cornerColor: '#000000',
    eyeColor: '#000000',
    backgroundColor: '#FFFFFF',
    logoImage: ''
  });

  // Debug settings changes
  const handleSettingsChange = (settings: QRCodeSettings) => {
    console.log('=== QRCODE PAGE SETTINGS CHANGE ===');

    let processedSettings = { ...settings };

    // Force logoImage to be a string if it's not already
    if (settings.logoImage && typeof settings.logoImage !== 'string') {
      console.warn('LogoImage is not a string, converting...');
      processedSettings.logoImage = String(settings.logoImage);
    }

    // Ensure qrCodeShape is always set (fallback to qrShape)
    if (!processedSettings.qrCodeShape) {
          interface QRCodeSettings {
              url: string;
              cornerShape: 'square' | 'circle' | 'rounded';
              eyeShape: 'square' | 'circle' | 'rounded';
              qrShape: 'square' | 'circle' | 'rounded' | 'hexagon' | 'octagon' | 'diamond' | 'star' | 'heart';
              qrCodeShape: 'square' | 'circle' | 'rounded' | 'hexagon' | 'octagon' | 'diamond' | 'star' | 'heart';
              foregroundColor: string;
              dotColor: string;
              cornerColor: string;
              eyeColor: string;
              backgroundColor: string;
              logoImage: string;
            } processedSettings.qrShape || 'square';
    }

    console.log('Final processed settings:', processedSettings);
    console.log('=== END QRCODE PAGE SETTINGS CHANGE ===');
    setQrSettings(processedSettings);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <WebsiteTab
          qrSettings={qrSettings}
          onSettingsChange={handleSettingsChange}
          user={user}
        />
      </div>
      <div className="md:col-span-1">
        <QRCodePreview
          settings={qrSettings}
          user={user}
          refreshQRStats={refreshQRStats}
        />
      </div>
    </div>
  );
};

export default QRCodePage;
