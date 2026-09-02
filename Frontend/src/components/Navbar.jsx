import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const LINKS = [
    { to: "/search", label: "Search" },
    { to: "/movies", label: "Movies" },
    { to: "/series", label: "Series" },
    { to: "/recommendation", label: "Recommendations" },
];

function Navbar() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-2 z-50 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6">
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-lg font-extrabold tracking-tight text-transparent hover:opacity-80 transition-opacity"
                >
                    CineScope
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2">
                    {LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                                isActive(link.to)
                                    ? "bg-white/10 text-white ring-1 ring-white/20"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                    {LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                isActive(link.to)
                                    ? "bg-white/10 text-white ring-1 ring-white/20"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
