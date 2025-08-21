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

interface WebsiteTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
  hideUrlInput?: boolean;
  user?: { id: number; fullName: string; email: string; createdAt: string } | null;
}

type DesignTab = 'shape' | 'frame' | 'color' | 'logo' | 'template';

const WebsiteTab: React.FC<WebsiteTabProps> = ({ qrSettings, onSettingsChange, hideUrlInput, user }) => {
  const [designTab, setDesignTab] = useState<DesignTab>('template');
  const [activeStep, setActiveStep] = useState(0);
  const [inputError, setInputError] = useState<string>('');

  const steps = [
    { label: "QR Function", icon: "📝" },
    { label: "Scan Target", icon: "🎯" },
    { label: "QR Look", icon: "🎨" },
    { label: "Finalize", icon: "✅" },
  ];

  const handleDataTypeSelect = (dataType: QRType) => {
    const typeConfig = QR_TYPE_CONFIGS[dataType];
    onSettingsChange({ 
      ...qrSettings, 
      dataType: dataType, 
      url: '',
    });
    setActiveStep(1);
  };

  const handleUrlChange = (url: string) => {
    const currentDataType = qrSettings.dataType as QRType || 'Website';
    
    try {
      // Parse user input into structured data
      const parsedData = parseUserInput(currentDataType, url);
      
      // Create QR data structure for validation
      const qrData = createQRData(currentDataType, parsedData);
      const isValid = validateQRData(qrData);
      
      setInputError(isValid ? '' : 'Please enter a valid input for this QR code type');
      
      onSettingsChange({ 
        ...qrSettings, 
        url: url,
      });
    } catch (error) {
      setInputError('Invalid input format for this QR code type');
      onSettingsChange({ 
        ...qrSettings, 
        url: url,
      });
    }
  };

  const getCurrentPlaceholder = () => {
    const currentDataType = qrSettings.dataType as QRType || 'Website';
    const typeConfig = QR_TYPE_CONFIGS[currentDataType];
    return typeConfig?.placeholder || 'Enter your data here';
  };

  const getCurrentDescription = () => {
    const currentDataType = qrSettings.dataType as QRType || 'Website';
    const typeConfig = QR_TYPE_CONFIGS[currentDataType];
    return typeConfig?.description || 'Enter your data';
  };

  return (
    <div className="bg-white rounded-xl shadow space-y-4 pb-6">
      {/* Step Progress Tabs */}
      <div className="rounded-t-xl sticky top-0 bg-white z-10">
        <div className="rounded-t-xl bg-gray-50 p-1 relative">
          {/* Animated background indicator */}
          <div 
            className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-lg shadow-sm"
            style={{ 
              transform: `translateX(${activeStep * 100}%)`,
              width: 'calc(25% - 0.125rem)',
              transition: 'transform 0.2s ease-out'
            }}
          />
          <div className="flex space-x-1 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              
              return (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? 'text-[#063970] font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className={`text-lg ${isActive ? 'scale-110' : ''}`}>
                    {step.icon}
                  </span>
                  <span className={`hidden sm:inline ${isActive ? 'font-semibold' : ''}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Content based on active step */}
      <div className="h-[425px] overflow-y-auto px-6">
        {activeStep === 0 && (
          <div className="animate-fadeIn">
            {/* Step 1: QR Function Selection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">1</span>
                <span className="text-sm font-semibold">Select QR Function</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(QR_TYPE_CONFIGS).map(([dataType, config]) => (
                  <div
                    key={`datatype-${dataType}`}
                    onClick={() => handleDataTypeSelect(dataType as QRType)}
                    className="bg-white border border-gray-200 rounded-xl p-2 cursor-pointer hover:border-[#063970] hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{config.icon}</span>
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-[#063970] transition-colors">
                        {config.name}
                      </h3>
                    </div>
                   
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="animate-fadeIn">
            {/* Step 2: Scan Target Input */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">2</span>
                <span className="text-sm font-semibold">Enter {qrSettings.dataType || 'Data'}</span>
              </div>
              
              <div className="space-y-4">
                {qrSettings.dataType === 'location' ? (
                  <LocationMapInput
                    value={qrSettings.url}
                    onChange={handleUrlChange}
                    onLocationSelect={(lat, lng, address) => {
                      console.log('Location selected:', { lat, lng, address });
                    }}
                  />
                ) : qrSettings.dataType === 'email' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Email Address
                    </label>
                    <input
                      type="email"
                      value={qrSettings.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="example@example.com"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors ${
                        inputError ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {inputError && (
                      <p className="text-red-500 text-sm mt-1">{inputError}</p>
                    )}
                  </div>
                ) : qrSettings.dataType === 'phone' ? (
                  <PhoneInputSettings qrSettings={qrSettings} onSettingsChange={onSettingsChange} inputError={inputError} setInputError={setInputError} />
                ) : qrSettings.dataType === 'wifi' ? (
                  <WiFiTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                ) : (qrSettings.dataType === 'vcard' || qrSettings.dataType === 'businesscard') ? (
                  <VCardForm qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getCurrentDescription()}
                    </label>
                    <textarea
                      value={qrSettings.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder={getCurrentPlaceholder()}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors ${
                        inputError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={4}
                    />
                    {inputError && (
                      <p className="text-red-500 text-sm mt-1">{inputError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {getCurrentPlaceholder()}
                    </p>
                </div>
              )}
              
                <div className="flex justify-between">
                  <button
                    onClick={() => setActiveStep(0)}
                    className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Back
                  </button>
                <button
                  onClick={() => setActiveStep(2)}
                  disabled={(qrSettings.dataType === 'vcard' || qrSettings.dataType === 'businesscard')
                    ? !(qrSettings.vcard && qrSettings.vcard.name && qrSettings.vcard.name.trim() && qrSettings.vcard.phone && qrSettings.vcard.phone.trim() && qrSettings.vcard.email && qrSettings.vcard.email.trim())
                    : qrSettings.dataType === 'wifi'
                      ? !(qrSettings.wifi && qrSettings.wifi.ssid && qrSettings.wifi.ssid.trim())
                      : !qrSettings.url.trim() || !!inputError}
                  className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next →
                </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="animate-fadeIn">
            {/* Step 3: QR Look */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#063970] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm">3</span>
                <span className="text-sm font-semibold">Customize QR Look</span>
              </div>
              
              <div className="bg-gray-50 rounded-full p-1 relative">
                {/* Animated background indicator */}
                <div
                  className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-full shadow-sm"
                  style={{
                    transform: `translateX(${[
                      'template',
                      'shape',
                      'color',
                      'logo',
                      'frame',
                    ].indexOf(designTab) * 100}%)`,
                    width: `calc(${100 / 5}% - 0.25rem)`, // 5 tabs
                    transition: 'transform 0.25s ease-out',
                  }}
                />

                <div className="flex space-x-1 relative z-10">
                  {[
                    { id: 'template', label: 'Template', icon: '🎨' },
                    { id: 'shape', label: 'Shape', icon: '🔷' },
                    { id: 'color', label: 'Color', icon: '🎨' },
                    { id: 'logo', label: 'Image', icon: '🖼️' },
                    { id: 'frame', label: 'Frame', icon: '🖼️' },
                  ].map((tab) => {
                    const isActive = designTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDesignTab(tab.id as DesignTab)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-[#063970] font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span className={`text-sm transition-transform ${isActive ? 'scale-110' : ''}`}>
                          {tab.icon}
                        </span>
                        <span className={`hidden sm:inline transition-all ${isActive ? 'font-semibold' : ''}`}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
               
              <div className="mt-4 animate-fadeIn">
                {designTab === 'template' && (
                  <TemplateTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                )}
                {designTab === 'shape' && (
                  <ShapeTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                )}
                {designTab === 'color' && (
                  <ColorTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                )}
                {designTab === 'logo' && (
                  <LogoTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                )}
                {designTab === 'frame' && (
                  <FrameTab qrSettings={qrSettings} onSettingsChange={onSettingsChange} />
                )}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                  ← Back
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-fadeIn">
            {/* Step 4: Finalize */}
            <div>
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
                      <span className="font-medium text-right max-w-xs truncate">
                        {qrSettings.url || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Style:</span>
                      <span className="font-medium capitalize">{qrSettings.qrShape || 'square'}</span>
                    </div>
                    {qrSettings.logoImage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Logo:</span>
                        <span className="font-medium text-green-600">✓ Added</span>
                      </div>
                    )}
                    {qrSettings.backgroundImage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Background:</span>
                        <span className="font-medium text-green-600">✓ Added</span>
                      </div>
                    )}
                    {qrSettings.frameStyle && qrSettings.frameStyle !== 'none' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frame:</span>
                        <span className="font-medium capitalize">{qrSettings.frameStyle}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-2 bg-[#063970] text-sm text-white rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      // This will trigger the QR code creation
                      // The parent component should handle this
                      // --- vCard QR creation: pass vcard object, not url string ---
                      if (qrSettings.dataType === 'vcard' || qrSettings.dataType === 'businesscard') {
                        // Example: pass vcard object to parent handler
                        if (qrSettings.vcard && qrSettings.vcard.name && qrSettings.vcard.phone && qrSettings.vcard.email) {
                          onSettingsChange({
                            ...qrSettings,
                            url: '', // clear url for vcard
                            vcard: { ...qrSettings.vcard }
                          });
                        }
                      } else {
                        // For other types, pass url as usual
                        onSettingsChange({
                          ...qrSettings,
                          url: qrSettings.url
                        });
                      }
                    }}
                    disabled={(qrSettings.dataType === 'vcard' || qrSettings.dataType === 'businesscard')
                      ? !(qrSettings.vcard && qrSettings.vcard.name && qrSettings.vcard.name.trim() && qrSettings.vcard.phone && qrSettings.vcard.phone.trim() && qrSettings.vcard.email && qrSettings.vcard.email.trim())
                      : qrSettings.dataType === 'wifi'
                        ? !(qrSettings.wifi && qrSettings.wifi.ssid && qrSettings.wifi.ssid.trim())
                        : !qrSettings.url.trim() || !!inputError}
                    className="px-6 py-2 bg-green-600 text-sm text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteTab;
