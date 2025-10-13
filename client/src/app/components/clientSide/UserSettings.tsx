"use client";

import { useAuth } from "../../../contexts/AuthContext";

interface User {
  userID: string;
  email: string;
  name: string;
}

interface UserSettingsProps {
  user: User | null;
}

export default function UserSettings({ user }: UserSettingsProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Add delete account logic here
      alert("Account deletion functionality would be implemented here");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-left px-4 py-3 rounded transition-colors">
              Change Password
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-left px-4 py-3 rounded transition-colors">
              Update Email
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-left px-4 py-3 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold mb-4">Privacy</h3>
          <div className="space-y-3">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-left px-4 py-3 rounded transition-colors">
              Download My Data
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-left px-4 py-3 rounded transition-colors">
              Privacy Settings
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
          <button 
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 hover:bg-red-700 text-left px-4 py-3 rounded transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}