"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Bell, User, Settings, LogOut, Search, QrCode, DollarSign, Users, Package } from 'lucide-react';

interface Notification {
  id: string;
  type: 'payment' | 'user' | 'plan';
  title: string;
  message: string;
  timestamp: string;
  status?: string;
  data: any;
}

interface AdminHeaderProps {
  admin: any;
  onLogout: () => void;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  onLargeScreenMenuToggle?: () => void;
}

export default function AdminHeader({ admin, onLogout, onMenuToggle, sidebarOpen, onLargeScreenMenuToggle }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const router = useRouter();

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const response = await fetch('/api/admin/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Load notifications on mount and set up polling
  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showNotifications && !target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (showUserMenu && !target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showUserMenu]);

  const handleNotificationToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    router.push('/admin/settings');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'plan':
        return <Package className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-2 sm:px-3 lg:px-4 h-16">
          {/* Left side - Menu button and title */}
          <div className="flex items-center">
            {/* Menu button for mobile */}
            <button
              type="button"
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={onMenuToggle}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Right side - Menu button for large screens, Logo and title */}
            <div className="flex items-center">
              {/* Menu button for large screens - positioned on the right */}
              <button
                type="button"
                className="hidden lg:flex h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={onLargeScreenMenuToggle}
              >
                <Menu className="h-6 w-6" />
              </button>
              <QrCode className="h-6 w-6 text-[#063970] mr-2" />
              <h1 className="text-xl font-bold text-gray-900">StylusQR Admin Panel</h1>
            </div>
          </div>

          {/* notifications and user menu */}
          <div className="flex items-center space-x-4">
            

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={handleNotificationToggle}
                className="notification-button relative p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="notification-dropdown absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500">{unreadCount} new notifications</p>
                  </div>
                  
                  {loadingNotifications ? (
                    <div className="px-4 py-8 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#063970] mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No new notifications</p>
                    </div>
                  ) : (
                    <div className="py-1">
                      {notifications.slice(0, 10).map((notification) => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {notifications.length > 10 && (
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-xs text-[#063970] hover:text-[#052c5c]">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="user-menu-button flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <div className="w-8 h-8 bg-[#063970] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{admin?.fullName || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{admin?.role || 'Administrator'}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="user-menu-dropdown absolute right-0 mt-[0.4rem] w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{admin?.fullName || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{admin?.email || 'admin@stylusqr.com'}</p>
                  </div>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                  
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

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
    </>
  );
} 