import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, BarChart2, QrCode, Layers, Settings, MessageCircle, LogOut, Grid, Menu as MenuIcon, X as CloseIcon, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import DashboardStats from "@/app/components/layout/DashboardStats";
import DashboardMainContent from "@/app/components/layout/DashboardMainContent";
import QRCodePage from "@/app/components/layout/qrcode";
import MyQRCodes from "@/app/components/layout/tabs/MyQRCodes";
import Analytics from "@/app/components/layout/Analytics";
import MyPlan from "@/app/components/layout/MyPlan";
import Integrations from "@/app/components/layout/Integrations";
import Account from "@/app/components/layout/Account";
import Feedback from "@/app/components/layout/Feedback";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

const menu = [
  { label: "Overview", icon: <Grid className="w-5 h-5" /> },
  { label: "QR Codes", icon: <QrCode className="w-5 h-5" /> },
  { label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
  { label: "My Plan", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Integrations", icon: <Layers className="w-5 h-5" /> },
  { label: "Account", icon: <User className="w-5 h-5" /> },
  { label: "Feedback", icon: <MessageCircle className="w-5 h-5" /> },
  { label: "Logout", icon: <LogOut className="w-5 h-5" /> },
];

const SIDEBAR_COLLAPSED_WIDTH = "w-16";
const SIDEBAR_EXPANDED_WIDTH = "w-56";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true); // default, will be set on mount
  const [activeTab, setActiveTab] = useState("Overview");
  const [qrSettings, setQrSettings] = useState({ url: '' });
  const [user, setUser] = useState<UserData | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [stats, setStats] = useState([
    { label: "Projects", value: 1 },
    { label: "QR Codes", value: 0 },
    { label: "QR Code Scans", value: 0 },
    { label: "Users", value: 1 },
  ]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Load user data from API on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
          // Redirect to home if not authenticated
          router.replace('/');
        }
      } catch {
        setUser(null);
        // Redirect to home if not authenticated
        router.replace('/');
      }
    };
    fetchUser();
  }, [router]);

  // Fetch user plan when user changes
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/subscription/user-data');
        if (res.ok) {
          const data = await res.json();
          setUserPlan(data.planName);
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
      }
    };
    fetchUserPlan();
  }, [user]);

  // Fetch QR code statistics when user changes
  useEffect(() => {
    const fetchQRStats = async () => {
      if (!user) return;
      try {
        // 1. Fetch all QR codes for the user
        const res = await fetch(`/api/qr?userId=${user.id}`);
        if (res.ok) {
          const qrCodes = await res.json();
          const qrIds = qrCodes.map((qr: any) => qr.id);
          // 2. Fetch scan counts for these QR codes
          let totalScans = 0;
          let scanCounts = {};
          if (qrIds.length > 0) {
            const scanRes = await fetch(`/api/qr/scan-counts?userId=${user.id}`);
            if (scanRes.ok) {
              scanCounts = await scanRes.json();
              totalScans = Object.values(scanCounts).reduce((sum: number, count: any) => sum + (count || 0), 0);
              // Debug log
              console.log('Dashboard scanCounts:', scanCounts, 'totalScans:', totalScans);
            }
          }
          setStats(prevStats => prevStats.map(stat => {
            if (stat.label === "QR Codes") {
              return { ...stat, value: qrCodes.length };
            } else if (stat.label === "QR Code Scans") {
              return { ...stat, value: totalScans };
            }
            return stat;
          }));
        }
      } catch (error) {
        console.error('Error fetching QR stats:', error);
      }
    };
    fetchQRStats();
  }, [user]);

  // Callback to refresh stats when QR code is created
  const refreshQRStats = () => {
    if (user) {
      const fetchQRStats = async () => {
        try {
          const res = await fetch(`/api/qr?userId=${user.id}`);
          if (res.ok) {
            const qrCodes = await res.json();
            const qrIds = qrCodes.map((qr: any) => qr.id);
            let totalScans = 0;
            if (qrIds.length > 0) {
              const scanRes = await fetch(`/api/qr/scan-counts?userId=${user.id}`);
              if (scanRes.ok) {
                const scanCounts = await scanRes.json();
                totalScans = Object.values(scanCounts).reduce((sum: number, count: any) => sum + (count || 0), 0);
              }
            }
            setStats(prevStats => prevStats.map(stat => {
              if (stat.label === "QR Codes") {
                return { ...stat, value: qrCodes.length };
              } else if (stat.label === "QR Code Scans") {
                return { ...stat, value: totalScans };
              }
              return stat;
            }));
          }
        } catch (error) {
          console.error('Error refreshing QR stats:', error);
        }
      };
      fetchQRStats();
    }
  };

  // Collapse sidebar by default on small/mid screens, expand on large
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) { // <lg
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = async (label: string) => {
    if (label === "Logout") {
      setShowLogoutModal(true);
    } else {
      setActiveTab(label);
    }
  };

  const confirmLogout = async () => {
    // Immediately close modal and redirect
    setShowLogoutModal(false);
    setUser(null);
    
    // Dispatch auth state change event immediately
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    
    // Call logout API in background
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Redirect to home page
    router.replace("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "QR Codes":
        return <MyQRCodes url={qrSettings.url || ""} onUrlChange={url => setQrSettings({ ...qrSettings, url })} user={user} />;
      case "Create QR":
        return <QRCodePage user={user} refreshQRStats={refreshQRStats} />;
      case "Analytics":
        return <Analytics 
                totalScans={stats.find(stat => stat.label === 'QR Code Scans')?.value || 0}
                qrCodesCreated={stats.find(stat => stat.label === 'QR Codes')?.value || 0}
              />;
      case "My Plan":
        return <MyPlan />;
      case "Integrations":
        return <Integrations />;
      case "Account":
        return <Account />;
      case "Feedback":
        return <Feedback />;
      case "Overview":
      default:
        return <DashboardMainContent />;
    }
  };

  // Show loading state or redirect if no user
  if (!user) {
    return (
      <div className="h-screen bg-[#f6f6fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063970] mx-auto mb-4"></div>
          <p className="text-gray-600">Logging out...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f6f6fa] flex flex-row overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-[#063970] text-white flex flex-col py-4 px-2 rounded-none transition-all duration-300 ease-in-out z-40 flex-shrink-0 
        ${sidebarOpen ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH}`}
      >
        {/* Sidebar Top: Logo/Text + Toggle */}
        <div className={`mb-0 flex items-center gap-2 w-full mt-0 justify-between flex-shrink-0`}>
          {/*<img src="/logo192.png" alt="Logo" className="w-7 h-7" />*/}
          <a href="/" className="flex items-center gap-2 text-white"> 
           <QrCode className="w-5 h-5 text-white" />
            <span className={`font-bold text-lg tracking-tight transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'} ${!sidebarOpen ? 'hidden' : ''}`}>StylusQR</span>
          </a>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#052c5c]/20 transition-colors ml-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {sidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
        </div>
        <nav className={`flex-1 flex flex-col gap-4 w-full md:justify-start pt-2 ${sidebarOpen ? 'mt-4' : 'mt-4'} overflow-y-auto`}>
          {menu.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <div 
                key={item.label} 
                className={`relative w-full flex rounded-lg transition-colors group ${isActive ? 'bg-[#052c5c]' : 'hover:bg-[#052c5c]/20'}`}
              >
                <button
                  onClick={() => handleMenuClick(item.label)}
                  className={`flex items-center gap-3 px-3 py-2 font-medium text-left w-full md:w-auto ${sidebarOpen ? '' : 'justify-center'}`}
                  type="button"
                  onMouseEnter={e => {
                    if (!sidebarOpen) {
                      const tooltip = e.currentTarget.nextSibling as HTMLDivElement;
                      if (tooltip) tooltip.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!sidebarOpen) {
                      const tooltip = e.currentTarget.nextSibling as HTMLDivElement;
                      if (tooltip) tooltip.style.opacity = '0';
                    }
                  }}
                >
                  {item.icon}
                  <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 ml-2' : 'opacity-0 w-0 overflow-hidden ml-0'} ${!sidebarOpen ? 'hidden' : ''}`}>{item.label}</span>
                </button>
                {/* Tooltip/placeholder on hover when collapsed */}
                {!sidebarOpen && (
                  <div
                    style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s' }}
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
      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <div className="flex-shrink-0 p-4 md:p-6">
          <DashboardStats 
            stats={stats} 
            onCreateQr={() => setActiveTab("Create QR")} 
            user={user}
            userPlan={userPlan}
          />
        </div>
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
          {renderContent()}
        </div>
      </main>
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
    </div>
  );
};

export default Dashboard; 