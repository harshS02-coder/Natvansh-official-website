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
  { href: "/gallery", label: "GALLERY" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-3 sm:border-b-4 border-black bg-[url('/images/nav_footer_bg.png')] bg-cover bg-center h-[60px] sm:h-[10vh] md:h-[12vh] flex items-center ${isScrolled
          ? "shadow-[0_5px_0_0_#FFF]"
          : ""
          }`}
      >
        <div className="absolute inset-0 bg-black/60 halftone-overlay opacity-80 pointer-events-none"></div>
        <div className="relative w-full h-full max-w-[100vw] px-0 flex items-center justify-between z-10">

          {/* Pop-out Logo */}
          <Link href="/" className="relative flex items-center shrink-0 w-[80px] sm:w-[120px] md:w-[200px] h-full z-50 ml-0 pl-1 sm:pl-3">
            <img
              src="/images/logo.png"
              alt="Natvansh Logo"
              className="absolute top-1/2 -translate-y-[49%] left-0 h-[70px] sm:h-[100px] md:h-[240px] w-auto object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] sm:drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,0.4)]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 font-anton text-lg uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:rotate-2 ${isActive
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
          <div className="flex items-center pr-2 sm:pr-4">
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
              className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-[320px] z-[70] bg-black border-l-4 border-white overflow-hidden"
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
                          className={`block px-6 py-4 border-2 font-anton text-xl tracking-wide uppercase transition-all ${isActive
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

