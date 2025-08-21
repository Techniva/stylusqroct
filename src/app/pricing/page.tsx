import React from 'react';
import PricingPage from '@/app/components/pricing/PricingPage';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <PricingPage />
      </main>
      <Footer />
    </div>
  );
} 