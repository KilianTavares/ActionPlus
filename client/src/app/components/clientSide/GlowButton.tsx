"use client";

import Link from "next/link";

interface GlowButtonProps {
  text: string;
  path?: string;
}

export default function GlowButton({ text, path = "/" }: GlowButtonProps) {
  return (
    <Link
      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded transition-all duration-300 bg-gradient-to-r from-[#0DCAF0]/90 to-[#0DCAF0]/40 bg-clip-text text-transparent"
      style={{
        boxShadow: "0 0 20px rgba(13, 202, 240, 0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 40px rgba(13, 202, 240, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(13, 202, 240, 0.2)";
      }}
      href={path}
    >
      {text}
    </Link>
  );
}
