"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, CreditCard, Settings, User, LogOut, LayoutDashboard, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DigitalBusinessCardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState<{ id: string; fullName: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
          router.push("/"); // redirect to home if not logged in
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063970] mb-3"></div>     
      </div>
    );
  }

  if (!user) {
    return null; // This shouldn't happen, because of the router.push(), but just in case.
  }
  
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  return (
    <div className="bg-gray-100 flex relative min-h-screen overflow-y-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] 
          text-white shadow-lg transition-all duration-300 flex flex-col z-50
          ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-[3px]"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 p-2 space-y-2">
          <Link
            href="/digital-business-cards/create/my-cards"
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
          >
            <CreditCard size={20} />
            {isSidebarOpen && <span>My Cards</span>}
          </Link>
          <Link
            href="/digital-business-cards/settings"
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
          >
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
          <Link
            href="/digital-business-cards/profile"
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
          >
            <User size={20} />
            {isSidebarOpen && <span>Profile</span>}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="w-full bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
          <Link href="/digital-business-cards">
            <h1 className="text-lg font-bold text-[#021B35] cursor-pointer hover:text-[#032544] transition-colors">
              Digital Business Card
            </h1>
          </Link>

          <div className="relative flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.fullName || 'User'}</span>
            <div className="relative">
              <User
                size={20}
                className="text-gray-700 cursor-pointer"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center text-sm gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full flex items-center text-sm gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={16} /> QR Dashboard
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="w-full flex items-center text-sm gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Home size={16} /> Home Page
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 flex flex-col lg:flex-row p-4 overflow-y-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full bg-white border shadow-inner p-2 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} StylusQR | All rights reserved.
        </footer>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 14a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
        
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
        
            <div className="flex gap-4 w-full">
              {/* Cancel Button */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loggingOut}
              >
                Cancel
              </button>
        
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-full bg-[#063970] text-white font-semibold hover:bg-[#052c5c] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Logging out...
                  </>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div> 
      )}
    </div>
  );
}
