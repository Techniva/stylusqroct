"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  QrCode, 
  CreditCard, 
  TrendingUp, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Eye,
  UserCheck,
  UserX,
  RefreshCw,
  BarChart3,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalQRCodes: number;
  totalSubscriptions: number;
  subscriptionBreakdown: Array<{ name: string; count: number }>;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  qrCodesUsed: number;
  isActive: boolean;
  subscription?: { name: string };
  qrCodes: Array<{ id: number; activeLink: string; createdAt: string }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/users')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      } else {
        const errorData = await statsRes.json();
        console.error('Stats API error:', errorData);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      } else {
        const errorData = await usersRes.json();
        console.error('Users API error:', errorData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: number, action: string, data?: any) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action, data })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Action failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handleQuickAction = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
      </div>
    );
  }

  return (
    <div className="py-2 px-4">
      {/* Page Header */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>           
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center space-x-2 px-2 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total Users</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <QrCode className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total QR Codes</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalQRCodes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total Subscriptions</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalSubscriptions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Active Users</p>
                <p className="text-xl font-bold text-gray-900">{users.filter(u => u.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 pt-2 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleQuickAction('/admin/users')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="w-5 h-5 text-[#063970] mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">View and edit user accounts</p>
            </div>
          </button>
          
          <button
            onClick={() => handleQuickAction('/admin/qrcodes')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <QrCode className="w-5 h-5 text-[#063970] mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View QR Codes</p>
              <p className="text-sm text-gray-500">Browse all generated QR codes</p>
            </div>
          </button>
          
          <button
            onClick={() => handleQuickAction('/admin/payments')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-5 h-5 text-[#063970] mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Payment Approvals</p>
              <p className="text-sm text-gray-500">Review pending payments</p>
            </div>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
                />
              </div>
              <select
                value={selectedSubscription}
                onChange={(e) => setSelectedSubscription(e.target.value)}
                className="px-4 text-sm py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
              >
                <option value="">All Plans</option>
                <option value="Free">Free</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QR Codes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 10).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.subscription?.name || 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.qrCodesUsed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUserAction(user.id, 'update_subscription', { planName: 'Pro', isActive: true })}
                        className="text-[#063970] hover:text-[#052c5c] transition-colors"
                        title="Upgrade to Pro"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.isActive ? (
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend_user')}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Suspend User"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(user.id, 'activate_user')}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Activate User"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleUserAction(user.id, 'reset_qr_count')}
                        className="text-orange-600 hover:text-orange-800 transition-colors"
                        title="Reset QR Count"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length > 10 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={() => handleQuickAction('/admin/users')}
              className="text-[#063970] hover:text-[#052c5c] font-medium"
            >
              View all users →
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 