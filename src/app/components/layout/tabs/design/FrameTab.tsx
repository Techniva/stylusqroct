import React, { useState } from "react";
import { Square, Type, Palette, Image as ImageIcon } from "lucide-react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";

interface FrameTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

interface FrameStyle {
  id: string;
  name: string;
  preview: React.ReactNode;
  className: string;
}

const FrameTab: React.FC<FrameTabProps> = ({ qrSettings, onSettingsChange }) => {
  const [frameText, setFrameText] = useState(qrSettings.frameText || '');
  const [frameStyle, setFrameStyle] = useState(qrSettings.frameStyle || 'none');
  const [frameColor, setFrameColor] = useState(qrSettings.frameColor || '#000000');
  const [frameTextColor, setFrameTextColor] = useState(qrSettings.frameTextColor || '#000000');
  const [frameTextSize, setFrameTextSize] = useState(qrSettings.frameTextSize || 'medium');

  const handleFrameChange = (key: string, value: string) => {
    console.log('FrameTab - handleFrameChange:', key, value);
    const newSettings = { 
      ...qrSettings, 
      [key]: value 
    };
    console.log('FrameTab - newSettings:', newSettings);
    onSettingsChange(newSettings);
  };

  const frameStyles: FrameStyle[] = [
    {
      id: 'none',
      name: 'No Frame',
      preview: (
        <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      ),
      className: ''
    },
    {
      id: 'solid',
      name: 'Solid Border',
      preview: (
        <div className="w-10 h-10 bg-white border-4 border-gray-400 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      ),
      className: 'border-2'
    },
    {
      id: 'dashed',
      name: 'Dashed Border',
      preview: (
        <div className="w-10 h-10 bg-white border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      ),
      className: 'border-2 border-dashed'
    },
    {
      id: 'dotted',
      name: 'Dotted Border',
      preview: (
        <div className="w-10 h-10 bg-white border-4 border-dotted border-gray-400 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      ),
      className: 'border-2 border-dotted'
    },

  ];

  const textSizes = [
    { value: 'small', className: 'text-xs', symbol: 'A' },
    { value: 'medium', className: 'text-sm', symbol: 'Aa' },
    { value: 'large', className: 'text-base', symbol: 'AaA' },
    { value: 'xl', className: 'text-lg', symbol: 'AaAa' }
  ];

  const presetColors = [
    '#000000', '#1E3A8A', '#DC2626', '#059669'
  ];

  return (
    <div className="space-y-2 animate-fadeIn">
      {/* Frame Style Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Square className="w-5 h-5 text-[#063970]" />
          <h3 className="text-sm font-semibold text-gray-800">Frame Style</h3>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {frameStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setFrameStyle(style.id as any);
                handleFrameChange('frameStyle', style.id);
              }}
              className={`group relative p-2 border-2 border-gray-200 rounded-xl bg-white hover:border-[#063970] hover:shadow-md transition-all duration-200 ${
                frameStyle === style.id ? 'border-[#063970] bg-[#063970]/10 shadow-md' : ''
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {style.preview}
                
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Frame Text */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#063970] mt-1" />
          <h3 className="text-sm font-semibold text-gray-800">Frame Text</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frame Text
            </label>
            <input
              type="text"
              value={frameText}
              onChange={(e) => {
                setFrameText(e.target.value);
                handleFrameChange('frameText', e.target.value);
              }}
              placeholder="Enter frame text..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] text-base"
            />
          </div>

          {/* Text Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {textSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => {
                    setFrameTextSize(size.value as any);
                    handleFrameChange('frameTextSize', size.value);
                  }}
                  className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                    frameTextSize === size.value
                      ? 'border-[#063970] bg-[#063970]/10 text-[#063970]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={`font-bold ${size.className}`}>
                      {size.symbol}
                    </div>                   
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frame Colors */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#063970]" />
          <h3 className="text-sm font-semibold text-gray-800">Frame Colors</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frame Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Frame Color
            </label>
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setFrameColor(color);
                      handleFrameChange('frameColor', color);
                    }}
                    className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                      frameColor === color 
                        ? 'border-[#063970] shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={frameColor}
                onChange={(e) => {
                  setFrameColor(e.target.value);
                  handleFrameChange('frameColor', e.target.value);
                }}
                className="w-8 h-8 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setFrameTextColor(color);
                      handleFrameChange('frameTextColor', color);
                    }}
                    className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                      frameTextColor === color 
                        ? 'border-[#063970] shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={frameTextColor}
                onChange={(e) => {
                  setFrameTextColor(e.target.value);
                  handleFrameChange('frameTextColor', e.target.value);
                }}
                className="w-8 h-8 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FrameTab;
