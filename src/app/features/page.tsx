import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Body from "@/app/components/layout/Body";
import React from 'react';

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-4 text-[#063970]">Features</h1>
          <p className="mb-8 text-gray-700 text-lg">Discover what makes StylusQR powerful and easy to use.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <span className="bg-[#063970] text-white rounded-full p-2"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg></span>
              <div>
                <h2 className="text-xl font-semibold text-[#063970]">Advanced QR Styling</h2>
                <p className="text-gray-600">Customize dot styles, corners, colors, and add your logo for a unique QR code.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-[#063970] text-white rounded-full p-2"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0114.13-3.36L23 10"></path><path d="M20.49 15A9 9 0 015.87 18.36L1 14"></path></svg></span>
              <div>
                <h2 className="text-xl font-semibold text-[#063970]">Dynamic QR Codes</h2>
                <p className="text-gray-600">Change the destination URL anytime without reprinting your QR code.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-[#063970] text-white rounded-full p-2"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>
              <div>
                <h2 className="text-xl font-semibold text-[#063970]">Secure & Reliable</h2>
                <p className="text-gray-600">Your QR codes and data are protected with robust security and privacy measures.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-[#063970] text-white rounded-full p-2"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smartphone"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg></span>
              <div>
                <h2 className="text-xl font-semibold text-[#063970]">Mobile Friendly</h2>
                <p className="text-gray-600">Easily scan and manage QR codes from any device, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
} 