"use client";

import { useState } from "react";

interface User {
  userID: string;
  email: string;
  name: string;
}

interface UserPreferencesProps {
  user: User | null;
}

export default function UserPreferences({ user }: UserPreferencesProps) {
  const [preferences, setPreferences] = useState({
    favoriteGenre: "action",
    notifications: true,
    autoplay: false,
    language: "en",
  });

  const handleChange = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save preferences to the server or local storage
    console.log("Preferences saved:", preferences);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Preferences</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Favorite Genre</label>
          <select
            value={preferences.favoriteGenre}
            onChange={(e) => handleChange("favoriteGenre", e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
          >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Sci-Fi</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Email Notifications</span>
          <button
            onClick={() =>
              handleChange("notifications", !preferences.notifications)
            }
            className={`w-12 h-6 rounded-full transition-colors ${
              preferences.notifications ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Autoplay Videos</span>
          <button
            onClick={() => handleChange("autoplay", !preferences.autoplay)}
            className={`w-12 h-6 rounded-full transition-colors ${
              preferences.autoplay ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.autoplay ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
