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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--neon-yellow)] bg-[url('/images/bg_grunge_red.png')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-white/70 halftone-overlay pointer-events-none mix-blend-overlay"></div>

      {/* Main Content Wrapper */}
      <div className="hero-content-wrapper relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pt-[18vh] md:pt-[22vh] pb-8">

        {/* Sanskrit Floating Badge */}
        <div className="hero-badge flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 border-2 md:border-4 border-black bg-[var(--neon-pink)] mb-6 shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] rotate-[-3deg] hover:rotate-[3deg] transition-transform duration-300">
          <Sparkles size={16} className="text-black sm:w-5 sm:h-5" />
          <span className="font-anton tracking-widest text-black uppercase text-sm md:text-lg">
            अस्ति कश्चित् विशेषः!
          </span>
          <Sparkles size={16} className="text-black sm:w-5 sm:h-5" />
        </div>

        {/* Masterpiece Title */}
        <h1
          ref={titleRef}
          className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[160px] font-anton leading-[0.85] tracking-tight mb-2 md:mb-4 flex overflow-visible text-[var(--neon-cyan)] drop-shadow-[8px_8px_0_#000] md:drop-shadow-[12px_12px_0_#000] stroke-black text-stroke-black"
          style={{ WebkitTextStroke: "2px black", transform: "rotate(-2deg)" }}
        >
          {Array.from("NATVANSH").map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ transform: i % 2 === 0 ? 'translateY(-6px)' : 'translateY(6px)' }}>
              {char}
            </span>
          ))}
        </h1>

        <h1 className="text-[5vw] sm:text-[5vw] lg:text-[55px] font-anton text-[var(--neon-yellow)] uppercase tracking-wider mb-6 text-stroke-black drop-shadow-[4px_4px_0_#000] md:drop-shadow-[6px_6px_0_#000] rotate-[2deg] bg-black px-4 py-1 md:px-6 md:py-1.5 border-2 md:border-4 border-black">
          Drama & Film Club
        </h1>

        <div className="hero-subtitle bg-[var(--neon-green)] border-2 md:border-4 border-black p-4 md:p-5 shadow-[6px_6px_0_var(--neon-pink)] md:shadow-[8px_8px_0_var(--neon-pink)] transform -rotate-1 max-w-xl text-center mb-10">
          <p className="text-base sm:text-xl text-black font-inter font-black leading-relaxed">
            Where every emotion finds its stage and every story finds its screen.
          </p>
          <span className="text-black bg-white inline-block px-3 py-1 border-2 border-black font-anton tracking-widest text-sm md:text-base mt-3 uppercase shadow-[4px_4px_0_#000] rotate-2">
            NIT PATNA
          </span>
        </div>

        {/* Ultra-modern CTAs - Retro Style */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
          <a href="/events" className="hero-cta px-8 py-4 font-anton text-xl text-black bg-[var(--neon-yellow)] border-4 border-black hover:bg-white hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[8px_8px_0_#000] rotate-[-2deg] hover:rotate-0">
            EXPLORE THE MAGIC
          </a>
          <a href="/team" className="hero-cta px-8 py-4 font-anton text-xl text-white bg-black border-4 border-black hover:bg-[var(--neon-pink)] hover:text-black hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[8px_8px_0_var(--neon-cyan)] rotate-[2deg] hover:rotate-0">
            MEET THE CAST
          </a>
        </div>
      </div>
    </section>
  );
}

