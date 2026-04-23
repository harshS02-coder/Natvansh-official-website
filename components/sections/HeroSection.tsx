"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Megaphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Each letter gets its own personality
const LETTERS = [
  { char: "N", color: "#FFFFFF", rotate: -6, y: -4 },
  { char: "A", color: "#FFFFFF", rotate: 5, y: 6 },
  { char: "T", color: "#FFFFFF", rotate: -3, y: -2 },
  { char: "V", color: "#FFFFFF", rotate: 4, y: 5 },
  { char: "A", color: "#FFFFFF", rotate: -5, y: -6 },
  { char: "N", color: "#FFFFFF", rotate: 3, y: 3 },
  { char: "S", color: "#FFFFFF", rotate: -4, y: -3 },
  { char: "H", color: "#FFFFFF", rotate: 6, y: 4 },
];

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content/notice")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.content) {
          setNotice(data.content);
        }
      })
      .catch((err) => console.error("Failed to fetch notice", err));
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Notice slides in
      tl.from(".hero-notice", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.out",
      })
        // Badge pops
        .from(".hero-badge", {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
          duration: 0.4,
          ease: "back.out(2)",
        }, "-=0.2")
        // Letters slam in one by one
        .from(".hero-char", {
          opacity: 0,
          y: 80,
          rotationZ: gsap.utils.random(-15, 15),
          scale: 0.5,
          stagger: 0.06,
          duration: 0.5,
          ease: "back.out(1.7)",
        }, "-=0.2")
        // Subtitle tag slides up
        .from(".hero-subtitle-tag", {
          opacity: 0,
          x: -40,
          duration: 0.4,
          ease: "power3.out",
        }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950 bg-[url('/images/home_bg_mobile.webp')] sm:bg-[url('/images/home_bg_1.webp')] bg-cover bg-center"
    >
      {/* Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-[1]"></div>
      <div className="absolute inset-0 halftone-overlay pointer-events-none mix-blend-overlay opacity-40 z-[2]"></div>



      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center py-20 sm:py-28 md:py-32">

        {/* Notice Banner */}
        {notice && (
          <div className="hero-notice w-full max-w-[90%] sm:max-w-2xl mb-5 sm:mb-8 bg-[var(--neon-yellow)] border-3 border-black p-2 sm:p-2.5 shadow-[4px_4px_0_#000] sm:shadow-[5px_5px_0_#000] transform -rotate-1 flex items-center justify-center text-center gap-2">
            <Megaphone size={14} className="text-black shrink-0 animate-pulse sm:w-4 sm:h-4" />
            <span className="font-anton text-[10px] sm:text-sm md:text-base text-black uppercase tracking-widest">
              {notice}
            </span>
            <Megaphone size={16} className="text-black shrink-0 animate-pulse hidden sm:block" />
          </div>
        )}

        {/* Sanskrit Badge */}
        <div className="hero-badge flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-5 sm:py-2 border-2 sm:border-3 border-black bg-[var(--neon-cyan)] mb-5 sm:mb-8 shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-300 cursor-default">
          <Sparkles size={12} className="text-black sm:w-3.5 sm:h-3.5" />
          <span className="font-anton tracking-[0.15em] sm:tracking-[0.2em] text-black uppercase text-[10px] sm:text-sm">
            अस्ति कश्चित् विशेषः!
          </span>
          <Sparkles size={12} className="text-black sm:w-3.5 sm:h-3.5" />
        </div>

        {/* ===== NATVANSH TITLE ===== */}
        <h1
          ref={titleRef}
          className="flex flex-nowrap justify-center items-baseline mb-2 sm:mb-4 relative z-10 w-full"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="hero-char inline-block font-anton leading-none cursor-default select-none hover:scale-110 transition-transform duration-200"
              style={{
                fontSize: "clamp(2.5rem, 11vw, 180px)",
                color: letter.color,
                WebkitTextStroke: "min(3px, 0.5vw) #000",
                textShadow: `
                  min(6px, 1.5vw) min(6px, 1.5vw) 0px #000,
                  min(10px, 2vw) min(10px, 2vw) 0px rgba(0,0,0,0.3)
                `,
                transform: `rotate(${letter.rotate}deg) translateY(${letter.y}px)`,
                zIndex: 20 - i,
                marginLeft: i === 0 ? "0" : "-0.04em",
              }}
            >
              {letter.char}
            </span>
          ))}
        </h1>

        {/* Subtitle Tag */}
        <div
          className="hero-subtitle-tag bg-black px-4 py-1.5 sm:px-8 sm:py-2 border-2 sm:border-3 border-black mb-5 sm:mb-7 shadow-[3px_3px_0_var(--neon-pink)] sm:shadow-[4px_4px_0_var(--neon-pink)] rotate-[1.5deg] hover:rotate-0 transition-transform duration-300"
        >
          <span className="font-anton text-[var(--neon-yellow)] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-sm sm:text-xl md:text-2xl lg:text-3xl">
            Drama & Film Club
          </span>
        </div>

        {/* Tagline */}
        <div className="hero-tagline bg-black/80 backdrop-blur-sm border-2 border-white/20 p-3 sm:p-4 max-w-md w-full text-center mb-8 sm:mb-10 mx-auto transform -rotate-1 relative">
          {/* Corner accent */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-[var(--neon-pink)] border-2 border-black"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--neon-cyan)] border-2 border-black"></div>

          <p className="text-sm sm:text-base text-zinc-200 font-inter font-bold leading-relaxed">
            Where every emotion finds its <span className="text-[var(--neon-yellow)]">stage</span> and every story finds its <span className="text-[var(--neon-pink)]">screen</span>.
          </p>
          <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-zinc-600"></div>
            <span className="bg-[var(--neon-green)] text-black px-2.5 py-0.5 font-anton tracking-[0.25em] text-[10px] sm:text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000] rotate-1">
              NIT PATNA
            </span>
            <div className="h-px w-8 bg-zinc-600"></div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <a
            href="/events"
            className="hero-cta group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 font-anton text-sm sm:text-base md:text-xl text-black bg-[var(--neon-yellow)] border-3 border-black shadow-[6px_6px_0_#000] rotate-[-2deg] hover:rotate-0 hover:shadow-[2px_2px_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 text-center uppercase tracking-wider"
          >
            🎬 Explore The Magic
          </a>
          <a
            href="/team"
            className="hero-cta group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 font-anton text-sm sm:text-base md:text-xl text-white bg-transparent border-3 border-white shadow-[6px_6px_0_var(--neon-cyan)] rotate-[2deg] hover:rotate-0 hover:bg-[var(--neon-pink)] hover:text-black hover:border-black hover:shadow-[2px_2px_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 text-center uppercase tracking-wider"
          >
            🎭 Meet The Cast
          </a>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-[5] pointer-events-none"></div>
    </section>
  );
}
