#!/bin/bash

echo "Google Maps API Key Setup"
echo "========================"
echo ""
echo "Please enter your Google Maps API key (starts with AIzaSy...):"
read api_key

if [[ $api_key == AIzaSy* ]]; then
    echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$api_key" > .env.local
    echo "✅ API key updated successfully!"
    echo "🔄 Restarting development server..."
    pkill -f "next dev" 2>/dev/null
    npm run dev &
    echo "✅ Development server restarted!"
    echo "🌐 Open http://localhost:3000 to test"
else
    echo "❌ Invalid API key format. It should start with 'AIzaSy'"
    echo "Please get a valid API key from Google Cloud Console"
fi 