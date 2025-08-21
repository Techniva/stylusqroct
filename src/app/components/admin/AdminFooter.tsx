"use client";

import React from 'react';
import { QrCode, Mail } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto top-0 z-30">
      <div className="max-w-7xl mx-auto p-3">
        <div className="flex flex-row md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <QrCode className="h-4 w-4 text-[#063970]" />
            <span>StylusQR © {currentYear} Admin Panel</span>
            
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="hidden sm:inline">Version 1.0.0</span>
            <div className="flex items-center space-x-2">
              <a 
                href="mailto:support@stylusqr.com" 
                className="flex items-center space-x-1 hover:text-[#063970] transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 