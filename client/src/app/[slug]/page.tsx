"use client";

import { use, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileSidebar from "../components/clientSide/ProfileSidebar";
import UserDetails from "../components/clientSide/UserDetails";
import UserPreferences from "../components/clientSide/UserPreferences";
import UserSettings from "../components/clientSide/UserSettings";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("details");

  if (slug !== "profile") {
    return <p className="text-white">Page not found</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <UserDetails user={user} />;
      case "preferences":
        return <UserPreferences user={user} />;
      case "settings":
        return <UserSettings user={user} />;
      default:
        return <UserDetails user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="flex gap-8">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
