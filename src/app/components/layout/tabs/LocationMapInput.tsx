import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import GoogleMapComponent from './GoogleMapComponent';
import FreeMapComponent from './FreeMapComponent';

interface LocationMapInputProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (lat: number, lng: number, address?: string) => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

const LocationMapInput: React.FC<LocationMapInputProps> = ({ 
  value, 
  onChange, 
  onLocationSelect 
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [inputMode, setInputMode] = useState<'coordinates' | 'search'>('coordinates');
  
  // Cyber City, Gurugram, India coordinates
  const CYBER_CITY_LAT = 28.4980613;
  const CYBER_CITY_LNG = 77.0891604;

  // Parse existing value
  useEffect(() => {
    if (value) {
      try {
        const [lat, lng] = value.split(',').map(coord => parseFloat(coord.trim()));
        if (!isNaN(lat) && !isNaN(lng)) {
          setSelectedLocation({ latitude: lat, longitude: lng });
        }
      } catch (error) {
        console.log('Could not parse coordinates from value');
      }
    }
  }, [value]);

  const handleCoordinateInput = (input: string) => {
    onChange(input);
    
    try {
      const [lat, lng] = input.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setSelectedLocation({ latitude: lat, longitude: lng });
        onLocationSelect?.(lat, lng);
      }
    } catch (error) {
      // Invalid coordinates, ignore
    }
  };



  return (
    <div className="space-y-4">
      {/* Input Mode Radio Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="inputMode"
              value="coordinates"
              checked={inputMode === 'coordinates'}
              onChange={(e) => setInputMode(e.target.value as 'coordinates' | 'search')}
              className="w-4 h-4 text-[#063970] border-gray-300 focus:ring-[#063970]"
            />
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Coordinates</span>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="inputMode"
              value="search"
              checked={inputMode === 'search'}
              onChange={(e) => setInputMode(e.target.value as 'coordinates' | 'search')}
              className="w-4 h-4 text-[#063970] border-gray-300 focus:ring-[#063970]"
            />
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Search Address</span>
            </div>
          </label>
        </div>
      </div>

      {/* Input Section */}
      {inputMode === 'coordinates' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => handleCoordinateInput(e.target.value)}
            placeholder="28.4980613,77.0891604"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors"
          />
          <p className="text-xs text-gray-500">
            Enter coordinates in format: latitude,longitude (Example: 28.4980613,77.0891604 for Cyber City, Gurugram)
          </p>
        </div>
      ) : (
        <div className="space-y-2">
        </div>
      )}

      {/* Map Component */}
      <FreeMapComponent
        onLocationSelect={(lat, lng, address) => {
          const coordString = `${lat},${lng}`;
          onChange(coordString);
          setSelectedLocation({ latitude: lat, longitude: lng, address });
          onLocationSelect?.(lat, lng, address);
        }}
        initialLat={selectedLocation?.latitude || CYBER_CITY_LAT}
        initialLng={selectedLocation?.longitude || CYBER_CITY_LNG}
        showSearch={inputMode === 'search'}
      />    
    </div>
  );
};

export default LocationMapInput; 