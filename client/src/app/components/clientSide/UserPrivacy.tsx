"use client";

import { useState } from "react";

interface User {
  userID: string;
  email: string;
  name: string;
}

interface UserPrivacyProps {
  user: User | null;
}

export default function UserPrivacy({ user }: UserPrivacyProps) {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "friends",
    searchHistory: true,
    dataSharing: false,
  });

  const handleChange = (key: string, value: any) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save privacy settings to the server or local storage
    console.log("Privacy settings saved:", privacy);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Profile Visibility</label>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => handleChange("profileVisibility", e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
          >
            <option value="friends">Friends</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Search history</span>
          <button
            onClick={() =>
              handleChange("searchHistory", !privacy.searchHistory)
            }
            className={`w-12 h-6 rounded-full transition-colors ${
              privacy.searchHistory ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                privacy.searchHistory ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Datasharing</span>
          <button
            onClick={() => handleChange("dataSharing", !privacy.dataSharing)}
            className={`w-12 h-6 rounded-full transition-colors ${
              privacy.dataSharing ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                privacy.dataSharing ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
}
