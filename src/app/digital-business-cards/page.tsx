"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FlipCard from "../components/ui/FlipCard";
import AuthModal from "@/app/components/auth/AuthModal";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import HeroMotionCard from "../components/ui/HeroMotionCard";
import LoginCheckModal from "../components/auth/LoginCheckModal";
import { motion } from "framer-motion";

export default function DigitalBusinessCardsPage() {
  const router = useRouter();

  // -------------------------------
  // State
  // -------------------------------
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [showLoginCheckModal, setShowLoginCheckModal] = useState(false);

  // -------------------------------
  // Fetch user and listen for auth changes
  // -------------------------------
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

    // Listen to modal switch events from AuthModal
    const handleOpenAuthModal = (e: CustomEvent) => {
      setShowAuthModal(false); // close any current modal
      setTimeout(() => {
        setAuthMode(e.detail.mode); // switch mode
        setShowAuthModal(true);    // reopen modal
      }, 50); // short delay for animation
    };
    window.addEventListener("openAuthModal", handleOpenAuthModal as EventListener);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
      window.removeEventListener("openAuthModal", handleOpenAuthModal as EventListener);
    };
  }, []);

  // -------------------------------
  // Handle "Get Started"
  // -------------------------------
  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
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
              { label: "Digital Business Cards" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <HeroMotionCard
          title="Digital Business Cards with QR Codes"
          description="Share your contact details instantly with smart, eco-friendly digital business cards."
          buttonText="Get Started Free"
          buttonOnClick={handleGetStarted}
          image="/web-image/stylusqr-business-card.png"
          bgClassName="bg-gradient-to-br from-[#1E0B37] via-[#3B1C5B] to-[#5B21B6] py-12"
          buttonClassName="inline-block bg-gradient-to-r from-[#E879F9] to-[#8B5CF6] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition"
          />

        {/* Features Section */}
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
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1E0B37] via-[#3B1C5B] to-[#5B21B6] py-16"
        >
          <div className="max-w-2xl mx-auto text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Upgrade Your Networking?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-lg mb-8"
            >
              Create your personalized QR code business card today. Share it anywhere, anytime.
            </motion.p>

            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-gradient-to-r from-[#E879F9] to-[#8B5CF6] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
            >
              Create Your Free Digital Card
            </motion.button>
          </div>
        </motion.section>

      </main>

      {/* -------------------------------
          Login + Register Check Modal
      ------------------------------- */}
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

      {/* -------------------------------
          Auth Modal
      ------------------------------- */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
}
