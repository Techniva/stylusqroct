import React, { useState } from 'react';
import { Link, FileText, User, Wifi, Facebook, Instagram, Youtube, MapPin } from 'lucide-react';

const qrTypes = [
  { icon: <Link className="w-10 h-10 text-blue-500 bg-blue-100 rounded-full p-2 shadow" />, title: 'URL QR Codes', desc: 'Direct users to your website, YouTube, or any online destination instantly.' },
  { icon: <FileText className="w-10 h-10 text-green-600 bg-green-100 rounded-full p-2 shadow" />, title: 'Text QR Codes', desc: 'Share any message, instruction, or info as plain text with a scan.' },
  { icon: <User className="w-10 h-10 text-purple-600 bg-purple-100 rounded-full p-2 shadow" />, title: 'vCard QR Codes', desc: 'Let others save your contact details to their phone in one tap.' },
  { icon: <Wifi className="w-10 h-10 text-yellow-500 bg-yellow-100 rounded-full p-2 shadow" />, title: 'WiFi QR Codes', desc: 'Connect to WiFi networks without typing passwords—just scan.' },
  { icon: <Facebook className="w-10 h-10 text-blue-700 bg-blue-100 rounded-full p-2 shadow" />, title: 'Facebook QR Codes', desc: 'Grow your audience by linking directly to your Facebook page or event.' },
  { icon: <Instagram className="w-10 h-10 text-pink-500 bg-pink-100 rounded-full p-2 shadow" />, title: 'Instagram QR Codes', desc: 'Make it easy for users to find and follow your Instagram profile.' },
  { icon: <Youtube className="w-10 h-10 text-red-600 bg-red-100 rounded-full p-2 shadow" />, title: 'YouTube QR Codes', desc: 'Send users directly to your YouTube videos or channel.' },
  { icon: <MapPin className="w-10 h-10 text-emerald-600 bg-emerald-100 rounded-full p-2 shadow" />, title: 'Location QR Codes', desc: 'Share a map location for events, stores, or meetups.' }
];

const FreeQRCodesComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? qrTypes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === qrTypes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full mt-4 py-8 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #312e81 60%, #0f172a 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 drop-shadow">
          What free QR Codes can I generate?
        </h2>

        {/* Large screens: grid */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {qrTypes.map((type, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/90 rounded-2xl shadow-lg p-7 hover:scale-105 hover:shadow-2xl transition-transform duration-200 border border-gray-100 min-h-[220px]"
            >
              <div className="mb-4">{type.icon}</div>
              <div className="font-semibold text-lg text-[#063970] mb-1 text-center drop-shadow-sm">{type.title}</div>
              <div className="text-gray-600 text-sm text-center leading-relaxed">{type.desc}</div>
            </div>
          ))}
        </div>

        {/* Small & medium screens: single card carousel */}
        <div className="lg:hidden relative w-full max-w-xs mx-auto">
          {/* Card with transition */}
          <div className="overflow-hidden rounded-2xl">
            <div
              key={currentIndex}
              className="flex flex-col items-center bg-white/90 p-6 rounded-2xl shadow-lg border border-gray-100 transition-transform duration-500 ease-in-out"
            >
              <div className="mb-4">{qrTypes[currentIndex].icon}</div>
              <div className="font-semibold text-lg text-[#063970] mb-1 text-center drop-shadow-sm">{qrTypes[currentIndex].title}</div>
              <div className="text-gray-600 text-sm text-center leading-relaxed">{qrTypes[currentIndex].desc}</div>
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-[36px] -translate-y-1/2 bg-white rounded-full shadow p-2 text-2xl text-blue-700"
          >
            &#8249;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-[36px] -translate-y-1/2 bg-white rounded-full shadow p-2 text-2xl text-blue-700"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreeQRCodesComponent;
