import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in development to prevent 404 errors
  productionBrowserSourceMaps: false,
  
  // Webpack configuration to handle source maps and Node.js modules
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable source maps in development
      config.devtool = false;
    }
    
    // Handle Node.js modules in browser environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

export default nextConfig;
