// components/layout/tabs/datatypes/PhoneInputSettings.tsx

import React from 'react';
import { QRCodeSettings } from '../../qr/QRCodeSettings'; // adjust path as needed

interface PhoneInputSettingsProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
  inputError: string;
  setInputError: (error: string) => void;
}

const PhoneInputSettings: React.FC<PhoneInputSettingsProps> = ({
  qrSettings,
  onSettingsChange,
  inputError,
  setInputError,
}) => {
  const handlePhoneChange = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setInputError('Only numbers are allowed');
    } else if (value.length > 10) {
      setInputError('Phone number cannot exceed 10 digits');
    } else {
      setInputError('');
    }

    onSettingsChange({
      ...qrSettings,
      url: value,
    });

    console.log('Phone number updated:', value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter Phone Number
      </label>
      <input
        type="tel"
        value={qrSettings.url}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder="Enter 10 digit phone number"
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors ${
          inputError ? 'border-red-500' : 'border-gray-300'
        }`}
        maxLength={10}
      />
      {inputError && (
        <p className="text-red-500 text-sm mt-1">{inputError}</p>
      )}
    </div>
  );
};

export default PhoneInputSettings;
