import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Crosshair } from 'lucide-react';

// Declare Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

interface FreeMapComponentProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  initialLat?: number;
  initialLng?: number;
  showSearch?: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

const FreeMapComponent: React.FC<FreeMapComponentProps> = ({
  onLocationSelect,
  initialLat = 28.4980613, // Cyber City, Gurugram, India
  initialLng = 77.0891604, // Cyber City, Gurugram, India
  showSearch = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: initialLat,
    longitude: initialLng
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: initialLat, lng: initialLng });
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize OpenStreetMap
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      // Clear any existing map
      if ((mapRef.current as any).mapInstance) {
        (mapRef.current as any).mapInstance.remove();
      }

      // Ensure the container has proper dimensions
      mapRef.current.style.height = '320px';
      mapRef.current.style.width = '100%';

      try {
        // Create OpenStreetMap using Leaflet
        const map = window.L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lng], zoom);
        
        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Create marker
        const marker = window.L.marker([selectedLocation.latitude, selectedLocation.longitude], {
          draggable: true
        }).addTo(map);

        // Handle marker drag
        marker.on('dragend', (event: any) => {
          const position = event.target.getLatLng();
          const newLocation = {
            latitude: position.lat,
            longitude: position.lng
          };
          setSelectedLocation(newLocation);
          onLocationSelect(newLocation.latitude, newLocation.longitude);
        });

        // Handle map click
        map.on('click', (event: any) => {
          const newLocation = {
            latitude: event.latlng.lat,
            longitude: event.latlng.lng
          };
          setSelectedLocation(newLocation);
          marker.setLatLng([newLocation.latitude, newLocation.longitude]);
          onLocationSelect(newLocation.latitude, newLocation.longitude);
        });

        // Store map instance for later use
        (mapRef.current as any).mapInstance = map;
        (mapRef.current as any).markerInstance = marker;

        // Force a resize to ensure proper rendering
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
        // Fallback to a simple div with message
        mapRef.current.innerHTML = `
          <div class="w-full h-full bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div class="text-center p-6">
              <div class="text-gray-500 mb-4">
                <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Map Loading Error</h3>
              <p class="text-sm text-gray-600 mb-4">
                Unable to load the interactive map. Please refresh the page and try again.
              </p>
            </div>
          </div>
        `;
      }
    };

    // Load Leaflet CSS and JS
    if (!window.L) {
      // Add Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Add Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        // Wait a bit for the script to fully load
        setTimeout(initMap, 100);
      };
      script.onerror = () => {
        console.error('Failed to load Leaflet');
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
              <div class="text-center p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
                <p class="text-sm text-gray-600">
                  Unable to load map library. Please check your internet connection.
                </p>
              </div>
            </div>
          `;
        }
      };
      document.head.appendChild(script);
    } else {
      // If Leaflet is already loaded, initialize immediately
      setTimeout(initMap, 50);
    }

    return () => {
      if (mapRef.current && (mapRef.current as any).mapInstance) {
        (mapRef.current as any).mapInstance.remove();
      }
    };
  }, []);

  // Update marker position when selectedLocation changes
  useEffect(() => {
    if (mapRef.current && (mapRef.current as any).markerInstance && selectedLocation) {
      (mapRef.current as any).markerInstance.setLatLng([selectedLocation.latitude, selectedLocation.longitude]);
    }
  }, [selectedLocation]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Use Nominatim (OpenStreetMap's geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        const newLocation = {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          address: result.display_name
        };
        
        setSelectedLocation(newLocation);
        setMapCenter({ lat: newLocation.latitude, lng: newLocation.longitude });
        
        if (mapRef.current && (mapRef.current as any).mapInstance) {
          const map = (mapRef.current as any).mapInstance;
          map.setView([newLocation.latitude, newLocation.longitude], 15);
        }
        
        if (mapRef.current && (mapRef.current as any).markerInstance) {
          (mapRef.current as any).markerInstance.setLatLng([newLocation.latitude, newLocation.longitude]);
        }
        
        onLocationSelect(newLocation.latitude, newLocation.longitude, newLocation.address);
      } else {
        alert('Address not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Search failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setSelectedLocation(newLocation);
          setMapCenter({ lat: newLocation.latitude, lng: newLocation.longitude });
          
          if (mapRef.current && (mapRef.current as any).mapInstance) {
            const map = (mapRef.current as any).mapInstance;
            map.setView([newLocation.latitude, newLocation.longitude], 15);
          }
          
          if (mapRef.current && (mapRef.current as any).markerInstance) {
            (mapRef.current as any).markerInstance.setLatLng([newLocation.latitude, newLocation.longitude]);
          }
          
          onLocationSelect(newLocation.latitude, newLocation.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get current location. Please check your location permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {showSearch && (
        <div className="space-y-2">
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter address or place name"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="px-4 py-3 bg-[#063970] text-white rounded-lg hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Searching...' : <Search className="w-4 h-4" />}
            </button>
            <button
              onClick={handleGetCurrentLocation}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Use current location"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Free Map */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Interactive Map (Free OpenStreetMap)
        </label>
        <div 
          ref={mapRef}
          className="w-full h-80 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500">
          Click on the map to drop a pin or drag the marker to adjust location
        </p>
      </div>


    </div>
  );
};

export default FreeMapComponent; 