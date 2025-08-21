import React, { useState, useEffect } from "react";
import TestimonialCard from "@/app/components/layout/cards/TestimonialCard";

const testimonials = [
  {
    name: "Maor",
    title: "Owner",
    company: "ABC Plumbing",
    testimonial: "As a tradesman, being able to give my customers an easy way to view and share my business card is my bread and butter. StylusQR had the perfect solution for me, and I am very grateful to them for going the extra mile in showing me the best practices in implementing this solution.",
    rating: 4.5,
  },
  {
    name: "Gideon Valkin",
    title: "Director",
    company: "Monzo",
    testimonial: "StylusQR has made it SUPER easy and simple for us to generate enterprise grade QR codes at scale. The platform is extremely easy to navigate and we've used it to generate QR codes used thousands of times over the years. The StylusQR support has gone above and beyond any requests we've had.",
    rating: 5,
  },
  {
    name: "Adam Casper",
    title: "Owner",
    company: "i11.com",
    testimonial: "Since we started using StylusQR, we've been able to implement a number of innovative solutions across both marketing and sales to improve the way we communicate and engage with our customer base. As a small business owner, this is invaluable. We chose StylusQR because much like us, they understand that the customer comes first.",
    rating: 5,
  },
  {
    name: "Jessica",
    title: "Owner",
    company: "Jessica's Bakery",
    testimonial: "We love using StylusQR to let our customers scan and view our menus online. Better yet, we can constantly update our specials and pricing without having to generate a new code by using StylusQR's dynamic codes. During Covid this was a game changer!",
    rating: 5,
  },
  {
    name: "Dr. Sarah Chen",
    title: "Principal",
    company: "Tech Academy",
    testimonial: "StylusQR has revolutionized how we handle student registration and course materials. Our QR codes link directly to our learning management system, making it seamless for students to access their courses. The analytics help us track engagement and improve our educational programs.",
    rating: 4.5,
  },
  {
    name: "Marcus Rodriguez",
    title: "Store Manager",
    company: "Urban Outfitters",
    testimonial: "The QR codes from StylusQR have transformed our in-store experience. Customers can scan codes on product tags to see detailed information, reviews, and even check inventory at other locations. It's like having a digital assistant in every aisle!",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    title: "Medical Director",
    company: "HealthFirst Clinic",
    testimonial: "StylusQR's QR codes have streamlined our patient check-in process and made it easier to share important health information. Patients can scan codes to access their medical records, appointment schedules, and educational materials. It's been a game-changer for our practice.",
    rating: 5,
  },
];

const useResponsiveCardsPerView = () => {
  const [cards, setCards] = useState(3);
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) setCards(1);
      else if (window.innerWidth < 1024) setCards(2);
      else setCards(3);
    };
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);
  return cards;
};

const CustomerFeedbackSection: React.FC = () => {
  const CARDS_PER_VIEW = useResponsiveCardsPerView();
  const [current, setCurrent] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const totalPages = Math.ceil(testimonials.length / CARDS_PER_VIEW);
  const currentPage = Math.floor(current / CARDS_PER_VIEW);

  useEffect(() => {
    // Reset to first page if cards per view changes
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

  const pageTestimonials = testimonials.slice(current, current + CARDS_PER_VIEW);

  return (
    <section className="w-full rounded-xl shadow p-4 sm:p-8 my-4 flex flex-col gap-8 bg-gradient-to-b from-[#312e81] via-[#4f46e5] to-[#7c3aed]">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What <span className="text-indigo-200">StylusQR</span> customers are saying
        </h2>
        <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust <span className="text-indigo-200">StylusQR</span> for their QR code needs
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="absolute left-0 z-10 bg-white rounded-full shadow p-2 text-2xl text-[#063970] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous testimonials"
        >
          &#8249;
        </button>
        {/* Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center overflow-hidden items-stretch transition-opacity duration-300 ${fade === 'in' ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxWidth: 1040, margin: '0 auto' }}
        >
          {pageTestimonials.map((testimonial, idx) =>
            testimonial && testimonial.name ? (
              <div
                key={idx}
                className="w-full max-w-xs mx-auto"
              >
                <TestimonialCard
                  {...testimonial}
                  expanded={expandedIndex === current + idx}
                  onToggle={() => setExpandedIndex(expandedIndex === current + idx ? null : current + idx)}
                />
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
          className="absolute right-0 z-10 bg-white rounded-full shadow p-2 text-2xl text-[#063970] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next testimonials"
        >
          &#8250;
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDot(idx)}
            className={`w-3 h-3 rounded-full border-2 border-[#063970] transition-all duration-200 ${
              idx === currentPage ? 'bg-[#063970]' : 'bg-white'
            }`}
            aria-label={`Go to testimonials page ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedbackSection; 