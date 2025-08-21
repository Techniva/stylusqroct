import React from "react";

interface LocationMapInputProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

const LocationMapInput: React.FC<LocationMapInputProps> = ({ value, onChange, onLocationSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter Location
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter location details"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors border-gray-300"
      />
      <button
        onClick={() => onLocationSelect(12.9716, 77.5946, "Sample Address")}
        className="mt-2 px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052a5a] transition-colors"
      >
        Select Location
      </button>
    </div>
  );
};

export default LocationMapInput;