"use client";

interface User {
  userID: string;
  email: string;
  name: string;
}

interface UserDetailsProps {
  user: User | null;
}

export default function UserDetails({ user }: UserDetailsProps) {
  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">User Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2">Full Name</label>
          <div className="bg-gray-700 p-3 rounded border">{user.name}</div>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <div className="bg-gray-700 p-3 rounded border">{user.email}</div>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">User ID</label>
          <div className="bg-gray-700 p-3 rounded border text-sm font-mono">
            {user.userID}
          </div>
        </div>
      </div>
    </div>
  );
}
