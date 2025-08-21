"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import FlipCard from "../components/ui/FlipCard";
import AuthModal from "@/app/components/auth/AuthModal";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import HeroMotionCard from "../components/ui/HeroMotionCard";

export default function DigitalBusinessCardsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      }
    };

    fetchUser();

    const handleAuthChange = () => fetchUser();
    window.addEventListener("authStateChanged", handleAuthChange);
    return () => window.removeEventListener("authStateChanged", handleAuthChange);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setAuthMode("login");
      setShowAuthModal(true);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
         {/* Breadcrumbs */}
          <div className="max-w-6xl mx-auto px-6 mt-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Digital Business Cards" }, // current page, no href                
              ]}
            />
          </div>
          
          {/* Hero Section */}
          <HeroMotionCard
            title="Digital Business Cards with QR Codes"
            description="Share your contact details instantly with smart, eco-friendly digital business cards."
            buttonText="Get Started Free"
            buttonOnClick={handleGetStarted} // ✅ works
            image="/web-image/stylusqr-business-card.png"
            bgClassName="bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] py-12"
            buttonClassName="inline-block bg-white text-[#063970] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition"
          />

        {/* Features Section with Flip Cards */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#063970] mb-14">
            Why Choose QR Code Business Cards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FlipCard
              frontIcon="/web-image/instant-share-icon.png"
              frontTitle="Instant Info Sharing"
              frontText="Share your contact details instantly with just a QR scan — no typing required."
              backTitle="Fast & Simple"
              backText="No apps needed. Just scan and connect instantly."
            />
            <FlipCard
              frontIcon="/web-image/customization-icon.png"
              frontTitle="Fully Customizable"
              frontText="Add your logo, colors, and personal branding to stand out from the crowd."
              backTitle="Make It Yours"
              backText="Tailor every detail to match your style."
            />
            <FlipCard
              frontIcon="/web-image/eco-friendly-icon.png"
              frontTitle="Eco-Friendly"
              frontText="Go paperless and reduce waste while keeping your networking smart and modern."
              backTitle="Save the Planet"
              backText="Each card helps reduce paper waste."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Upgrade Your Networking?
            </h2>
            <p className="text-white text-lg mb-8">
              Create your personalized QR code business card today. Share it
              anywhere, anytime.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block bg-white text-[#063970] px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Create Your Free Digital Card
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
}
