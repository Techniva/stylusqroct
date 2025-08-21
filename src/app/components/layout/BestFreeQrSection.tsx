"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, QrCode, Palette, Zap, Shield, Smartphone, Globe, Download, Play, Pause } from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    title: "Create QR Codes Instantly",
    subtitle: "No registration required",
    description: "Generate professional QR codes in seconds. Simply enter your URL, customize the design, and download - completely free!",
    icon: <QrCode className="w-12 h-12" />,
    color: "from-blue-600 to-blue-800",
    bgColor: "bg-blue-50",
    videoBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    particles: 15
  },
  {
    id: 2,
    title: "Customize Your Design",
    subtitle: "Make it uniquely yours",
    description: "Choose from different shapes, colors, and styles. Add your logo, change background colors, and create QR codes that match your brand.",
    icon: <Palette className="w-12 h-12" />,
    color: "from-purple-600 to-purple-800",
    bgColor: "bg-purple-50",
    videoBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    particles: 20
  },
  {
    id: 3,
    title: "Multiple QR Code Types",
    subtitle: "More than just URLs",
    description: "Create QR codes for websites, WiFi networks, contact information, PDF files, YouTube videos, and much more.",
    icon: <Globe className="w-12 h-12" />,
    color: "from-green-600 to-green-800",
    bgColor: "bg-green-50",
    videoBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    particles: 18
  },
  {
    id: 4,
    title: "High-Quality Downloads",
    subtitle: "Perfect for printing",
    description: "Download your QR codes in high resolution PNG format. Perfect for business cards, posters, flyers, and any marketing materials.",
    icon: <Download className="w-12 h-12" />,
    color: "from-yellow-600 to-yellow-800",
    bgColor: "bg-yellow-50",
    videoBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    particles: 12
  },
  {
    id: 5,
    title: "Mobile-Friendly",
    subtitle: "Scans perfectly on phones",
    description: "Optimized for mobile scanning. Your QR codes will work flawlessly on any smartphone camera app.",
    icon: <Smartphone className="w-12 h-12" />,
    color: "from-indigo-600 to-indigo-800",
    bgColor: "bg-indigo-50",
    videoBg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    particles: 16
  },
  {
    id: 6,
    title: "100% Free Forever",
    subtitle: "No hidden costs",
    description: "Create unlimited QR codes without any watermarks, subscriptions, or hidden fees. It's completely free to use.",
    icon: <Shield className="w-12 h-12" />,
    color: "from-red-600 to-red-800",
    bgColor: "bg-red-50",
    videoBg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    particles: 14
  }
];

const BestFreeQrSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
 // const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  // Predefined particle positions to avoid hydration issues
  const particlePositions = [
    { left: '10%', top: '20%', delay: '0s', duration: '3s' },
    { left: '85%', top: '15%', delay: '0.5s', duration: '4s' },
    { left: '20%', top: '80%', delay: '1s', duration: '3.5s' },
    { left: '75%', top: '70%', delay: '1.5s', duration: '4.5s' },
    { left: '50%', top: '30%', delay: '2s', duration: '3s' },
    { left: '30%', top: '60%', delay: '2.5s', duration: '4s' },
    { left: '90%', top: '40%', delay: '0.2s', duration: '3.8s' },
    { left: '15%', top: '40%', delay: '0.8s', duration: '4.2s' },
    { left: '60%', top: '80%', delay: '1.2s', duration: '3.3s' },
    { left: '40%', top: '10%', delay: '1.8s', duration: '4.7s' },
    { left: '80%', top: '85%', delay: '0.3s', duration: '3.6s' },
    { left: '25%', top: '90%', delay: '0.7s', duration: '4.1s' },
    { left: '70%', top: '25%', delay: '1.3s', duration: '3.9s' },
    { left: '5%', top: '50%', delay: '1.9s', duration: '4.3s' },
    { left: '95%', top: '60%', delay: '0.4s', duration: '3.7s' },
    { left: '45%', top: '75%', delay: '0.9s', duration: '4.4s' },
    { left: '55%', top: '15%', delay: '1.4s', duration: '3.4s' },
    { left: '35%', top: '85%', delay: '2.1s', duration: '4.6s' },
    { left: '65%', top: '45%', delay: '0.6s', duration: '3.2s' },
    { left: '20%', top: '25%', delay: '1.6s', duration: '4.8s' }
  ];

  // Generate floating particles with predefined positions
  const generateParticles = (count: number) => {
    return Array.from({ length: Math.min(count, particlePositions.length) }, (_, i) => {
      const position = particlePositions[i];
      return (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
          style={{
            left: position.left,
            top: position.top,
            animationDelay: position.delay,
            animationDuration: position.duration
          }}
        />
      );
    });
  };

  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Video-Style Carousel Container */}
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden shadow-2xl">
          {/* Dynamic Background Video Effect */}
          <div 
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: carouselSlides[currentSlide].videoBg,
              backgroundSize: '400% 400%',
              backgroundPosition: '0% 50%',
              animation: 'gradientShift 8s ease infinite'
            }}
          >
            {/* Animated Particles */}
            {generateParticles(carouselSlides[currentSlide].particles)}
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-lg animate-bounce-slow"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-white/20 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-10 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
      </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
          {/* Slides */}
          <div className="relative h-full">
            {carouselSlides.map((slide, index) => (
              <div
                key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                      ? 'opacity-100 translate-x-0 scale-100'
                    : index < currentSlide
                      ? 'opacity-0 -translate-x-full scale-95'
                      : 'opacity-0 translate-x-full scale-95'
                }`}
              >
                <div className="h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="text-center max-w-4xl px-2">
                      {/* Animated Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-white/20 backdrop-blur-md text-white mb-3 sm:mb-4 md:mb-6 shadow-2xl transform hover:scale-110 transition-all duration-500 animate-float-slow`}>
                        <div className="relative">
                      {slide.icon}
                          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    
                      {/* Title with 3D Effect */}
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl animate-slide-up leading-tight">
                      {slide.title}
                    </h1>
                    
                      {/* Subtitle with Glow Effect */}
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mb-3 sm:mb-4 md:mb-6 animate-slide-up-delayed">
                      {slide.subtitle}
                    </h2>
                    
                      {/* Description with Fade In */}
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {/* Enhanced Navigation Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 z-20"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
            </button>

            {/* Enhanced Dots Navigation */}
            <div className="absolute bottom-2 sm:bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125 shadow-lg'
                      : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 backdrop-blur-sm">
              <div
                className="h-full bg-white transition-all duration-300 ease-linear rounded-r-full shadow-lg"
              style={{
                width: `${((currentSlide + 1) / carouselSlides.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
};

export default BestFreeQrSection; 