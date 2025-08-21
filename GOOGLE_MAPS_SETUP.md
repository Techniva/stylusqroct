# Google Maps Integration Setup

## Overview
The location data type now includes a full Google Maps integration with address search and pin drop functionality.

## Features
- **Interactive Google Map**: Click to drop pins, drag markers
- **Address Search**: Search for any address or place name
- **Current Location**: Use device GPS location
- **Quick Locations**: Pre-defined popular cities
- **Coordinate Input**: Direct latitude/longitude entry

## Setup Instructions

### 1. Get Google Maps API Key

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "StylusQR Maps")
4. Click "Create"

#### Step 2: Enable Required APIs
1. In your project, go to "APIs & Services" → "Library"
2. Search and enable these APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Places API**

#### Step 3: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key

#### Step 4: Restrict API Key (Recommended)
1. Click on your API key
2. Under "Application restrictions", select "HTTP referrers"
3. Add your domain: `localhost:3000/*` (for development)
4. Under "API restrictions", select "Restrict key"
5. Select the 3 APIs you enabled above
6. Click "Save"

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with your real API key from step 3.

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Go to the QR code creation page
3. Select "Location" as the QR function
4. Choose "Search Address" radio button
5. You should see the interactive Google Map

## Usage

### Location Selection Methods:

#### 1. Address Search
- Type any address in the search bar
- Click "Search" or press Enter
- Map will center on the found location
- Pin will be placed automatically

#### 2. Map Click
- Click anywhere on the map to drop a pin
- Pin will be draggable for fine-tuning
- Coordinates will update automatically

#### 3. Current Location
- Click the crosshair icon (📍)
- Allow location access when prompted
- Map will center on your current location

#### 4. Quick Locations
- Click any of the preset location buttons
- Map will center and place pin automatically

#### 5. Direct Coordinates
- Switch to "Coordinates" radio button
- Enter latitude,longitude directly
- Location preview will show below

## Components

### LocationMapInput.tsx
- Main component for location selection
- Radio buttons for input method selection
- Integrates with GoogleMapComponent

### GoogleMapComponent.tsx
- Full Google Maps integration
- Address search with geocoding
- Interactive pin dropping
- Current location detection
- Quick location presets

### API Endpoints
- `/api/geocode`: Geocoding service (uses real Google API when key is provided)

## Troubleshooting

### Map Not Loading
- Check if API key is correctly set in `.env.local`
- Verify APIs are enabled in Google Cloud Console
- Check browser console for errors

### Search Not Working
- Ensure Geocoding API is enabled
- Check API key restrictions
- Verify network connection

### Current Location Not Working
- Check if HTTPS is enabled (required for geolocation)
- Ensure location permissions are granted
- Try refreshing the page

## Security Notes
- Always restrict your API key to your domain
- Monitor API usage in Google Cloud Console
- Consider implementing rate limiting for production use
- Never commit API keys to version control

## Demo Mode
If no API key is provided, the app will use demo mode with limited functionality. For full features, follow the setup instructions above. 