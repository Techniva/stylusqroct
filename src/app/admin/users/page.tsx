"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Edit,
  UserCheck,
  UserX,
  RefreshCw,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, searchTerm, selectedSubscription]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedSubscription && { subscription: selectedSubscription })
      });

      const response = await fetch(`/api/admin/users?${params}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
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
        fetchUsers(); // Refresh data
        alert('Action completed successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Action failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="py-2 px-4">
      {/* Page Header */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Users Management</h1>           
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center space-x-2 px-2 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
            />
          </div>
          
          {/* Plan Filter */}
          <div>
            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
            >
              <option value="">All Plans</option>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          
          {/* Total Count */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            Total: {pagination.total} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200">
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-2 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063970] mx-auto"></div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
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
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.page
                            ? 'z-10 bg-[#063970] border-[#063970] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name:</label>
                  <p className="text-sm text-gray-900">{selectedUser.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email:</label>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Plan:</label>
                  <p className="text-sm text-gray-900">{selectedUser.subscription?.name || 'Free'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">QR Codes Used:</label>
                  <p className="text-sm text-gray-900">{selectedUser.qrCodesUsed}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <p className="text-sm text-gray-900">{selectedUser.isActive ? 'Active' : 'Suspended'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Joined:</label>
                  <p className="text-sm text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">QR Codes:</label>
                  <div className="max-h-32 overflow-y-auto">
                    {selectedUser.qrCodes.map((qr) => (
                      <div key={qr.id} className="text-xs text-gray-600 py-1">
                        {qr.activeLink}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 