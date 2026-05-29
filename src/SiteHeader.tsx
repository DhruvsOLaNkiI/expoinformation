import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

type SiteHeaderProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function SiteHeader({ variant = "dark", className = "" }: SiteHeaderProps) {
  const isDark = variant === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm md:text-base font-semibold transition-colors whitespace-nowrap ${
      isActive
        ? "text-[#f26522]"
        : isDark
          ? "text-gray-300 hover:text-[#f26522]"
          : "text-gray-600 hover:text-[#f26522]"
    }`;

  return (
    <>
      <header
        className={`flex justify-between items-center md:grid md:grid-cols-[1fr_auto_1fr] gap-4 px-6 md:px-12 max-w-[1400px] mx-auto w-full ${className}`}
      >
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight flex items-center justify-self-start whitespace-nowrap"
        >
          <span className={isDark ? "text-white font-black" : "text-[#0a1121] font-black"}>Digital</span>
          <span className="text-[#f26522] font-black">Broker</span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-6 md:gap-8 justify-self-center">
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/exhibitions" className={linkClass}>
            Upcoming Exhibitions
          </NavLink>
          <NavLink to="/gallery" className={linkClass}>
            Gallery
          </NavLink>
          <NavLink to="/privacy-policy" className={linkClass}>
            Privacy Policy
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight flex items-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="text-[#f26522]">DB</span>
            <span className={isDark ? "text-white ml-1" : "text-[#0a1121] ml-1"}>Expo</span>
          </Link>

          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`md:hidden p-1.5 rounded-lg transition-colors focus:outline-none ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-[#0a1121] hover:bg-black/5"
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Slider) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sliding Menu Panel */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] max-w-full bg-[#0a1121] text-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header inside drawer */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-black tracking-tight flex items-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="text-[#f26522]">DB</span>
              <span className="text-white ml-1">Expo</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links inside drawer */}
          <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold tracking-wide transition-colors ${
                  isActive ? "text-[#f26522]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/exhibitions"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold tracking-wide transition-colors ${
                  isActive ? "text-[#f26522]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Upcoming Exhibitions
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold tracking-wide transition-colors ${
                  isActive ? "text-[#f26522]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/privacy-policy"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold tracking-wide transition-colors ${
                  isActive ? "text-[#f26522]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Privacy Policy
            </NavLink>
          </nav>

          {/* Footer details inside drawer */}
          <div className="p-6 border-t border-white/10 bg-[#0d172e] text-xs text-gray-400 flex flex-col gap-3">
            <div className="text-sm font-extrabold tracking-tight flex items-center mb-1">
              <span className="text-white font-black">Digital</span>
              <span className="text-[#f26522] font-black">Broker</span>
            </div>
            <a href="tel:+918851686642" className="flex items-center gap-2 hover:text-[#f26522] transition-colors">
              <Phone className="w-4 h-4 text-[#f26522]" /> +91 88516 86642
            </a>
            <a href="mailto:marketing@digitalbroker.in" className="flex items-center gap-2 hover:text-[#f26522] transition-colors">
              <Mail className="w-4 h-4 text-[#f26522]" /> marketing@digitalbroker.in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
