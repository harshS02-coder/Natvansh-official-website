"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [
  "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&h=600&fit=crop",
];

export default function ClubIntroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate intro text
      gsap.from(".intro-text", {
        scrollTrigger: {
          trigger: ".intro-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -40,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate carousel entrance
      gsap.from(".intro-carousel-wrapper", {
        scrollTrigger: {
          trigger: ".intro-carousel-wrapper",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 40,
        rotationZ: 5,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="section-padding relative overflow-hidden bg-grunge-purple halftone-overlay"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          accent="WARNING: RAW TALENT"
          title="WHO WE ARE"
          subtitle="WE'RE NOT JUST A CLUB — WE'RE A MOVEMENT."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Text Content */}
          <div className="intro-text space-y-8 bg-black p-8 border-4 border-black shadow-[10px_10px_0px_var(--neon-pink)] rotate-1">
            <p className="text-base md:text-xl font-inter font-bold leading-relaxed text-white">
              Founded at the National Institute of Technology, Patna, <strong className="text-[var(--neon-green)] text-xl md:text-2xl font-anton uppercase">Natvansh</strong> is
              the heartbeat of the underground dramatic arts. From the raw, chaotic energy of
              <span className="font-anton text-xl md:text-2xl uppercase ml-2" style={{ color: "var(--neon-yellow)" }}> nukkad natak </span>
              to the cinematic grit of short films, we tear up the script.
            </p>
            <p className="text-base md:text-xl font-inter font-bold leading-relaxed text-white">
              Our culture is fueled by passion, rebellion, and an unyielding belief that
              <span className="font-anton uppercase block text-2xl md:text-3xl mt-4 bg-[var(--neon-pink)] text-black px-2 py-1 inline-block -rotate-2 border-2 border-black"> every story must be told loud </span>
            </p>
            <div className="inline-block px-4 py-3 md:px-6 md:py-4 border-4 border-black bg-[var(--neon-yellow)] transform -rotate-2 shadow-[4px_4px_0_#000]">
              <p className="font-anton text-xl md:text-2xl text-black uppercase">
                "THERE IS SOMETHING SPECIAL!"
              </p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="intro-carousel-wrapper p-4 bg-[var(--neon-yellow)] border-4 border-black shadow-[10px_10px_0_#000] transform -rotate-2">
            <div className="border-4 border-black bg-zinc-900 pb-12 relative group">
                <Swiper
                effect="cards"
                grabCursor={true}
                modules={[EffectCards, Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{ nextEl: ".intro-next", prevEl: ".intro-prev" }}
                className="w-full h-auto aspect-[4/3]"
                >
                {carouselImages.map((src, i) => (
                    <SwiperSlide key={i} className="bg-black border-r-4 border-b-4 border-black">
                    <img
                        src={src}
                        alt={`Club activity ${i + 1}`}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    {/* Decorative tape on photos */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-6 bg-white border-2 border-black rotate-[-3deg] opacity-80 mix-blend-screen" style={{ boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)"}}></div>
                    </SwiperSlide>
                ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 z-20 pointer-events-none">
                  <button className="intro-prev pointer-events-auto bg-[var(--neon-pink)] text-black border-2 border-black font-anton px-4 py-1 tracking-wider shadow-[2px_2px_0_var(--neon-green)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_var(--neon-green)] transition-all">
                    ← PREV
                  </button>
                  <button className="intro-next pointer-events-auto bg-[var(--neon-pink)] text-black border-2 border-black font-anton px-4 py-1 tracking-wider shadow-[2px_2px_0_var(--neon-green)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_var(--neon-green)] transition-all">
                    NEXT →
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

