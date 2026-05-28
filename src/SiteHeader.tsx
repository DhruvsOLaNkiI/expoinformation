import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";

type SiteHeaderProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function SiteHeader({ variant = "dark", className = "" }: SiteHeaderProps) {
  const isDark = variant === "dark";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm md:text-base font-semibold transition-colors whitespace-nowrap ${
      isActive
        ? "text-[#f26522]"
        : isDark
          ? "text-gray-300 hover:text-[#f26522]"
          : "text-gray-600 hover:text-[#f26522]"
    }`;

  return (
    <header
      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 md:px-12 max-w-[1400px] mx-auto w-full ${className}`}
    >
      <Link
        to="/"
        className="text-2xl md:text-4xl font-extrabold tracking-tight flex items-center justify-self-start"
      >
        <span className={isDark ? "text-white font-black" : "text-[#0a1121] font-black"}>Digital</span><span className="text-[#f26522] font-black">Broker</span>
      </Link>

      <nav className="flex items-center justify-center gap-6 md:gap-8 justify-self-center">
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

      <Link
        to="/"
        className="text-2xl md:text-4xl font-black tracking-tight flex items-center justify-self-end"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="text-[#f26522]">DB</span>
        <span className={isDark ? "text-white ml-1" : "text-[#0a1121] ml-1"}>Expo</span>
      </Link>
    </header>
  );
}
