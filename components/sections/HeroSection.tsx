"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Dramatic entrance
      tl.from(".hero-badge", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(".hero-char", {
          opacity: 0,
          y: 40,
          rotationZ: -5,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.5)",
        }, "-=0.3")
        .from(".hero-subtitle", {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .from(".hero-cta", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.3");

    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grunge-purple halftone-overlay"
    >
      {/* Main Content Wrapper */}
      <div className="hero-content-wrapper relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pt-24 pb-12">

        {/* Sanskrit Floating Badge */}
        <div className="hero-badge flex items-center gap-2 px-6 py-2 border-4 border-black bg-[var(--neon-green)] mb-10 shadow-[6px_6px_0px_#000] rotate-[-2deg]">
          <Sparkles size={16} className="text-black" />
          <span className="font-anton text-xl tracking-wider text-black uppercase">
            अस्ति कश्चित् विशेषः!
          </span>
          <Sparkles size={16} className="text-black" />
        </div>

        {/* Masterpiece Title */}
        <h1
          ref={titleRef}
          className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[160px] font-anton leading-none tracking-tight mb-2 text-[var(--neon-yellow)] text-center flex overflow-hidden text-stroke-black drop-shadow-[10px_10px_0px_#000]"
        >
          {Array.from("NATVANSH").map((char, i) => (
            <span key={i} className="hero-char inline-block">
              {char}
            </span>
          ))}
        </h1>

        <h1 className="text-[8vw] sm:text-[6vw] lg:text-[80px] font-anton text-[var(--neon-pink)] uppercase tracking-wider mb-6 text-stroke-black drop-shadow-[6px_6px_0px_#000] rotate-[1deg]">
          Drama & Film Club
        </h1>

        <p className="hero-subtitle text-lg sm:text-2xl text-white font-inter font-bold max-w-2xl text-center leading-relaxed mb-12 bg-black px-6 py-4 border-2 border-white shadow-[4px_4px_0_var(--neon-green)]">
          Where every emotion finds its stage and every story finds its screen.
          <br />
          <span className="text-[var(--neon-yellow)] text-xl block mt-2">NIT PATNA</span>
        </p>

        {/* Ultra-modern CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
          <a href="/events" className="hero-cta grunge-btn">
            EXPLORE THE MAGIC
          </a>
          <a href="/team" className="hero-cta grunge-btn" style={{ backgroundColor: 'var(--neon-pink)', color: 'white' }}>
            MEET THE CAST
          </a>
        </div>
      </div>
    </section>
  );
}

