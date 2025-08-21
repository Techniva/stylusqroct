"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import TrustSection from "@/app/components/layout/TrustSection";
import CreateQrCtaSection from "@/app/components/layout/CreateQrCtaSection";
import CustomerFeedbackSection from "@/app/components/layout/CustomerFeedbackSection";
import BestFreeQrSection from "@/app/components/layout/BestFreeQrSection";
import QRCodePage from "@/app/components/layout/qrcode";
import FreeQRCodesComponent from './FreeQRCodesComponent';


interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

const MainLayout: React.FC = () => {
  
  const [user, setUser] = useState<UserData | null>(null);

  // Load user data from API on component mount and auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
    // Listen for custom auth event
    const handleAuthChange = () => fetchUser();
    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If user is logged in and tries to go back, prevent unwanted redirects
      if (user) {
        // Prevent going back to login page if user is already authenticated
        const currentUrl = window.location.href;
        if (currentUrl.includes('login') || currentUrl.includes('auth')) {
          // Push current state to prevent going back to login
          window.history.pushState(null, '', window.location.href);
          return;
        }
        
        const loginContext = localStorage.getItem('loginContext');
        if (loginContext) {
          try {
            const context = JSON.parse(loginContext);
            const timeSinceLogin = Date.now() - context.timestamp;
            
            // If login was recent, stay on current page
            if (timeSinceLogin < 5 * 60 * 1000) {
              // Prevent default back behavior
              window.history.pushState(null, '', window.location.href);
              return;
            }
          } catch (error) {
            console.error('Error handling popstate:', error);
          }
        }
      }
    };

    // Add initial state to prevent back button issues
    window.history.pushState(null, '', window.location.href);
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user]);

  // Note: Active type adjustment is now handled directly in the auth change handler
  // to prevent infinite loops and hook ordering issues

  return (
    <div className="w-full flex flex-col gap-6">
      <BestFreeQrSection />


      {/* Main Content: 2 columns */}
      <QRCodePage user={user} />

      {/* Trust/Marketing Section */}
      <TrustSection />

      {/* CTA Section */}
      <CreateQrCtaSection />

      {/* Customer Feedback Section */}
      <CustomerFeedbackSection />

      {/* Free QR Codes Section */}
      <FreeQRCodesComponent />
    </div>
  );
};

export default MainLayout;
