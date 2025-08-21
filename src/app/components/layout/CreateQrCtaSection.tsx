import React, { useState, useEffect } from "react";
import FeatureCard from "@/app/components/layout/cards/FeatureCard";

const features = [
  {
    icon: "💼",
    title: "Business Card QR Code",
    description: "Share your professional contact details instantly with a scannable QR code business card.",
  },
  {
    icon: "📶",
    title: "Wifi QR Code",
    description: "Let guests connect to your WiFi network easily by scanning a QR code—no password typing needed!",
  },
  {
    icon: "⭐",
    title: "Google Review QR Code",
    description: "Get more customer reviews by sending people directly to your Google review page with a scan.",
  },
  {
    icon: "👤",
    title: "vCard QR Code",
    description: "Effortlessly share your vCard contact info for quick saving to any device.",
  },
];

const useResponsiveCardsPerView = () => {
  const [cards, setCards] = useState(4);
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) setCards(1);
      else if (window.innerWidth < 1024) setCards(2);
      else setCards(4);
    };
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);
  return cards;
};

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);
  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isLarge;
};

const CreateQrCtaSection: React.FC = () => {
  const CARDS_PER_VIEW = useResponsiveCardsPerView();
  const isLargeScreen = useIsLargeScreen();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const totalPages = Math.ceil(features.length / CARDS_PER_VIEW);
  const currentPage = Math.floor(current / CARDS_PER_VIEW);

  useEffect(() => {
    setCurrent(0);
  }, [CARDS_PER_VIEW]);

  const handlePageChange = (newCurrent: number) => {
    setFade('out');
    setTimeout(() => {
      setCurrent(newCurrent);
      setFade('in');
    }, 250);
  };

  const handlePrev = () => {
    if (current > 0) handlePageChange(Math.max(current - CARDS_PER_VIEW, 0));
  };
  const handleNext = () => {
    if (current < (totalPages - 1) * CARDS_PER_VIEW) handlePageChange(Math.min(current + CARDS_PER_VIEW, (totalPages - 1) * CARDS_PER_VIEW));
  };
  const handleDot = (idx: number) => {
    if (current !== idx * CARDS_PER_VIEW) handlePageChange(idx * CARDS_PER_VIEW);
  };

  const pageFeatures = features.slice(current, current + CARDS_PER_VIEW);

  return (
    <section className="w-full rounded-xl shadow-2xl p-4 sm:p-8 my-4 flex flex-col gap-8 bg-gradient-to-br from-[#059669] via-[#06b6d4] to-[#38bdf8]">
    {/* Top: Text */}
      <div className="flex-1 flex flex-col gap-4 min-w-[250px] text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-1 rounded-full bg-cyan-200 mb-2"></div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-200 via-white to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
        Start Creating Your Own QR Codes
      </h2>
        </div>
        <p className="text-cyan-50 text-lg font-medium">
        It’s simple, fun and fast! With our QR code generator, you can create a QR code in minutes.
      </p>
    </div>
      {/* Feature Cards: Carousel for small/medium, static grid for large */}
      {isLargeScreen ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </div>
      ) : (
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="absolute left-0 z-10 bg-white rounded-full shadow p-2 text-2xl text-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous features"
          >
            &#8249;
          </button>
          {/* Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center overflow-hidden items-stretch transition-opacity duration-300 ${fade === 'in' ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxWidth: 1040, margin: '0 auto' }}
          >
            {pageFeatures.map((feature, idx) =>
              feature && feature.title ? (
                <div
                  key={idx}
                  className="w-full max-w-xs mx-auto"
                >
                  <FeatureCard {...feature} />
                </div>
              ) : (
                <div key={idx} className="w-full max-w-xs bg-transparent" />
              )
            )}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={current >= (totalPages - 1) * CARDS_PER_VIEW}
            className="absolute right-0 z-10 bg-white rounded-full shadow p-2 text-2xl text-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next features"
          >
            &#8250;
          </button>
        </div>
      )}
      {/* Pagination Dots (only for carousel) */}
      {!isLargeScreen && (
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDot(idx)}
              className={`w-3 h-3 rounded-full border-2 border-cyan-700 transition-all duration-200 ${
                idx === currentPage ? 'bg-cyan-700' : 'bg-white'
              }`}
              aria-label={`Go to features page ${idx + 1}`}
            />
          ))}
    </div>
      )}
      {/* CTA Button removed as per request */}
  </section>
);
};

export default CreateQrCtaSection; 