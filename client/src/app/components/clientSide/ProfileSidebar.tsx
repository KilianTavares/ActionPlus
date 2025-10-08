"use client";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  const menuItems = [
    { id: "details", label: "User Details", icon: "👤" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "settings", label: "Settings", icon: "🔧" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
  ];

  return (
    <div className="w-64 bg-gray-800 rounded-lg p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
