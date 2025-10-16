// components/layout/tabs/datatypes/BusinessCardForm.tsx

import React from 'react';
import { QRCodeSettings } from '../../qr/QRCodeSettings';

interface BusinessCardFormProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const BusinessCardForm: React.FC<BusinessCardFormProps> = ({ qrSettings, onSettingsChange }) => {
  const businesscard = qrSettings.businesscard || {};

  const handleChange = (field: keyof typeof businesscard, value: string) => {
    const updatedBusinessCard = { ...businesscard, [field]: value };
    onSettingsChange({
      ...qrSettings,
      businesscard: updatedBusinessCard,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={businesscard.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter full name"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
        <input
          type="text"
          value={businesscard.company || ''}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Enter company name"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          value={businesscard.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter job title"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={businesscard.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter phone number"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={businesscard.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter email address"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="url"
          value={businesscard.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="Enter website URL"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
      </div>

      {/* Address */}
      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          value={businesscard.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter business address"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"          
        />
      </div>
    </div>
  );
};

export default BusinessCardForm;
