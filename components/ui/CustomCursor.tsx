"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only run on devices with a fine pointer (like a mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          html, body, *, *::before, *::after, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        }
      ` }} />
      
      {!hidden && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        >
          {/* 
            This is an absolutely "next level" camera cursor!
            Positioned so the "focus" of the camera is exactly at the mouse pointer tip.
          */}
          <img
            src="/images/cursor.webp"
            className="w-[60px] sm:w-[50px] h-auto object-contain -translate-x-[5%] -translate-y-[5%] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
            alt=""
          />
        </motion.div>
      )}
    </>
  );
}
