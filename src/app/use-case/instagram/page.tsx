import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export default function InstagramUseCasePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#063970] mb-4">QR Codes for Instagram</h1>
              <p className="text-lg text-gray-700 mb-6">
                Use QR codes to instantly connect people to your Instagram profile, posts, stories, or reels. Grow your followers and make it easy for customers to engage with your brand visually.
              </p>
              <a href="/signup" className="inline-block bg-[#063970] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#052c5c] transition">Get Started Free</a>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/public/instagram-qr-hero.png" alt="QR for Instagram" className="w-72 h-72 object-contain rounded-xl shadow" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-[#063970] mb-10">How QR Codes Help on Instagram</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/profile-icon.png" alt="Instagram Profile" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">Profile Promotion</h3>
              <p className="text-gray-600 text-center">Let people scan to follow your Instagram profile instantly.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/post-icon.png" alt="Instagram Posts" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">Share Posts & Stories</h3>
              <p className="text-gray-600 text-center">Share posts, stories, or reels with a single scan.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/engage-icon.png" alt="Engagement" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">Boost Engagement</h3>
              <p className="text-gray-600 text-center">Make it easy for customers to engage with your brand visually.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to grow your Instagram?</h2>
            <p className="text-white mb-6">Start using QR codes for Instagram today. No credit card required.</p>
            <a href="/signup" className="inline-block bg-white text-[#063970] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">Create Your Free QR Code</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 