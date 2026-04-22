"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

interface ProfessorData {
  _id: string;
  name: string;
  designation: string;
  department: string;
  message: string;
  image: string;
  isCurrent: boolean;
}

const ProfCard = ({ prof }: { prof: ProfessorData }) => {
  return (
    <div className="bg-[#050505] rounded-[1.5rem] overflow-hidden border border-zinc-900 group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,200,50,0.3)] flex flex-col h-full mx-auto w-full max-w-[320px]">
      <div className="relative h-60 w-full overflow-hidden flex items-end justify-center bg-zinc-900">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply rounded-t-[1.5rem] z-20"></div>
        <img
          src={prof.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"}
          alt={prof.name}
          loading="lazy"
          className="relative z-10 w-full h-full object-cover object-top mask-image-bottom drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] filter contrast-125 transition-all duration-500 ease-in-out"
        />
        {prof.isCurrent ? (
          <span className="absolute top-4 right-4 z-30 bg-[var(--neon-green)] text-black px-2 py-1 uppercase font-anton tracking-widest text-xs border-2 border-black shadow-[2px_2px_0_#000]">
            Current
          </span>
        ) : (
          <span className="absolute top-4 right-4 z-30 bg-zinc-700 text-white px-2 py-1 uppercase font-anton tracking-widest text-xs border-2 border-black shadow-[2px_2px_0_#000]">
            Previous
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 items-start justify-start text-left gap-4">
        <div>
          <h4 className="font-inter font-bold text-2xl text-white tracking-tight leading-tight">
            {prof.name}
          </h4>
          <p className="text-sm font-medium text-[var(--neon-yellow)] mt-1">{prof.designation}</p>
          <p className="text-xs text-zinc-400 font-bold tracking-wider mt-2">{prof.department}</p>
        </div>
        {prof.message && (
          <div className="mt-2 pt-4 border-t border-zinc-800 w-full">
            <p className="text-xs text-zinc-300 italic line-clamp-4 leading-relaxed">&ldquo;{prof.message}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProfessorsPage() {
  const container = useRef<HTMLDivElement>(null);
  const [professors, setProfessors] = useState<ProfessorData[]>([]);

  useEffect(() => {
    async function fetchProfs() {
      try {
        const res = await fetch("/api/professors");
        if (res.ok) {
          const data: ProfessorData[] = await res.json();
          setProfessors(data);
        }
      } catch (e) {
        console.error("Failed to fetch professors:", e);
      }
    }
    fetchProfs();
  }, []);

  useGSAP(
    () => {
      gsap.from(".prof-card-wrapper", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  const currentProfs = professors.filter(p => p.isCurrent);
  const pastProfs = professors.filter(p => !p.isCurrent);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28 bg-black">
        {/* Header */}
        <section className="section-padding bg-grunge-dark halftone-overlay pb-12 relative border-b-8 border-white">
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton uppercase text-[var(--neon-yellow)] tracking-wide drop-shadow-[5px_5px_0_#FFF] mb-6 inline-block transform -rotate-2">
              PROFESSOR IN-CHARGES
            </h1>
            <p className="text-lg md:text-xl text-white font-bold font-inter max-w-2xl mx-auto bg-black p-4 border-2 border-white shadow-[4px_4px_0_var(--neon-pink)] rotate-1">
              Guiding the vision and spirit of Natvansh. Honoring the current and previous pillars of our club.
            </p>
          </div>
        </section>

        {currentProfs.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[url('/images/bg_dark_texture.webp')] bg-cover halftone-overlay relative">
            <div className="max-w-6xl mx-auto relative z-10">
              <h3 className="text-4xl md:text-5xl border-b-4 border-[var(--neon-green)] pb-2 font-anton text-left mb-12 text-white uppercase inline-block">
                CURRENT FACULTY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProfs.map((prof) => (
                  <div key={prof._id} className="prof-card-wrapper">
                    <ProfCard prof={prof} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {pastProfs.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[url('/images/bg_grunge_purple.webp')] bg-cover halftone-overlay relative border-t-8 border-black">
            <div className="max-w-6xl mx-auto relative z-10">
              <h3 className="text-4xl md:text-5xl font-anton mb-12 text-left text-white border-b-4 border-white pb-2 inline-block">
                PREVIOUS P.I.S
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastProfs.map((prof) => (
                  <div key={prof._id} className="prof-card-wrapper">
                    <ProfCard prof={prof} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
