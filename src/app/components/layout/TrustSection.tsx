import React, { useState, useEffect } from "react";
import AuthModal from "@/app/components/auth/AuthModal";

const logos = [
  { src: "/trust-logo/coca-cola-client-logo.webp", alt: "Coca-Cola Logo", label: "Coca-Cola" },
  { src: "/trust-logo/abc-client-logo.webp", alt: "ABC Logo", label: "ABC" },
  { src: "/trust-logo/dennys-client-logo.webp", alt: "Denny's Logo", label: "Denny's" },
  { src: "/trust-logo/ikea-client-logo.webp", alt: "Ikea Logo", label: "IKEA" },
  { src: "/trust-logo/hnm-client-logo.webp", alt: "H&M Logo", label: "H&M" },
];

const TrustSection: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [showAlreadyJoinedMessage, setShowAlreadyJoinedMessage] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in by calling the API
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          console.log('Auth check - user found:', data.user);
        } else {
          setUser(null);
          console.log('Auth check - no user found');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
      }
    };

    fetchUser();

    // Listen for auth state changes
    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const handleJoinClick = () => {
    console.log('Join button clicked, user:', user);
    if (user) {
      setShowAlreadyJoinedMessage(true);
      setTimeout(() => setShowAlreadyJoinedMessage(false), 3000);
    } else {
      setAuthMode("register");
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#312e81] via-[#4f46e5] to-[#7c3aed] rounded-xl shadow p-8 my-4 flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col gap-4 min-w-[250px] items-start md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            More than <span className="text-indigo-200">250,000</span> people and businesses trust <span className="text-indigo-200">StylusQR</span> to create and manage their QR Codes.
          </h2>
          <div className="mt-2 w-full flex justify-center md:justify-start">
            <button
              onClick={handleJoinClick}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white text-lg font-bold shadow hover:from-[#4338ca] hover:to-[#6d28d9] transition-colors"
            >
              Join them now!     
            </button>
          </div>
        </div>
        {/* Right: Logos */}
        <div className="flex-1 flex flex-wrap justify-center items-center gap-6 min-w-[200px]">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex flex-col items-center w-24">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg shadow-sm mb-2">
                <img src={logo.src} alt={logo.alt} className="max-w-[60px] max-h-[60px] object-contain" />
              </div>
              <span className="text-xs text-indigo-100 font-medium text-center">{logo.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode} 
      />

      {/* Already Joined Message */}
      {showAlreadyJoinedMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-sm absolute inset-0" onClick={() => setShowAlreadyJoinedMessage(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're Already Joined!</h3>
              <p className="text-gray-600 mb-4">
                Welcome back! You're already part of our community of trusted users.
              </p>
              <button
                onClick={() => setShowAlreadyJoinedMessage(false)}
                className="px-6 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrustSection; 