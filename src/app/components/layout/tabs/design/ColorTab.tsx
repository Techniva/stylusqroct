import React, { useState } from "react";
import { Palette, Droplets, Eye, Square, Circle } from "lucide-react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";

interface ColorTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const ColorTab: React.FC<ColorTabProps> = ({ qrSettings, onSettingsChange }) => {
  
  const handleColorChange = (colorType: keyof QRCodeSettings, value: string) => {
    const newSettings = { ...qrSettings, [colorType]: value };
    onSettingsChange(newSettings);
  };

  const ColorFrame = ({ 
    title, 
    icon: Icon,
    currentColor,
    onColorChange,
    colorType
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    currentColor: string;
    onColorChange: (value: string) => void;
    colorType: keyof QRCodeSettings;
  }) => {
    const presetColors = [
      '#000000', // Black
      '#1E3A8A', // Blue
      '#DC2626', // Red
      '#059669', // Green
      '#7C3AED', // Purple
      '#F59E0B', // Orange
      '#E11D48', // Rose
      '#10B981', // Emerald
      '#F43F5E', // Pink
    ];

    return (
      <fieldset className="border border-gray-200 rounded-xl px-3 pt-2 pb-3 shadow-sm">
        <legend className="flex items-center gap-2 text-xs font-medium text-gray-700">
          <Icon className="w-4 h-4 text-[#063970]" />
          {title}
        </legend>
        

        {/* 4 Color Options */}
        <div className="grid grid-cols-7">
          {presetColors.slice(0, 4).map((color, index) => (
            <button
              key={`preset-color-${color}-${index}`}
              onClick={() => onColorChange(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                currentColor === color 
                  ? 'border-[#063970] shadow-md scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:scale-102'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}

          {/* Custom Color Picker */}
       
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-8 h-8 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-20 px-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970]"
            placeholder="#000000"
          />
        
        </div>
      </fieldset>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Color Frames */}
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dot Styles Color Frame */}
          <ColorFrame
            title="Dot Styles Color"
            icon={Circle}
            currentColor={qrSettings.dotColor || qrSettings.foregroundColor}
            onColorChange={(value) => handleColorChange('dotColor', value)}
            colorType="dotColor"
          />

          {/* Corner Shape Color Frame */}
          <ColorFrame
            title="Corner Shape Color"
            icon={Square}
            currentColor={qrSettings.cornerColor || qrSettings.foregroundColor}
            onColorChange={(value) => handleColorChange('cornerColor', value)}
            colorType="cornerColor"
          />

          {/* Eye Style Color Frame */}
          <ColorFrame
            title="Eye Style Color"
            icon={Eye}
            currentColor={qrSettings.eyeColor || qrSettings.foregroundColor}
            onColorChange={(value) => handleColorChange('eyeColor', value)}
            colorType="eyeColor"
          />

          {/* Background Color Frame */}
          <ColorFrame
            title="Background Color"
            icon={Square}
            currentColor={qrSettings.backgroundColor || '#FFFFFF'}
            onColorChange={(value) => handleColorChange('backgroundColor', value)}
            colorType="backgroundColor"
          />
        </div>
      </div>

      {/* Quick Actions - Full Width */}
     

      <div className="border-gray-200 space-y-2 text-center">
            <button
              onClick={() => {
                const newSettings = {
                  ...qrSettings,
                  dotColor: '#000000',
                  cornerColor: '#000000',
                  eyeColor: '#000000',
                  backgroundColor: '#FFFFFF'
                };
                onSettingsChange(newSettings);
              }}
              className="px-4 py-2 border text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-left mr-2"
            >
              Reset to Classic
            </button>
            <button
              onClick={() => {
                const newSettings = {
                  ...qrSettings,
                  dotColor: qrSettings.foregroundColor,
                  cornerColor: qrSettings.foregroundColor,
                  eyeColor: qrSettings.foregroundColor
                };
                onSettingsChange(newSettings);
              }}
              className="px-4 py-2 border text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-left"
            >
              Use Main Color
            </button>           
          </div>     
    </div>
  );
};

export default ColorTab;
