// components/layout/tabs/datatypes/WiFiTab.tsx

import React from 'react';
import { QRCodeSettings } from '../../qr/QRCodeSettings'; // adjust the path as needed

interface WiFiTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const WiFiTab: React.FC<WiFiTabProps> = ({ qrSettings, onSettingsChange }) => {
  const wifi = qrSettings.wifi || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SSID Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Network Name (SSID)
            </label>
            <input
            type="text"
            value={wifi.ssid || ''}
            onChange={(e) =>
                onSettingsChange({
                ...qrSettings,
                wifi: {
                    ...wifi,
                    ssid: e.target.value,
                },
                })
            }
            placeholder="Enter WiFi name"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
            />
        </div>

        {/* Password Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
            </label>
            <input
            type="text"
            value={wifi.password || ''}
            onChange={(e) =>
                onSettingsChange({
                ...qrSettings,
                wifi: {
                    ...wifi,
                    password: e.target.value,
                },
                })
            }
            placeholder="Enter WiFi password"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
            />
        </div>

        {/* Encryption Dropdown */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Type
            </label>
            <select
            value={wifi.encryption || 'WPA'}
            onChange={(e) =>
                onSettingsChange({
                ...qrSettings,
                wifi: {
                    ...wifi,
                    encryption: e.target.value,
                },
                })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
            name="encryption"
            >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None</option>
            </select>
        </div>

        {/* Hidden Network Checkbox */}
        <div className="flex items-center space-x-2 pt-6">
            <input
            type="checkbox"
            checked={wifi.hidden || false}
            onChange={(e) =>
                onSettingsChange({
                ...qrSettings,
                wifi: {
                    ...wifi,
                    hidden: e.target.checked,
                },
                })
            }
            className="h-4 w-4 text-[#063970] border-gray-300 rounded focus:ring-[#063970]"
            />
            <label className="text-sm text-gray-700">Hidden Network</label>
        </div>
        </div>

  );
};

export default WiFiTab;
