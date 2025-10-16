"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  BarChart2,
  QrCode,
  Layers,
  Settings,
  MessageCircle,
  LogOut,
  Grid,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import DashboardStats from "@/app/components/layout/DashboardStats";
import { UserProvider, useUser } from "./DashboardUserContext";
import LoadingScreen from "../components/ui/LoadingScreen";

interface DashboardProps {
  children: React.ReactNode;
}

const menu = [
  { label: "Overview", icon: <Grid className="w-5 h-5" />, path: "/dashboard" },
  { label: "My QR Codes", icon: <QrCode className="w-5 h-5" />, path: "/dashboard/myqrcodes" },
  { label: "Analytics", icon: <BarChart2 className="w-5 h-5" />, path: "/dashboard/analytics" },
  { label: "My Plan", icon: <CreditCard className="w-5 h-5" />, path: "/dashboard/myplan" },
  { label: "Integrations", icon: <Layers className="w-5 h-5" />, path: "/dashboard/integrations" },
  { label: "Account", icon: <User className="w-5 h-5" />, path: "/dashboard/account" },
  { label: "Feedback", icon: <MessageCircle className="w-5 h-5" />, path: "/dashboard/feedback" },
  { label: "Logout", icon: <LogOut className="w-5 h-5" />, path: "/logout" },
];

const SIDEBAR_COLLAPSED_WIDTH = "w-16";
const SIDEBAR_EXPANDED_WIDTH = "w-56";

const DashboardContent: React.FC<DashboardProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [stats, setStats] = useState([
    { label: "Projects", value: 1 },
    { label: "QR Codes", value: 0 },
    { label: "QR Code Scans", value: 0 },
    { label: "Users", value: 1 },
  ]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPage, setShowPage] = useState(false);

  // Fetch user plan
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      try {
        const res = await fetch("/api/subscription/user-data");
        if (res.ok) {
          const data = await res.json();
          setUserPlan(data.planName);
        }
      } catch (error) {
        console.error("Error fetching user plan:", error);
      }
    };
    fetchUserPlan();
  }, [user]);

  // Collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (item: typeof menu[number]) => {
    if (item.label === "Logout") {
      setShowLogoutModal(true);
    } else {
      setActiveTab(item.label);
      router.push(item.path);
    }
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    setLoggingOut(true);
    setShowPage(false); // reset for loader

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API error:", error);
    }
    router.replace("/");
  };

  const cancelLogout = () => setShowLogoutModal(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [user, loading, router]);

  if (!user && !loading && !loggingOut) return null;

  const handleCreateQr = () => router.push("/dashboard/qrcodes");

  // Show loader until progress reaches 100%
  if (loading || loggingOut) {
    return (
      <div className="h-screen bg-[#f6f6fa] flex flex-col items-center justify-center">
        {/* QR Code */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            {/* Placeholder QR code - replace with actual QR component if needed */}
            <img
              src="/qr-code.png"
              alt="StylusQR"
              className="h-32 w-32"
            />
          </div>
          <span className="mt-4 text-xl font-semibold text-[#063970]">
            StylusQR
          </span>
        </div>
  
        {/* Loading bar */}
        <div className="w-64 bg-gray-300 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-[#063970] animate-loading-bar"
            style={{ width: "50%" }} // optional: can animate dynamically
          ></div>
        </div>
  
        {/* Loading text */}
        <p className="mt-4 text-gray-600">
          {loading ? "please wait..." : "Logging out..."}
        </p>
  
        {/* Tailwind animation for loading bar */}
        <style jsx>{`
          @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 50%; }
            100% { width: 100%; }
          }
          .animate-loading-bar {
            animation: loading-bar 2s infinite ease-in-out;
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="h-screen bg-[#f6f6fa] flex flex-row overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-[#063970] text-white flex flex-col py-4 px-2 transition-all duration-300 z-40 flex-shrink-0 
        ${sidebarOpen ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH}`}
      >
        {/* Sidebar Top */}
        <div className="mb-0 flex items-center gap-2 w-full justify-between flex-shrink-0">
          <a href="/" className="flex items-center gap-2 text-white"> 
            <QrCode className="w-5 h-5 text-white" />
            <span className={`font-bold text-lg tracking-tight transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'} ${!sidebarOpen ? 'hidden' : ''}`}>
              StylusQR
            </span>
          </a>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#052c5c]/20 transition-colors ml-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {sidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
        </div>

        <nav className={`flex-1 flex flex-col gap-4 pt-2 overflow-y-auto`}>
          {menu.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <div key={item.label} className={`relative w-full flex rounded-lg transition-colors group ${isActive ? 'bg-[#052c5c]' : 'hover:bg-[#052c5c]/20'}`}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center gap-3 px-3 py-2 font-medium text-left w-full md:w-auto ${sidebarOpen ? '' : 'justify-center'}`}
                >
                  {item.icon}
                  <span className={`${sidebarOpen ? 'opacity-100 ml-2' : 'opacity-0 w-0 overflow-hidden ml-0'} ${!sidebarOpen ? 'hidden' : ''}`}>
                    {item.label}
                  </span>
                </button>
                {!sidebarOpen && (
                  <div style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s' }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black/90 text-white rounded px-2 py-1 text-xs shadow z-50 whitespace-nowrap"
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 p-4 md:p-6">
          <DashboardStats stats={stats} onCreateQr={handleCreateQr} user={user} userPlan={userPlan} />
        </div>
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">{children}</div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col items-center text-center">
            <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 14a9 9 0 110-18 9 9 0 010 18z" />
            </svg>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Log Out?</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>

            <div className="flex gap-4 w-full">
              <button onClick={cancelLogout} className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium">
                Cancel
              </button>
              <button onClick={confirmLogout} className="flex-1 px-4 py-3 rounded-full bg-[#063970] text-white font-semibold hover:bg-[#052c5c] transition">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => (
  <UserProvider>
    <DashboardContent>{children}</DashboardContent>
  </UserProvider>
);

export default DashboardLayout;
