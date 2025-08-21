import React, { useRef, useLayoutEffect } from "react";

interface TestimonialCardProps {
  name: string;
  title: string;
  company: string;
  testimonial: string;
  avatar?: string;
  rating?: number; // out of 5, can be 4.5, 5, etc.
  expanded?: boolean;
  onToggle?: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <svg key={i} className="w-5 h-5 inline-block text-[#063970]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      );
    } else if (rating > i - 1 && rating < i) {
      // half star
      stars.push(
        <svg key={i} className="w-5 h-5 inline-block text-[#063970]" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id={`half${i}`}><stop offset="50%" stopColor="#063970"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs><path fill={`url(#half${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-5 h-5 inline-block text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      );
    }
  }
  return <div className="mb-2">{stars}</div>;
};

const clampLines = 4;

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  title, 
  company, 
  testimonial, 
  avatar, 
  rating = 5, 
  expanded = false, 
  onToggle 
}) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const isLong = testimonial.split(' ').length > 40 || testimonial.length > 220;

  useLayoutEffect(() => {
    // No-op, but keeps the ref logic for future use if needed
  }, [expanded, testimonial]);

  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow p-6 w-[320px] min-h-[320px] border border-[#e0eaff] hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-[#063970] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {avatar || name.charAt(0)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-sm text-[#063970] font-medium">{company}</p>
        </div>
      </div>
      <StarRating rating={rating} />
      <div className="flex-1 overflow-hidden">
        <p
          ref={contentRef}
          className={`text-gray-700 text-sm leading-relaxed italic ${!expanded ? 'line-clamp-4' : ''}`}
          style={!expanded ? { display: '-webkit-box', WebkitLineClamp: clampLines, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
        >
          "{testimonial}"
        </p>
      </div>
      {isLong && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-[#063970] text-sm font-medium hover:underline" onClick={onToggle}>
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard; 