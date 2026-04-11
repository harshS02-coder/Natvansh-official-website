"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "";
      },
    });

    // Initial state setup
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0, filter: "contrast(200%) grayscale(100%) blur(10px)" });
    gsap.set(textRef.current, { y: 20, opacity: 0 });
    gsap.set(loaderRef.current, { scaleX: 0 });

    // Animation Sequence
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: "contrast(100%) grayscale(0%) blur(0px)",
      duration: 1.5,
      ease: "power4.out",
    })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=1")
      .to(loaderRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=0.8")
      .to([logoRef.current, textRef.current, loaderRef.current], {
        y: -50,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.in",
        stagger: 0.1,
      })
      .to(splashRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      // Ensure scroll is restored on unmount (strict mode / user navigation)
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Textures */}
      <div className="absolute inset-0 bg-[url('/images/bg_grunge_purple.png')] bg-cover opacity-50 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 halftone-overlay pointer-events-none"></div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Pulsing glow behind logo */}
          <div className="absolute inset-0 bg-[var(--neon-pink)] blur-[50px] opacity-30 mix-blend-screen rounded-full animate-pulse"></div>
          <img
            ref={logoRef}
            src="/images/logo.png"
            alt="Natvansh"
            className="w-40 sm:w-100 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,100,200,0.5)] transform-origin-center relative z-10"
          />
        </div>

        <h1
          ref={textRef}
          className="mt-8 text-5xl sm:text-7xl font-anton uppercase text-white tracking-[0.2em] transform origin-bottom text-stroke-black drop-shadow-[4px_4px_0_var(--neon-green)]"
        >
          नटवंश
        </h1>

        <p className="text-zinc-500 font-inter tracking-widest text-xs uppercase mt-4 mb-8">
          The Stage Awaits
        </p>

        {/* Loading Bar */}
        <div className="w-48 sm:w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            ref={loaderRef}
            className="h-full bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-yellow)] to-[var(--neon-green)] origin-left"
          ></div>
        </div>
      </div>
    </div>
  );
}
