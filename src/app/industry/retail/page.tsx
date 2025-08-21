import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export default function RetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#063970] mb-4">QR Codes for Retail</h1>
              <p className="text-lg text-gray-700 mb-6">
                Transform your retail experience with QR codes for product info, in-store promotions, loyalty programs, and contactless payments. Engage shoppers and drive sales.
              </p>
              <a href="/signup" className="inline-block bg-[#063970] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#052c5c] transition">Get Started Free</a>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/public/retail-qr-hero.png" alt="QR for Retail" className="w-72 h-72 object-contain rounded-xl shadow" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-[#063970] mb-10">How QR Codes Help Retail</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/product-icon.png" alt="Product Info" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">Product Info</h3>
              <p className="text-gray-600 text-center">Let shoppers scan to view product details, reviews, and videos instantly.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/promo-icon.png" alt="In-store Promotions" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">In-store Promotions</h3>
              <p className="text-gray-600 text-center">Promote special offers and discounts with QR codes on shelves and displays.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="/public/loyalty-icon.png" alt="Loyalty Programs" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">Loyalty & Payments</h3>
              <p className="text-gray-600 text-center">Enable loyalty sign-ups and contactless payments for a seamless checkout experience.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to upgrade your store?</h2>
            <p className="text-white mb-6">Start using QR codes for product info, loyalty, and more. No credit card required.</p>
            <a href="/signup" className="inline-block bg-white text-[#063970] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">Create Your Free QR Code</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 