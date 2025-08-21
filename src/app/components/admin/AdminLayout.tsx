"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Users, 
  QrCode, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  CreditCard,
  Home,
  Shield,
  FileText
} from 'lucide-react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentContent, setCurrentContent] = useState<string>('dashboard');
  const [isClosing, setIsClosing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't check auth if we're on the login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }
    checkAdminAuth();
  }, [pathname]);

  useEffect(() => {
    // Update current content based on pathname
    const path = pathname?.split('/').pop() || 'dashboard';
    setCurrentContent(path);
  }, [pathname]);

  const handleSidebarClose = () => {
    setIsClosing(true);
    setSidebarOpen(false);
    // Reset closing state after animation completes
    setTimeout(() => {
      setIsClosing(false);
    }, 300);
  };

  const checkAdminAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/auth/check', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else if (response.status === 401) {
        // Unauthorized - redirect to login
        setAdmin(null);
        router.push('/admin/login');
      } else {
        // Other errors - redirect to login
        console.error('Auth check failed:', response.status);
        setAdmin(null);
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAdmin(null);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Show loading state
      setLogoutLoading(true);
      setShowLogoutConfirm(false);
      
      const response = await fetch('/api/admin/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Clear admin state
        setAdmin(null);
        // Redirect to login page
        router.push('/admin/login');
      } else {
        console.error('Logout failed:', response.status);
        // Still redirect to login even if logout API fails
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Redirect to login even if there's an error
      router.push('/admin/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleNavigation = (href: string) => {
    // Use client-side navigation
    router.push(href);
    setCurrentContent(href.split('/').pop() || 'dashboard');
    
    // Close mobile sidebar if open
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3, description: 'Overview and analytics' },
    { name: 'Users', href: '/admin/users', icon: Users, description: 'Manage user accounts' },
    { name: 'QR Codes', href: '/admin/qrcodes', icon: QrCode, description: 'View all QR codes' },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard, description: 'Payment approvals' },
    { name: 'Plans', href: '/admin/plans', icon: FileText, description: 'Manage pricing plans' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, description: 'System configuration' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
      </div>
    );
  }

  // If we're on the login page, just render children without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        sidebarOpen || isClosing ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        <div 
          className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ${
            sidebarOpen ? 'bg-opacity-75' : 'bg-opacity-0'
          }`} 
          onClick={handleSidebarClose} 
        />
        <div className={`fixed left-0 top-0 h-full w-64 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Main sidebar content with flex layout */}
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex-shrink-0 pt-5 pb-4">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center">
                  <QrCode className="h-8 w-8 text-[#063970]" />
                  <h1 className="ml-2 text-xl font-bold text-gray-900">Admin Panel</h1>
                </div>
                <button
                  type="button"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 transform"
                  onClick={handleSidebarClose}
                >
                  <X className="h-6 w-6 transition-transform duration-200" />
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-2">
              <nav className="space-y-0.5">
                {navigation.map((item) => {
                  const isActive = currentContent === item.href.split('/').pop();
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#063970] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* User profile section at bottom */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#063970] rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">System Administrator</p>
                  <p className="text-xs text-gray-500">super_admin</p>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#063970]"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200 shadow-lg">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between flex-shrink-0 px-4">
              <div className="flex items-center">
                <QrCode className="h-8 w-8 text-[#063970]" />
                {!sidebarCollapsed && <h1 className="ml-2 text-xl font-bold text-gray-900">StylusQR</h1>}
              </div>
              
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = currentContent === item.href.split('/').pop();
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full text-left group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#063970] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {!sidebarCollapsed && (
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        {/* Header */}
        <AdminHeader 
          admin={admin}
          onLogout={handleLogout}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onLargeScreenMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main content */}
        <main className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto">
          {children}
          </div>
        </main>
        
        {/* Footer */}
        <AdminFooter />
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <LogOut className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to logout from the admin panel?
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {logoutLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 