// src/app/visiting-card/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FlipCard from "@/app/components/ui/FlipCard";
import AuthModal from "@/app/components/auth/AuthModal";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import HeroMotionCard from "@/app/components/ui/HeroMotionCard";
import LoginCheckModal from "@/app/components/auth/LoginCheckModal";

export default function VisitingCardsPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [showLoginCheckModal, setShowLoginCheckModal] = useState(false);

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

    const handleOpenAuthModal = (e: CustomEvent) => {
      setShowAuthModal(false);
      setTimeout(() => {
        setAuthMode(e.detail.mode);
        setShowAuthModal(true);
      }, 50);
    };
    window.addEventListener("openAuthModal", handleOpenAuthModal as EventListener);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
      window.removeEventListener("openAuthModal", handleOpenAuthModal as EventListener);
    };
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push("/visiting-card/vc/create");
    } else {
      setShowLoginCheckModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Visiting Cards" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <HeroMotionCard
          title="Create & Share Visiting Cards"
          description="Design, share, and manage your visiting cards online instantly."
          buttonText="Get Started Free"
          buttonOnClick={handleGetStarted}
          image="/web-image/visiting-card-hero.png"
          bgClassName="bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] py-12"
          buttonClassName="inline-block bg-white text-[#063970] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition"
        />

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#063970] mb-14">
            Why Choose Online Visiting Cards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FlipCard
              frontIcon="/web-image/instant-share-icon.png"
              frontTitle="Instant Sharing"
              frontText="Share your contact details instantly with just a scan."
              backTitle="Fast & Easy"
              backText="No printing, no apps required — connect instantly."
            />
            <FlipCard
              frontIcon="/web-image/customization-icon.png"
              frontTitle="Fully Customizable"
              frontText="Add logos, colors, and personal branding to stand out."
              backTitle="Your Style"
              backText="Make every card unique to your brand."
            />
            <FlipCard
              frontIcon="/web-image/eco-friendly-icon.png"
              frontTitle="Eco-Friendly"
              frontText="Go paperless while networking smartly."
              backTitle="Save Trees"
              backText="Reduce paper waste and stay modern."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Visiting Card?
            </h2>
            <p className="text-white text-lg mb-8">
              Design and share your personalized visiting card instantly.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block bg-white text-[#063970] px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Create Your Free Visiting Card
            </button>
          </div>
        </section>
      </main>

      {/* Login Check Modal */}
      <LoginCheckModal
        isOpen={showLoginCheckModal}
        onClose={() => setShowLoginCheckModal(false)}
        onLogin={() => {
          setShowLoginCheckModal(false);
          setAuthMode("login");
          setShowAuthModal(true);
        }}
        onRegister={() => {
          setShowLoginCheckModal(false);
          setAuthMode("register");
          setShowAuthModal(true);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
}
