"use client";

import Link from "next/link";
import { useState } from "react";
import GlowButton from "./GlowButton";
import UserSidebar from "./UserSidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log("authenticated", isAuthenticated);
  return (
    <header className="flex items-center justify-around py-3  text-white">
      <div className="flex items-center gap-8">
        <GlowButton path="/" text="Action+" />
        <nav className="flex gap-4">
          <Link className="hover:text-blue-600 flex" href="/movies">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-film mr-2 group-hover:scale-110 transition-transform"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M7 3v18"></path>
              <path d="M3 7.5h4"></path>
              <path d="M3 12h18"></path>
              <path d="M3 16.5h4"></path>
              <path d="M17 3v18"></path>
              <path d="M17 7.5h4"></path>
              <path d="M17 16.5h4"></path>
            </svg>
            Movies
          </Link>
          <Link className="hover:text-blue-600 flex" href="/tv-shows">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tv mr-2 group-hover:scale-110 transition-transform"
            >
              <rect width="20" height="15" x="2" y="3" rx="2" ry="2"></rect>
              <polyline points="8,21 16,21"></polyline>
              <polyline points="12,17 12,21"></polyline>
            </svg>
            TV-Shows
          </Link>
          <Link className="hover:text-blue-600 flex" href="/contact-us">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-badge-info mr-2 group-hover:scale-110 transition-transform"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
              <line x1="12" x2="12" y1="16" y2="12"></line>
              <line x1="12" x2="12.01" y1="8" y2="8"></line>
            </svg>
            Contact
          </Link>
          <Link className="hover:text-blue-600 flex" href="/upload-media">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            Upload-media
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <>
            <input
              type="text"
              className="border border-[#0DCAF0] rounded-full text-black py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0DCAF0] focus:border-transparent w-64 transition-all duration-200"
              placeholder="Search movies, TV shows..."
              defaultValue=""
            />
            <button
              className="hover:text-gray-600 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>ionicons-v5-q</title>
                  <path
                    d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z"
                    style={{
                      fill: "none",
                      stroke: "#ffffff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 32,
                    }}
                  />
                </g>
              </svg>
            </button>
          </>
        )}
        {!isAuthenticated ? (
          <Link
            href={"/auth"}
            className="px-4 py-1 bg-[#0DCAF0]/80 text-white flex items-center gap-2 rounded hover:bg-[#0DCAF0]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-in"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" x2="3" y1="12" y2="12"></line>
            </svg>
            Sign In
          </Link>
        ) : (
          <button
            className="px-4 py-1 bg-[#0DCAF0]/80 text-white flex items-center gap-2 rounded hover:bg-[#0DCAF0]"
            onClick={logout}
          >
            Log out
          </button>
        )}
      </div>

      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
