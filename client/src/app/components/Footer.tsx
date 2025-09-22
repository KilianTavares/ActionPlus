import Link from "next/link";
import GlowButton from "./GlowButton";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const faqLinks = [
    { name: "Is it free?", href: "/faq#free" },
    { name: "Device limits?", href: "/faq#devices" },
    { name: "Account required?", href: "/faq#account" },
    { name: "Video quality?", href: "/faq#quality" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <GlowButton text="Action+" />
            <p className="text-gray-400 mt-4">
              Your Ultimate Streaming Experience
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand">FAQ</h3>
            <ul className="space-y-2">
              {faqLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Action+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
