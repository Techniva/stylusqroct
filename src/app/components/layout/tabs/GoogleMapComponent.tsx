import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, Crosshair } from 'lucide-react';

interface GoogleMapComponentProps {
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

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  onLocationSelect,
  initialLat = 40.7128,
  initialLng = -74.0060,
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
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      // Check if we have a valid API key
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const hasValidApiKey = apiKey && 
        apiKey !== 'DEMO_KEY' && 
        apiKey !== '' && 
        apiKey !== 'your_api_key_here' &&
        apiKey.startsWith('AIzaSy');
      
      console.log('Google Maps API Key Check:', {
        hasApiKey: !!apiKey,
        apiKeyValue: apiKey ? `${apiKey.substring(0, 10)}...` : 'none',
        hasValidApiKey,
        willShowDemo: !hasValidApiKey
      });

      if (!hasValidApiKey) {
        // Show demo map when no valid API key
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-gray-100 border border-gray-300 rounded-lg relative cursor-crosshair">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div class="text-gray-500 mb-4">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Demo Map</h3>
                <p class="text-sm text-gray-600 mb-4">
                  Click anywhere to simulate location selection
                </p>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <p class="font-medium mb-1">To enable real Google Maps:</p>
                  <ol class="list-decimal list-inside space-y-1 text-xs">
                    <li>Get API key from Google Cloud Console</li>
                    <li>Update .env.local file</li>
                    <li>Restart the development server</li>
                  </ol>
                </div>
              </div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-8 h-8 bg-red-500 rounded-full shadow-lg"></div>
              </div>
            </div>
          `;
          
          // Add click handler for demo mode
          if (mapRef.current) {
            mapRef.current.addEventListener('click', (event) => {
              const rect = mapRef.current!.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              
              // Simulate coordinate selection
              const lat = 40.7128 + (y - rect.height / 2) * 0.01;
              const lng = -74.0060 + (x - rect.width / 2) * 0.01;
              
              onLocationSelect(lat, lng, 'Demo Location');
            });
          }
        }
        return;
      }

      const map = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Create marker
      const newMarker = new google.maps.Marker({
        position: { lat: selectedLocation.latitude, lng: selectedLocation.longitude },
        map: map,
        draggable: true,
        title: 'Selected Location'
      });

      // Handle marker drag
      newMarker.addListener('dragend', () => {
        const position = newMarker.getPosition();
        if (position) {
          const newLocation = {
            latitude: position.lat(),
            longitude: position.lng()
          };
          setSelectedLocation(newLocation);
          onLocationSelect(newLocation.latitude, newLocation.longitude);
        }
      });

      // Handle map click
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const newLocation = {
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
          };
          setSelectedLocation(newLocation);
          newMarker.setPosition(event.latLng);
          onLocationSelect(newLocation.latitude, newLocation.longitude);
        }
      });

      setMapInstance(map);
      setMarker(newMarker);
    };

    // Load Google Maps script only if we have a valid API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== 'DEMO_KEY' && apiKey !== '';

    if (hasValidApiKey && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        initMap(); // This will show the fallback UI
      };
      document.head.appendChild(script);
    } else {
      initMap(); // This will show the fallback UI if no valid API key
    }

    return () => {
      if (marker) {
        google.maps.event.clearInstanceListeners(marker);
      }
    };
  }, []);

  // Update marker position when selectedLocation changes
  useEffect(() => {
    if (marker && selectedLocation) {
      marker.setPosition({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
    }
  }, [selectedLocation, marker]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Check if we have a valid API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== 'DEMO_KEY' && apiKey !== '';

    if (!hasValidApiKey) {
      // Show message that API key is required
      alert('Google Maps API key is required for address search. Please set up your API key.');
      return;
    }

    if (!mapInstance) return;

    setIsLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          const newLocation = {
            latitude: location.lat(),
            longitude: location.lng(),
            address: results[0].formatted_address
          };
          
          setSelectedLocation(newLocation);
          setMapCenter({ lat: location.lat(), lng: location.lng() });
          mapInstance.setCenter(location);
          mapInstance.setZoom(15);
          
          if (marker) {
            marker.setPosition(location);
          }
          
          onLocationSelect(newLocation.latitude, newLocation.longitude, newLocation.address);
        } else {
          alert('Address not found. Please try a different search term.');
        }
      });
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Search failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    // Check if we have a valid API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== 'DEMO_KEY' && apiKey !== '';

    if (!hasValidApiKey) {
      alert('Google Maps API key is required for current location. Please set up your API key.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setSelectedLocation(newLocation);
          setMapCenter({ lat: newLocation.latitude, lng: newLocation.longitude });
          
          if (mapInstance) {
            mapInstance.setCenter({ lat: newLocation.latitude, lng: newLocation.longitude });
            mapInstance.setZoom(15);
          }
          
          if (marker) {
            marker.setPosition({ lat: newLocation.latitude, lng: newLocation.longitude });
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
          <label className="block text-sm font-medium text-gray-700">
            Search Address
          </label>
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

      {/* Google Map */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Interactive Map
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

export default GoogleMapComponent; 