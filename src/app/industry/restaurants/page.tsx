"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import AuthModal from "@/app/components/auth/AuthModal";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import HeroMotionCard from '@/app/components/ui/HeroMotionCard';

export default function RestaurantsPage() {

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
              { label: "Industries", href: "/industries" },
              { label: "Restaurants" }, // current page, no href
            ]}
          />
        </div>

       {/* Hero Section */}
        <HeroMotionCard
          title="QR Codes for Restaurants"
          description="Modernize your restaurant with digital menus, contactless ordering,
                      and instant feedback. Enhance customer experience and streamline
                      your operations effortlessly."
          buttonText="Get Started Free"
          buttonOnClick={handleGetStarted}
          image="/industry/restaurant/restaurant-qr-hero.jpg"
          bgClassName="bg-gradient-to-br from-[#7B2C2C] via-[#A83232] to-[#D94E2B] py-12"
          buttonClassName="inline-block bg-white text-[#B22222] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition"
        />


       {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#063970] mb-14">
          How QR Codes Help Restaurants
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left: Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Digital Menus",
                desc: "Let customers scan a QR code to view your menu on their phone. Update items and prices instantly—no reprinting needed.",
                icon: "/icons/menu.svg",
              },
              {
                title: "Contactless Ordering",
                desc: "Enable guests to order and pay from their table, reducing wait times and improving safety.",
                icon: "/icons/order.svg",
              },
              {
                title: "Instant Feedback",
                desc: "Collect reviews easily by linking a QR code to a feedback form or Google review page.",
                icon: "/icons/feedback.svg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <img src={item.icon} alt={item.title} className="w-14 h-14 mb-4" />
                <h3 className="font-semibold text-xl text-[#063970] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: Big Image */}
          <div className="flex justify-center">
            <img
              src="/industry/restaurant/restaurant-qr-demo.png"
              alt="QR Code in Restaurant"
              className="rounded-2xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>


        {/* Use Cases Section */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#063970] mb-14">
              Popular Ways Restaurants Use QR Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Table Menus",
                  desc: "Print QR codes on tables so customers can instantly view the menu without waiting.",
                  icon: "/icons/table.svg",
                },
                {
                  title: "Takeaway & Delivery",
                  desc: "Add QR codes to packaging for easy reordering or leaving reviews.",
                  icon: "/icons/delivery.svg",
                },
                {
                  title: "Marketing Campaigns",
                  desc: "Run promos by linking QR codes to loyalty programs, offers, or discount coupons.",
                  icon: "/icons/promo.svg",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img src={item.icon} alt={item.title} className="w-14 h-14 mb-5" />
                  <h3 className="font-semibold text-xl text-[#063970] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#063970] mb-14">
              How to Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "1", title: "Create", desc: "Sign up and generate a QR code for your menu or ordering system." },
                { step: "2", title: "Print", desc: "Download and place QR codes on tables, receipts, or flyers." },
                { step: "3", title: "Scan", desc: "Customers scan and instantly engage with your restaurant digitally." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="w-16 h-16 flex items-center justify-center text-xl font-bold bg-gradient-to-br from-[#063970] to-[#0a4d99] text-white rounded-full shadow-md mb-6 transition transform hover:scale-110">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-lg text-[#063970] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { value: "70%", text: "of customers prefer contactless menus" },
              { value: "3x Faster", text: "ordering when using QR codes" },
              { value: "50% Less", text: "printing cost on menus & promotions" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-10 transition transform hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-4xl font-extrabold text-[#D94E2B] mb-4">{stat.value}</h3>
                <p className="text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your restaurant?
            </h2>
            <p className="text-white text-lg mb-8">
              Start using QR codes for menus, ordering, and more. No credit card required.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block bg-white text-[#063970] px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Create Your Free QR Code
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
