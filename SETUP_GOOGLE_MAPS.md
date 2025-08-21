# Quick Setup: Google Maps API Key

## Step 1: Get Google Maps API Key

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create New Project
- Click "Select a project" at the top
- Click "New Project"
- Name it: "StylusQR Maps"
- Click "Create"

### 3. Enable APIs
- Go to "APIs & Services" → "Library"
- Search and enable these APIs:
  - **Maps JavaScript API**
  - **Geocoding API**
  - **Places API**

### 4. Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy the generated key (it looks like: `AIzaSyC...`)

## Step 2: Add API Key to Project

### 1. Create .env.local file
In your project root, create a file named `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 2. Replace with your key
Replace `your_api_key_here` with the API key you copied.

### 3. Restart your development server
```bash
npm run dev
```

## Step 3: Test

1. Go to your QR code creation page
2. Select "Location" as QR function
3. Choose "Search Address" radio button
4. You should now see the interactive Google Map!

## Troubleshooting

### If you still see "Google Maps Not Available":
1. Check that `.env.local` file exists in project root
2. Verify API key is correct (starts with `AIzaSy`)
3. Restart your development server
4. Clear browser cache and refresh

### If you get API errors:
1. Make sure all 3 APIs are enabled in Google Cloud Console
2. Check that your API key is not restricted too much
3. For development, you can temporarily remove restrictions

## Security Note
For production, always restrict your API key to your domain! 