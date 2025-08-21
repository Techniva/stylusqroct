import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  try {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'DEMO_KEY') {
      // Return mock data for demo mode
      const mockGeocodingData = {
        latitude: 40.7128,
        longitude: -74.0060,
        formatted_address: address,
        place_id: 'mock_place_id'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return NextResponse.json(mockGeocodingData);
    }

    // Use real Google Maps Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      
      return NextResponse.json({
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id
      });
    } else {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}

// Real implementation would use Google Maps API:
/*
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      
      return NextResponse.json({
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id
      });
    } else {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
*/ 