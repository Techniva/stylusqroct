#!/bin/bash

echo "🚀 Project Size Optimization Script"
echo "=================================="

# 1. Remove system files
echo "📁 Removing system files..."
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete
find . -name "*.log" -delete
find . -name "*.tmp" -delete

# 2. Clean npm cache
echo "🧹 Cleaning npm cache..."
npm cache clean --force

# 3. Remove unused dependencies
echo "📦 Removing unused dependencies..."
npm prune

# 4. Clean public assets
echo "🗂️ Cleaning public assets..."
find public -name "*.html" -type f | grep -E "(test|debug)" | xargs rm -f

# 5. Remove duplicate config files
echo "⚙️ Removing duplicate configs..."
if [ -f "tailwind.config.js" ] && [ -f "tailwind.config.ts" ]; then
    rm tailwind.config.js
fi

# 6. Clean build artifacts
echo "🏗️ Cleaning build artifacts..."
rm -rf .next
rm -rf out
rm -f tsconfig.tsbuildinfo

# 7. Show final size
echo "📊 Final project size:"
du -sh . | head -1

echo "✅ Optimization complete!" 