import React, { useState, useEffect } from "react";
import { User, Settings, Bell, Shield, Key, Mail, Phone, MapPin, Edit3, Save, X } from "lucide-react";
import ChangePasswordModal from '../auth/ChangePasswordModal';
import TwoFactorAuthModal from '../auth/TwoFactorAuthModal';

const notificationSettings = [
  { name: "Email Notifications", key: "emailNotificationsEnabled", description: "Receive updates via email" },
  { name: "SMS Notifications", key: "smsNotificationsEnabled", description: "Receive updates via SMS" },
  { name: "Push Notifications", key: "pushNotificationsEnabled", description: "Receive browser notifications" }
] as const;

type NotificationKey = typeof notificationSettings[number]['key'];

const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isTwoFactorAuthOpen, setTwoFactorAuthOpen] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    usr_phone: "",
    company: "",
    location: "",
    comp_position: "",
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: false,
    pushNotificationsEnabled: true,
  });
  const [otherPosition, setOtherPosition] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setProfile({
            fullName: data.fullName || "",
            email: data.email || "",
            usr_phone: data.usr_phone || "",
            company: data.company || "",
            location: data.location || "",
            comp_position: data.comp_position || "",
            emailNotificationsEnabled: data.emailNotificationsEnabled,
            smsNotificationsEnabled: data.smsNotificationsEnabled,
            pushNotificationsEnabled: data.pushNotificationsEnabled,
          });
          if (data.comp_position && !['Developer', 'Designer', 'Manager'].includes(data.comp_position)) {
            setOtherPosition(data.comp_position);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const profileToSave = {
      ...profile,
      comp_position: profile.comp_position === 'Other' ? otherPosition : profile.comp_position
    };

    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileToSave)
      });
      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const handleNotificationChange = async (notificationType: NotificationKey, isEnabled: boolean) => {
    const updatedProfile = { ...profile, [notificationType]: isEnabled };
    setProfile(updatedProfile);

    try {
      await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [notificationType]: isEnabled }),
      });
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      // Optionally revert the state change on error
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-[#063970]" />
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                />
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Full Name</p>
                <p className="text-gray-900 text-sm">{profile.fullName}</p>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                />
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Email</p>
                <p className="text-gray-900 text-sm">{profile.email}</p>
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                />
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Company</p>
                <p className="text-gray-900 text-sm">{profile.company}</p>
              </div>
            )}
          </div>

          {/* Position */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div>
                  <select
                    value={profile.comp_position}
                    onChange={(e) => setProfile({ ...profile, comp_position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                  >
                    <option value="">Select a position</option>
                    <option value="Designer">Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Director">Director</option>
                    <option value="Manager">Manager</option>
                    <option value="Owner">Owner</option>
                    <option value="Principal">Principal</option>
                    <option value="Other">Other</option>
                  </select>
                  {profile.comp_position === 'Other' && (
                    <input
                      type="text"
                      value={otherPosition}
                      onChange={(e) => setOtherPosition(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                      placeholder="Please specify"
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Position</p>
                <p className="text-gray-900 text-sm">{profile.comp_position}</p>
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                />
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Location</p>
                <p className="text-gray-900 text-sm">{profile.location}</p>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            {isEditing ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.usr_phone}
                  onChange={(e) => setProfile({ ...profile, usr_phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                />
              </>
            ) : (
              <div className="flex items-baseline">
                <p className="w-32 text-sm font-bold text-gray-700">Phone</p>
                <p className="text-gray-900 text-sm">{profile.usr_phone}</p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <button
              onClick={() => setChangePasswordOpen(true)}
              className="px-4 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
            >
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorAuthOpen(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
        
        <div className="space-y-4">
          {notificationSettings.map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{notification.name}</h3>
                <p className="text-sm text-gray-600">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile[notification.key]}
                  onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#063970]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
      <TwoFactorAuthModal
        isOpen={isTwoFactorAuthOpen}
        onClose={() => setTwoFactorAuthOpen(false)}
      />
    </div>
  );
};

export default Account; 