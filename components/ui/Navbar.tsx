"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/events", label: "EVENTS" },
  { href: "/team", label: "TEAM" },
  { href: "/developers", label: "DEVELOPERS" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-black ${
          isScrolled
            ? "bg-black py-4 shadow-[0_5px_0_0_#FFF]"
            : "bg-black py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="Natvansh Logo" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300 drop-shadow-[2px_2px_0px_#FF007F]" 
            />
            <h1 className="text-3xl md:text-4xl font-anton text-white tracking-widest uppercase transition-transform group-hover:-rotate-2 group-hover:text-[var(--neon-yellow)] drop-shadow-[2px_2px_0px_#000]">
              <span className="text-[var(--neon-pink)] group-hover:text-white transition-colors duration-300">NAT</span>VANSH
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 font-anton text-lg uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:rotate-2 ${
                    isActive
                      ? "bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#FFF]"
                      : "text-white bg-black border-2 border-transparent hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] hover:shadow-[4px_4px_0_var(--neon-green)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side / Mobile toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-white hover:text-[var(--neon-yellow)] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-[70] bg-black border-l-4 border-white overflow-hidden"
            >
              <div className="flex flex-col h-full p-8 relative">
                {/* Halftone BG inside menu */}
                <div className="absolute inset-0 halftone-overlay opacity-50 z-0"></div>
                
                <div className="flex justify-between items-center mb-10 relative z-10">
                  <span className="text-2xl font-anton text-[var(--neon-magenta)] uppercase text-white">NATVANSH</span>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-white hover:text-red-500"
                    aria-label="Close menu"
                  >
                    <X size={32} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 relative z-10">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-6 py-4 border-2 font-anton text-xl tracking-wide uppercase transition-all ${
                            isActive
                              ? "bg-[var(--neon-yellow)] border-white text-black"
                              : "bg-transparent border-transparent text-white hover:border-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

