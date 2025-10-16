import React, { useState } from "react";
import ShapeTab from "@/app/components/layout/tabs/design/ShapeTab";
import FrameTab from "@/app/components/layout/tabs/design/FrameTab";
import ColorTab from "@/app/components/layout/tabs/design/ColorTab";
import LogoTab from "@/app/components/layout/tabs/design/LogoTab";
import TemplateTab from "@/app/components/layout/tabs/design/TemplateTab";
import LocationMapInput from "@/app/components/layout/tabs/LocationMapInput";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { QR_TYPE_CONFIGS, parseUserInput, validateQRData, createQRData, QRType } from "../../../lib/qrDataUtils";
import VCardForm from "./datatypes/VCardForm";
import WiFiTab from "./datatypes/WiFiTab";
import PhoneInputSettings from "./datatypes/PhoneInputSettings";
import BusinessCardForm from "./datatypes/BusinessCardForm";
import LoginCheckModal from "../../auth/LoginCheckModal";

interface WebsiteTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
  user?: { id: number; fullName: string; email: string; createdAt: string } | null;
  resetTrigger?: number;
}

type DesignTab = 'shape' | 'frame' | 'color' | 'logo' | 'template';

const WebsiteTab: React.FC<WebsiteTabProps> = ({user, qrSettings, onSettingsChange, resetTrigger }) => {
  const [designTab, setDesignTab] = useState<DesignTab>('template');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inputError, setInputError] = useState<string>('');
  const [showLoginCheckModal, setShowLoginCheckModal] = useState(false);

  const steps = [
    { label: "QR Function", icon: "📝" },
    { label: "Scan Target", icon: "🎯" },
    { label: "QR Look", icon: "🎨" },
    { label: "Finalize", icon: "✅" },
  ];

  // Default QR settings for a selected type
  const getDefaultSettings = (dataType: QRType  = 'website'): QRCodeSettings => ({
    url: '',
    cornerShape: 'square',
    eyeShape: 'square',
    qrShape: 'square',
    qrCodeShape: 'square',
    foregroundColor: '#000000',
    dotColor: '#000000',
    cornerColor: '#000000',
    eyeColor: '#000000',
    backgroundColor: '#ffffff',
    logoImage: '',
    processedLogoPath: '',
    dataType,
    dataContent: '',
    website: { url: '' },
    wifi: { ssid: '', password: '', encryption: '', hidden: false },
    email: { email: '', subject: '', body: '' },
    phone: { phone: '', countryCode: '' },
    vcard: { name: '', phone: '', email: '', company: '', title: '', address: '', website: '' },
    businesscard: { name: '', phone: '', email: '', company: '', title: '', address: '', website: '' },
    frameStyle: 'none',
    frameText: '',
    frameTextSize: 'medium',
    frameColor: '',
    frameTextColor: '',
    backgroundImage: '',
  });

  // Reset state whenever resetTrigger changes
  React.useEffect(() => {
    if (resetTrigger !== undefined) {
      onSettingsChange(getDefaultSettings());
      setActiveStep(0);
      setDesignTab('template');
      setInputError('');
    }
  }, [resetTrigger]);

  // Handle data type selection — always reset to default
  const handleDataTypeSelect = (dataType: QRType) => {
    // If user is not logged in and selected vcard/businesscard, show login check
    if (!user && (dataType === 'vcard' || dataType === 'businesscard')) {
      setShowLoginCheckModal(true);
      return;
    }
    if (qrSettings.dataType !== dataType) {
      // Only reset if the type is different
      const newSettings = getDefaultSettings(dataType);
      onSettingsChange(newSettings);
    }
    setActiveStep(1); // Move to Scan Target step
    setDesignTab('template'); // Reset design tab
    setInputError(''); // Clear errors
  };
  
  // Handle URL / input changes
  const handleUrlChange = (url: string) => {
    const currentDataType = qrSettings.dataType as QRType;
    try {
      const parsedData = parseUserInput(currentDataType, url);
      const qrData = createQRData(currentDataType, parsedData);
      const isValid = validateQRData(qrData);
      setInputError(isValid ? '' : 'Please enter a valid input for this QR code type');
      onSettingsChange({ ...qrSettings, url });
    } catch {
      setInputError('Invalid input format for this QR code type');
      onSettingsChange({ ...qrSettings, url });
    }
  };

  const getCurrentPlaceholder = () => {
    const currentDataType = qrSettings.dataType as QRType;
    return QR_TYPE_CONFIGS[currentDataType]?.placeholder || 'Enter your data here';
  };

  const canGoNext = () => {
    if (activeStep === 0) return !!qrSettings.dataType;
    if (activeStep === 1) {
      switch (qrSettings.dataType) {
        case 'vcard':
          return !!qrSettings.vcard?.name?.trim() && !!qrSettings.vcard?.phone?.trim() && !!qrSettings.vcard?.email?.trim();
        case 'businesscard':
          return !!qrSettings.businesscard?.name?.trim() && !!qrSettings.businesscard?.phone?.trim() && !!qrSettings.businesscard?.email?.trim();
        case 'wifi':
          return !!qrSettings.wifi?.ssid?.trim();
        default:
          return !!qrSettings.url?.trim() && !inputError;
      }
    }
    return true;
  };

  const resetWebsiteTab = () => {
    // Reset to default settings (use 'website' as default type)
    const newSettings = getDefaultSettings('website');
    onSettingsChange(newSettings);
  
    // Reset stepper, design tab, and input errors
    setActiveStep(0);
    setDesignTab('template');
    setInputError('');
  };
  

  return (
    <div className="bg-white rounded-xl shadow space-y-4 pb-6">
      {/* Stepper */}
      <div className="rounded-t-xl sticky top-0 bg-white z-10">
        <div className="rounded-t-xl bg-gray-50 p-1 relative">
          <div
            className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-lg shadow-sm transition-transform duration-200"
            style={{
              transform: `translateX(${activeStep * 100}%)`,
              width: 'calc(25% - 0.125rem)',
            }}
          />
          <div className="flex space-x-1 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.label}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive ? 'text-[#063970] font-semibold' : 'text-gray-600'
                  }`}
                >
                  <span className={`text-lg ${isActive ? 'scale-110' : ''}`}>{step.icon}</span>
                  <span className={`hidden sm:inline ${isActive ? 'font-semibold' : ''}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="h-[425px] overflow-y-auto px-6">
        {/* Step 1: QR Function */}
        {activeStep === 0 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">1</span>
              <span className="text-sm font-semibold">Select QR Function</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(QR_TYPE_CONFIGS).map(([dataType, config]) => {
                const isSelected = qrSettings.dataType === dataType;
                return (
                  <div
                    key={dataType}
                    onClick={() => handleDataTypeSelect(dataType as QRType)}
                    className={`border rounded-xl p-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-[#063970] shadow-lg bg-[#f0f5ff]' 
                        : 'border-gray-200 bg-white hover:border-[#063970] hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{config.icon}</span>
                      <h3 className="font-semibold text-sm text-gray-900">{config.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Enter data */}
        {activeStep === 1 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">2</span>
              <span className="text-sm font-semibold">Enter {qrSettings.dataType || 'Data'}</span>
            </div>

            {qrSettings.dataType === 'location' ? (
              <LocationMapInput value={qrSettings.url} onChange={handleUrlChange} onLocationSelect={() => {}} />
            ) : qrSettings.dataType === 'email' ? (
              <input
                type="email"
                value={qrSettings.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="example@example.com"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] ${
                  inputError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            ) : qrSettings.dataType === 'phone' ? (
              <PhoneInputSettings qrSettings={qrSettings} onSettingsChange={onSettingsChange} inputError={inputError} setInputError={setInputError} />
            ) : qrSettings.dataType === 'wifi' ? (
              <WiFiTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
            ) : qrSettings.dataType === 'vcard' ? (
              <VCardForm qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
            ) : qrSettings.dataType === 'businesscard' ? (
              <BusinessCardForm qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
            ) : (
              <textarea
                value={qrSettings.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={getCurrentPlaceholder()}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] ${
                  inputError ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setActiveStep(0)}
                className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a]"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(2)}
                disabled={!canGoNext()}
                className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customize QR Look */}
        {activeStep === 2 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">3</span>
              <span className="text-sm font-semibold">Customize QR Look</span>
            </div>
            <div className="bg-gray-50 rounded-full p-1 relative">
              <div
                className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-full shadow-sm transition-transform duration-200"
                style={{
                  transform: `translateX(${['template','shape','color','logo','frame'].indexOf(designTab) * 100}%)`,
                  width: `calc(${100 / 5}% - 0.25rem)`,
                }}
              />
              <div className="flex space-x-1 relative z-10">
                {['template','shape','color','logo','frame'].map((tabId) => (
                  <div
                    key={tabId}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                      designTab === tabId ? 'text-[#063970] font-semibold' : 'text-gray-600'
                    }`}
                    onClick={() => setDesignTab(tabId as DesignTab)}
                  >
                    {tabId}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              {designTab === 'template' && <TemplateTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />}
              {designTab === 'shape' && <ShapeTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />}
              {designTab === 'color' && <ColorTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />}
              {designTab === 'logo' && <LogoTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />}
              {designTab === 'frame' && <FrameTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a]"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a]"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Finalize */}
        {activeStep === 3 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">4</span>
              <span className="text-sm font-semibold">Review & Create</span>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">QR Code Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{qrSettings.dataType || 'Website URL'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Content:</span>
                    <span className="font-medium text-right max-w-xs truncate">{qrSettings.url || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium capitalize">{qrSettings.qrShape || 'square'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a]"
                >
                  ← Back
                </button>
                <button
                  onClick={resetWebsiteTab}
                  className="px-6 py-2 bg-gray-300 text-sm text-black rounded-full hover:bg-gray-400"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Login check modal */}
      <LoginCheckModal
        isOpen={showLoginCheckModal}
        onClose={() => setShowLoginCheckModal(false)}
        onLogin={() => {
          setShowLoginCheckModal(false);
          const event = new CustomEvent("openAuthModal", { detail: { mode: "login" } });
          window.dispatchEvent(event);
        }}
        onRegister={() => {
          setShowLoginCheckModal(false);
          const event = new CustomEvent("openAuthModal", { detail: { mode: "register" } });
          window.dispatchEvent(event);
        }}
      />
    </div>
  );
};

export default WebsiteTab;
