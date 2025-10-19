import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  userID: string;
  email: string;
  name: string;
  preferences: any;
  settings: any;
  privacy: any;
}

export function useUserProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AWS_APIGATEWAY_URL_dev}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setProfile(result.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return { profile, loading, refetch: fetchProfile };
}
