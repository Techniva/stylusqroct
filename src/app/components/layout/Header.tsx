"use client";

import React, { useEffect } from "react";
import { QrCode, Menu as MenuIcon, X, User, LogOut } from "lucide-react";

import AuthModal from "@/app/components/auth/AuthModal";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [authModal, setAuthModal] = React.useState<{
    isOpen: boolean;
    mode: "login" | "register";
  }>({
    isOpen: false,
    mode: "login",
  });
  const [user, setUser] = React.useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = React.useState<null | 'solutions' | 'features'>(null);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  // Add refs for each dropdown and button
  const solutionsDropdownRef = React.useRef<HTMLDivElement>(null);
  const featuresDropdownRef = React.useRef<HTMLDivElement>(null);
  const solutionsButtonRef = React.useRef<HTMLButtonElement>(null);
  const featuresButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load user data from API on component mount and auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
    // Listen for custom auth event
    const handleAuthChange = () => fetchUser();
    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, []);

  // Separate useEffect for auth modal events
  useEffect(() => {
    const handleAuthModalEvent = (event: CustomEvent) => {
      const { mode } = event.detail;
      // Only open auth modal if user is not already logged in
      if (!user) {
        openAuthModal(mode);
      }
    };
    
    window.addEventListener('openAuthModal', handleAuthModalEvent as EventListener);
    
    return () => {
      window.removeEventListener('openAuthModal', handleAuthModalEvent as EventListener);
    };
  }, [user]);

  const openAuthModal = (mode: "login" | "register") => {
    // Only open modal if user is not already logged in
    if (!user) {
      // Add a small delay to ensure smooth animation
      setTimeout(() => {
      setAuthModal({ isOpen: true, mode });
      }, 10);
    }
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" });
  };

  const handleLogout = async () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    // Immediately clear user state and close modals
    setUser(null);
    setShowUserMenu(false);
    setShowLogoutModal(false);
    
    // Dispatch auth state change event immediately
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    
    // Call logout API in background
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Redirect to home page
    window.location.href = '/';
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // 1. Make dropdowns full-width: use left-0 right-0 and max-w-7xl mx-auto for container alignment
  // 2. Use a large, card-style, multi-column layout with section headers, icons, and 'More' links
  // 3. Add outside click handler to close dropdowns
  // 4. Keep smooth fade/slide-down animation and responsive design

  // --- In the component body, add a ref and effect for outside click ---
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (openDropdown === 'solutions') {
        if (
          solutionsDropdownRef.current &&
          !solutionsDropdownRef.current.contains(target) &&
          solutionsButtonRef.current &&
          !solutionsButtonRef.current.contains(target)
        ) {
          setOpenDropdown(null);
        }
      } else if (openDropdown === 'features') {
        if (
          featuresDropdownRef.current &&
          !featuresDropdownRef.current.contains(target) &&
          featuresButtonRef.current &&
          !featuresButtonRef.current.contains(target)
        ) {
          setOpenDropdown(null);
        }
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);
  // --- End outside click handler ---

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <QrCode className="w-8 h-8 text-[#063970]" />
            <span className="text-xl font-bold text-gray-900">StylusQR</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                ref={solutionsButtonRef}
                className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'solutions'}
                tabIndex={0}
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
              >
                Solutions
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                ref={solutionsDropdownRef}
                className={`fixed left-0 right-0 top-[72px] z-50 transition-all duration-300 ${openDropdown === 'solutions' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                style={{maxWidth: '100vw'}}
                tabIndex={-1}
              >
                <div className="mx-auto max-w-7xl bg-white border border-gray-200 rounded-b-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                  {/* By Industry */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">BY INDUSTRY</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="/industry/restaurants" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 21v-7a4 4 0 014-4h8a4 4 0 014 4v7"/><circle cx="12" cy="7" r="4"/></svg></span>Restaurants</a></li>
                      <li><a href="/industry/marketing" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><rect x="7" y="9" width="7" height="7" rx="1"/></svg></span>Marketing</a></li>
                      <li><a href="/industry/retail" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7l6 6-6 6"/><rect x="9" y="5" width="13" height="14" rx="2"/></svg></span>Retail</a></li>
                      <li><a href="/industry/gyms" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2"/><circle cx="12" cy="7" r="4"/></svg></span>Gyms</a></li>
                      <li><a href="/industry/education" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6"/><circle cx="12" cy="7" r="4"/></svg></span>Education</a></li>
                      <li><a href="/industry/tourism-and-city" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6"/><circle cx="11" cy="11" r="8"/></svg></span>Tourism & City</a></li>
                      {/* <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]">Real Estate</a></li> */}
                      {/* <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]">Digital Business Cards</a></li> */}
                    </ul>
                    <a href="#" className="flex items-center gap-1 text-[#5b3df2] hover:underline mt-3 text-sm font-medium">More Industries <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                  {/* By Use Case */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">BY USE CASE</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="/use-case/trackable-qr-codes" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg></span>Trackable QR Codes</a></li>
                      <li><a href="/use-case/picture" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Picture</a></li>
                      <li><a href="/use-case/wifi" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12h20"/><path d="M12 2v20"/></svg></span>WiFi</a></li>
                      <li><a href="/use-case/facebook" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a2 2 0 00-2 2v16a2 2 0 002 2h3a2 2 0 002-2V4a2 2 0 00-2-2z"/><path d="M6 2H3a2 2 0 00-2 2v16a2 2 0 002 2h3a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg></span>Facebook</a></li>
                      <li><a href="/use-case/instagram" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/></svg></span>Instagram</a></li>
                      <li><a href="/use-case/google-form" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/></svg></span>Google Form</a></li>
                      {/* <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]">Venmo</a></li> */}
                      {/* <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]">Google Review</a></li> */}
                    </ul>
                    <a href="#" className="flex items-center gap-1 text-[#5b3df2] hover:underline mt-3 text-sm font-medium">More Use Cases <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                  {/* By Business Size */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">BY BUSINESS SIZE</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Enterprise</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg></span>Small-Medium</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            {/* End Solutions Dropdown */}
            {/* Features Dropdown */}
            <div className="relative">
              <button
                ref={featuresButtonRef}
                className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'features'}
                tabIndex={0}
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'features' ? null : 'features')}
              >
              Features
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'features' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                ref={featuresDropdownRef}
                className={`fixed left-0 right-0 top-[72px] z-50 transition-all duration-300 ${openDropdown === 'features' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                style={{maxWidth: '100vw'}}
                tabIndex={-1}
              >
                <div className="mx-auto max-w-7xl bg-white border border-gray-200 rounded-b-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
                  {/* Column 1: Core Features */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">CORE FEATURES</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg></span>Static QR</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M3 3l18 18"/></svg></span>Dynamic QR</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 8h8v8H8z"/></svg></span>Variety of download formats</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6"/><circle cx="12" cy="7" r="4"/></svg></span>Limited contributing users</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><rect x="7" y="9" width="7" height="7" rx="1"/></svg></span>Complete analytics</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Editing and management of QRs</a></li>
                    </ul>
                  </div>
                  {/* Column 2: Integrations */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">INTEGRATIONS</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Bulk creation and download</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Google pixel integration</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Custom Domain</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Templates</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Event tracking</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Password access protection</a></li>
                    </ul>
                  </div>
                  {/* Column 3: Security & Analytics */}
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 border-b border-gray-100 pb-1">SECURITY & ANALYTICS</div>
                    <ul className="space-y-2 mt-2">
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Complete analytics</a></li>
                      <li><a href="#" className="flex items-center gap-2 hover:text-[#063970]"><span className="inline-block w-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Editing and management of QRs</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* End Features Dropdown */}
            <a href="/pricing" className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="/digital-business-cards" className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors">
              Digital Business Cards
            </a>
            <a href="/contact" className="text-gray-700 hover:text-[#063970] px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 focus:outline-none"
                >
                  <User className="w-4 h-4 text-[#063970]" />
                  <span className="text-sm font-medium text-gray-700">{user.fullName}</span>
                  <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                      <li>
                        <a
                          href="/dashboard"
                          className="w-full px-4 py-2 flex items-center gap-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                          style={{ minWidth: '12rem' }}
                        >
                          <User className="w-4 h-4" />
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={e => { e.preventDefault(); handleLogout(); }}
                          className="w-full px-4 py-2 flex items-center gap-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                          style={{ minWidth: '12rem' }}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => openAuthModal("login")}
                  className="text-[#063970] hover:text-[#052c5c] px-6 py-2 rounded-full border border-[#063970] hover:bg-[#063970]/5 transition-colors text-sm font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuthModal("register")}
                  className="bg-[#063970] text-white px-4 py-2 rounded-full border border-[#063970] hover:bg-[#052c5c] transition-colors text-sm font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-all duration-300 ease-out transform hover:scale-110 text-gray-700 hover:text-[#063970]"
            >
              <div className="relative">
                <MenuIcon className={`w-6 h-6 transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`} />
              </div>
            </button>
        </div>
      </div>

        {/* Mobile Navigation - Enhanced Smooth Slide-in Menu */}
        {/* Backdrop */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ease-out ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div 
          className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out flex flex-col ${
            isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
              <QrCode className="w-8 h-8 text-[#063970]" />
              <span className="text-xl font-bold text-gray-900">StylusQR</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pb-4">
              <nav className="p-6 space-y-4">
                {/* Main Navigation */}
                <div className="space-y-4">
                <a 
                  href="/" 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-all duration-300 ease-out transform ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                    style={{ transitionDelay: '100ms' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                    <span className="font-medium">Home</span>
                  </a>

                  {/* Solutions Section */}
                  <details className={`group transition-all duration-300 ease-out transform ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`} style={{ transitionDelay: '150ms' }}>
                    <summary className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                        <span className="font-medium">Solutions</span>
                    </div>
                      <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                    <div className="mt-2 ml-8 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Industry</div>
                        <div className="space-y-2">
                          <a href="/industry/restaurants" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Restaurants</a>
                          <a href="/industry/marketing" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Marketing</a>
                          <a href="/industry/retail" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Retail</a>
                          <a href="/industry/gyms" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Gyms</a>
                          <a href="/industry/education" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Education</a>
                          <a href="/industry/tourism-and-city" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Tourism & City</a>
                      </div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Use Case</div>
                        <div className="space-y-2">
                          <a href="/use-case/trackable-qr-codes" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Trackable QR Codes</a>
                          <a href="/use-case/picture" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Picture</a>
                          <a href="/use-case/wifi" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>WiFi</a>
                          <a href="/use-case/facebook" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Facebook</a>
                          <a href="/use-case/instagram" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Instagram</a>
                          <a href="/use-case/google-form" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors" onClick={() => setIsMenuOpen(false)}>Google Form</a>
                      </div>
                    </div>
                  </div>
                </details>

                  {/* Features Section */}
                  <details className={`group transition-all duration-300 ease-out transform ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`} style={{ transitionDelay: '200ms' }}>
                    <summary className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                        <span className="font-medium">Features</span>
                    </div>
                      <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                    <div className="mt-2 ml-8 space-y-3">
                      <div className="space-y-2">
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors">Static QR</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors">Dynamic QR</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors">Analytics</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors">Templates</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-[#063970] transition-colors">Custom Domain</a>
                    </div>
                  </div>
                </details>

                <a 
                  href="/pricing" 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-all duration-300 ease-out transform ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                    style={{ transitionDelay: '250ms' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7" />
                  </svg>
                    <span className="font-medium">Pricing</span>
                </a>

                <a 
                  href="/contact" 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-all duration-300 ease-out transform ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                    style={{ transitionDelay: '300ms' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                    <span className="font-medium">Contact</span>
                </a>
                </div>
              </nav>
            </div>

            {/* User Section */}
            <div className={`p-2 border-t border-gray-200 transition-all duration-300 ease-out transform flex-shrink-0 ${
              isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
            }`} style={{ transitionDelay: '350ms' }}>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#063970] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#063970] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      openAuthModal("login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 rounded-lg border border-[#063970] text-[#063970] hover:bg-[#063970]/5 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      openAuthModal("register");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-[#063970] text-white hover:bg-[#052c5c] transition-colors font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
      />
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col items-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">Log out?</div>
            <div className="text-gray-600 mb-6 text-center">Are you sure you want to log out?</div>
            <div className="flex gap-3 w-full">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-[#063970] text-white font-semibold hover:bg-[#052c5c] transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 