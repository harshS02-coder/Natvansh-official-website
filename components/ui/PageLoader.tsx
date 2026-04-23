"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-[url('/images/bg_grunge_purple.webp')] bg-cover opacity-30 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-50"></div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulsing glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--neon-pink)] blur-[40px] opacity-30 mix-blend-screen rounded-full animate-pulse"></div>
          <Image
            src="/images/logo.webp"
            alt="Natvansh"
            width={160}
            height={160}
            priority
            className="w-28 sm:w-40 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,100,200,0.5)] relative z-10 animate-pulse"
          />
        </div>

        {/* Loading text */}
        <p className="mt-6 text-zinc-400 font-inter tracking-[0.3em] text-xs uppercase animate-pulse">
          Loading...
        </p>

        {/* Animated loading bar */}
        <div className="mt-4 w-48 sm:w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-yellow)] to-[var(--neon-green)] animate-loading-bar origin-left"></div>
        </div>
      </div>
    </div>
  );
}
