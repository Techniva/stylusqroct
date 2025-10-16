"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  PlusSquare,
  CreditCard,
  Settings,
  User,
  LogOut,
  LayoutDashboard,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Inter, Poppins, Roboto, Playfair_Display, Montserrat } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
export const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });


export default function VisitingCardLayout({ children }: { children: React.ReactNode }) {
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
          router.push("/");
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
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063970]"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const navItems = [
    { label: "Create Card", href: "/visiting-card/vc/create", icon: PlusSquare },
    { label: "My Cards", href: "/visiting-card/vc/my-cards", icon: CreditCard },
    { label: "Settings", href: "/visiting-card/vc/settings", icon: Settings },
    { label: "Profile", href: "/visiting-card/vc/profile", icon: User },
    { label: "QR Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Home", href: "/", icon: Home },
  ];

  return (
      <div className="bg-gray-100 flex min-h-screen relative overflow-y-hidden">
      {/* Sidebar */}
      <div
        className={`bg-[#2a0062]
          text-white shadow-lg flex flex-col z-50 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 border-b border-[#45008b]">
          {isSidebarOpen && <span className="font-bold text-lg">Visiting Card</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-[3px]"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#201133] group transition-colors"
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#201133] text-left group transition-colors"
            title={!isSidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="w-full bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">

          <Link href="/visiting-card">
            <h1 className="text-lg font-bold text-[#201133] cursor-pointer hover:text-[#032544] transition-colors">
              Visiting Card Manager
            </h1>
          </Link>

          <div className="relative flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.fullName || "User"}</span>
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

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-hidden">
          {children}
        </main>

        <footer className="w-full bg-white border p-2 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} StylusQR | All rights reserved.
        </footer>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 14a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
                disabled={loggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-full bg-[#063970] text-white font-semibold hover:bg-[#052c5c]"
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

  );
}
