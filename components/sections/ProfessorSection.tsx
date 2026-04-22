"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ProfessorContent {
  title: string;
  content: string;
}

interface ProfessorData {
  _id: string;
  name: string;
  designation: string;
  department: string;
  image: string;
  message?: string;
}

export default function ProfessorSection() {
  const container = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<ProfessorContent | null>(null);
  const [professors, setProfessors] = useState<ProfessorData[]>([]);

  useEffect(() => {
    fetch("/api/content/professor")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setContent(data);
      })
      .catch((err) => console.error(err));

    fetch("/api/professors?current=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProfessors(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".prof-card", {
        opacity: 0,
        y: 60,
        rotationZ: -1,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(".prof-quote-icon", {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.5,
          ease: "back.out(2)",
        }, "-=0.3")
        .from(".prof-message", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.2")
        .from(".prof-name", {
          opacity: 0,
          x: -20,
          stagger: 0.1,
          duration: 0.4,
          ease: "power3.out",
        }, "-=0.2")
        .from(".prof-button", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-padding relative bg-grunge-dark halftone-overlay flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto relative z-10 px-4">
        <SectionHeading
          accent="GUIDING LIGHT"
          title="MESSAGE FROM THE FACULTY"
          subtitle="Words of wisdom from our Professor In-Charge"
        />

        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-8 mt-8 sm:mt-12 relative z-20">
          {professors.length > 0 ? (
            professors.map((prof, i) => (
              <div key={prof._id} className={`prof-card flex-1 bg-black border-2 md:border-4 border-black p-6 sm:p-8 md:p-10 relative overflow-visible shadow-[4px_4px_0px_var(--neon-green)] sm:shadow-[5px_5px_0px_var(--neon-green)] md:shadow-[10px_10px_0px_var(--neon-green)] ${i % 2 === 0 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]"}`}>
                {/* Decorative grunge tape */}
                <div className={`absolute top-[-10px] sm:top-[-12px] left-[50%] transform -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 ${i % 2 === 0 ? "bg-[var(--neon-pink)] rotate-[-3deg]" : "bg-[var(--neon-cyan)] rotate-[3deg]"} border-2 border-black`} />

                {/* Quote Icon */}
                <div className="prof-quote-icon mb-4 md:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center ${i % 2 === 0 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-pink)]"} shadow-[3px_3px_0_#000] rotate-[-2deg]`}>
                    <Quote size={20} className="text-black sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Message */}
                <blockquote className="prof-message space-y-4">
                  {(prof.message || content?.content || "Drama and cinema are mirrors of society. At Natvansh, we nurture not just performers, but thinkers, leaders, and storytellers who carry the spark of creativity into every walk of life.")
                    .split("\n")
                    .filter((p) => p.trim() !== "")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className={`leading-relaxed font-bold font-inter ${
                          index === 0
                            ? "text-base sm:text-lg md:text-xl text-white"
                            : "text-sm sm:text-base text-[var(--neon-yellow)]"
                        }`}
                      >
                        &ldquo;{paragraph.trim()}&rdquo;
                      </p>
                    ))}
                </blockquote>

                {/* Professor Info & Picture */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6" style={{ borderTop: "4px dashed #333" }}>
                  <div className={`relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 transform ${i % 2 === 0 ? '-rotate-3' : 'rotate-2'} hover:rotate-0 transition-transform`}>
                    <div className="absolute inset-0 bg-[var(--neon-pink)] border-2 sm:border-3 border-black shadow-[4px_4px_0_#000] rotate-6"></div>
                    <Image
                      src={prof.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"}
                      alt={prof.name}
                      width={112}
                      height={112}
                      className="relative z-10 w-full h-full object-cover border-2 sm:border-3 border-black shadow-[3px_3px_0_#000] transition-all duration-500"
                    />
                    <div className={`absolute top-[-6px] ${i % 2 === 0 ? 'right-[-6px]' : 'left-[-6px]'} w-8 h-3 ${i % 2 === 0 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-green)]"} border-2 border-black rotate-12 z-20`}></div>
                  </div>
                  
                  <div className="flex flex-col justify-center text-center sm:text-left h-full mt-1">
                    <p className="font-anton text-lg sm:text-xl tracking-wider text-white uppercase drop-shadow-[2px_2px_0_#000] leading-tight">
                      {prof.name}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[var(--neon-green)] uppercase font-inter mt-1">
                      {prof.designation}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase mt-1 leading-snug">
                      {prof.department}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="prof-card w-full flex-1 bg-black border-2 md:border-4 border-black p-6 sm:p-8 md:p-10 relative overflow-visible shadow-[4px_4px_0px_var(--neon-green)] sm:shadow-[5px_5px_0px_var(--neon-green)] md:shadow-[10px_10px_0px_var(--neon-green)] rotate-[0.5deg]">
              <div className="text-zinc-500 font-inter font-bold italic text-sm md:text-base text-center">Professor information not available.</div>
            </div>
          )}
        </div>
        
        {/* Previous PIS Button */}
        <div className="prof-button flex justify-center mt-12 sm:mt-16 w-full relative z-20">
          <Link href="/professors" className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 font-anton tracking-widest uppercase text-black bg-[var(--neon-pink)] border-2 md:border-4 border-black rotate-[-1deg] hover:rotate-[1deg] hover:bg-white transition-all duration-300 shadow-[6px_6px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-y-1 hover:translate-x-1">
            PREVIOUS PIS
            <span className="absolute -right-3 -top-3 w-6 h-6 bg-[var(--neon-yellow)] border-2 border-black rotate-[15deg]"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
