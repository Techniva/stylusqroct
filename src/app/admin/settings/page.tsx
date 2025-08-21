"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Users, Key, Plus, Edit, Trash2, Eye, EyeOff, User } from 'lucide-react';

interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  username: string;
  role: 'super_admin' | 'admin' | 'moderator';
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
  updatedAt: string;
}

interface CreateAdminForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'super_admin' | 'admin' | 'moderator';
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const AdminSettingsPage: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Create Admin Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<CreateAdminForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Change Password Form State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Load admin users and current admin
  useEffect(() => {
    loadAdminUsers();
    loadCurrentAdmin();
  }, []);

  const loadCurrentAdmin = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
       // console.log('Received admin data:', data);
        setCurrentAdmin(data.admin);
      }
    } catch (error) {
      console.error('Error loading current admin:', error);
    }
  };

  const loadAdminUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/admin-users');
      if (response.ok) {
        const data = await response.json();
        setAdminUsers(data.users || []);
      } else {
        setError('Failed to load admin users');
      }
    } catch (error) {
      setError('Network error while loading admin users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (createForm.password !== createForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (createForm.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('/api/admin/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: createForm.fullName,
          email: createForm.email,
          password: createForm.password,
          role: createForm.role
        })
      });

      if (response.ok) {
        setMessage('Admin user created successfully');
        setCreateForm({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'admin'
        });
        setShowCreateForm(false);
        loadAdminUsers(); // Reload the list
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create admin user');
      }
    } catch (error) {
      setError('Network error while creating admin user');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (changePasswordForm.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: changePasswordForm.currentPassword,
          newPassword: changePasswordForm.newPassword
        })
      });

      if (response.ok) {
        setMessage('Password changed successfully');
        setChangePasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        setShowChangePassword(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to change password');
      }
    } catch (error) {
      setError('Network error while changing password');
    }
  };

  const handleDeleteAdmin = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this admin user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/admin-users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('Admin user deleted successfully');
        loadAdminUsers(); // Reload the list
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete admin user');
      }
    } catch (error) {
      setError('Network error while deleting admin user');
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { color: 'bg-red-100 text-red-800', label: 'Super Admin' },
      admin: { color: 'bg-blue-100 text-blue-800', label: 'Admin' },
      moderator: { color: 'bg-green-100 text-green-800', label: 'Moderator' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.admin;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (  
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center mb-2">         
          <Settings className="w-6 h-6 text-[#063970]" />
          <h1 className="text-lg font-bold text-gray-900">Admin Settings</h1>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Admin Users Section - Only for Super Admin */}
        {currentAdmin?.role === 'super_admin' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#063970]" />
                <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex text-sm items-center gap-2 bg-[#063970] text-white px-4 py-2 rounded-full hover:bg-[#052c5c] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Admin
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading admin users...</div>
            ) : adminUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No admin users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Username</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{user.fullName}</td>
                        <td className="py-3 px-4 font-mono text-sm">{user.username}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteAdmin(user.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Current Admin Details - For non-super admins */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-[#063970]" />
              <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
            </div>

            {currentAdmin ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{currentAdmin.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg font-mono">{currentAdmin.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{currentAdmin.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <div className="mt-1">{getRoleBadge(currentAdmin.role)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentAdmin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {currentAdmin.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {new Date(currentAdmin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {currentAdmin.lastLogin && currentAdmin.lastLogin !== 'null' ? 
                        new Date(currentAdmin.lastLogin).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {currentAdmin.updatedAt && currentAdmin.updatedAt !== 'null' ? 
                        new Date(currentAdmin.updatedAt).toLocaleString() : 
                        new Date(currentAdmin.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063970] mx-auto"></div>
            )}
          </div>
        )}

        {/* Change Password Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-[#063970]" />
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>
          <button
            onClick={() => setShowChangePassword(true)}
            className="text-sm flex items-center gap-2 bg-[#063970] text-white px-4 py-2 rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <Edit className="w-4 h-4" />
            Change Password
          </button>
        </div>

        {/* Create Admin Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Create Admin User</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateAdmin} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.fullName}
                    onChange={(e) => setCreateForm({...createForm, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({...createForm, role: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                  >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={createForm.password}
                      onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={createForm.confirmPassword}
                      onChange={(e) => setCreateForm({...createForm, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c]"
                  >
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={changePasswordForm.currentPassword}
                      onChange={(e) => setChangePasswordForm({...changePasswordForm, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={changePasswordForm.newPassword}
                      onChange={(e) => setChangePasswordForm({...changePasswordForm, newPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      required
                      value={changePasswordForm.confirmNewPassword}
                      onChange={(e) => setChangePasswordForm({...changePasswordForm, confirmNewPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowChangePassword(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c]"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default AdminSettingsPage; 