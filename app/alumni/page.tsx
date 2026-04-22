"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { IconInstagram, IconLinkedin, IconWhatsapp } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const fallbackImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop";

interface AlumniData {
  _id?: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  image: string;
  imageTransform?: { x: number; y: number; scale: number };
  socialLinks: { instagram?: string; linkedin?: string; email?: string };
  order: number;
}

// Card component
const AlumniCard = ({ person }: { person: AlumniData }) => {
  const transformStyle = person.imageTransform
    ? `translate(${person.imageTransform.x}px, ${person.imageTransform.y}px) scale(${person.imageTransform.scale})`
    : 'none';

  return (
    <div className="bg-[#050505] rounded-[1.5rem] overflow-hidden border border-zinc-900 group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(200,200,200,0.3)] flex flex-col h-full mx-auto w-full max-w-[320px]">
      <div className="relative h-60 w-full bg-[url('/images/card_doodle_bg.webp')] bg-cover bg-center overflow-hidden flex items-end justify-center">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply rounded-t-[1.5rem]"></div>
        <img
          src={person.image || fallbackImage}
          alt={person.name}
          loading="lazy"
          className="relative z-10 w-full h-[90%] object-cover object-top mask-image-bottom drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] filter contrast-125 transition-all duration-500 ease-in-out"
          style={{ transform: transformStyle }}
        />
      </div>
      <div className="p-6 flex flex-col flex-1 items-start justify-between text-left gap-6">
        <div className="w-full">
          <h4 className="font-inter font-bold text-2xl text-white tracking-tight leading-tight flex items-center justify-between">
            {person.name}
            {person.batch && <span className="text-[10px] font-anton px-2 py-1 bg-zinc-800 text-white rounded">'{person.batch.slice(-2)}</span>}
          </h4>
          <p className="text-sm font-medium text-zinc-400 mt-1">{person.role}</p>
          {person.company && (
            <p className="text-sm font-bold text-[var(--neon-cyan)] mt-3">@ {person.company}</p>
          )}
        </div>
        <div className="flex items-center gap-6 w-full justify-start mt-2 border-t border-zinc-800 pt-4">
          {person.socialLinks?.instagram && (
            <a href={person.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[var(--neon-pink)] transition-colors"><IconInstagram size={22} /></a>
          )}
          {person.socialLinks?.linkedin && (
            <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[var(--neon-cyan)] transition-colors"><IconLinkedin size={20} /></a>
          )}
          {person.socialLinks?.email && (
            <a href={`mailto:${person.socialLinks.email}`} className="text-zinc-400 hover:text-white transition-colors"><IconWhatsapp size={22} /></a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AlumniPage() {
  const container = useRef<HTMLDivElement>(null);
  const [alumni, setAlumni] = useState<AlumniData[]>([]);

  useEffect(() => {
    async function fetchAlumni() {
      try {
        const res = await fetch("/api/alumni");
        if (res.ok) {
          const data: AlumniData[] = await res.json();
          setAlumni(data);
        }
      } catch (e) {
        console.error("Failed to fetch alumni:", e);
      }
    }
    fetchAlumni();
  }, []);

  useGSAP(
    () => {
      gsap.from(".member-card-wrapper", {
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

  // Group by batch
  const groupedAlumni = alumni.reduce((acc, curr) => {
    if (!acc[curr.batch]) acc[curr.batch] = [];
    acc[curr.batch].push(curr);
    return acc;
  }, {} as Record<string, AlumniData[]>);

  const batches = Object.keys(groupedAlumni).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28 bg-black">
        {/* Header */}
        <section className="section-padding bg-grunge-dark halftone-overlay pb-12 relative border-b-8 border-zinc-800">
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-anton uppercase text-white tracking-wide drop-shadow-[5px_5px_0_var(--neon-cyan)] mb-6 inline-block transform -rotate-1">
              THE LEGACY
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold font-inter max-w-2xl mx-auto bg-black p-4 border-2 border-white shadow-[4px_4px_0_#FFF] rotate-1">
              The creative minds and visionaries who built Natvansh. Discover where our talented alumni are making their mark in the world.
            </p>
          </div>
        </section>

        {/* Categories */}
        {batches.length === 0 ? (
           <div className="py-32 text-center text-zinc-500 font-inter font-bold">No alumni records found.</div>
        ) : (
          batches.map((batch, index) => (
            <section
              key={batch}
              className={`px-4 sm:px-6 lg:px-8 py-20 relative ${index % 2 === 0 ? "bg-[url('/images/bg_dark_texture.webp')]" : "bg-[url('/images/bg_grunge_purple.webp')]"} bg-cover halftone-overlay border-b-8 border-black`}
            >
              <div className="max-w-6xl mx-auto relative z-10">
                <h3 className="text-4xl md:text-5xl font-anton mb-12 text-left text-white border-b-4 border-[var(--neon-cyan)] pb-2 inline-block">
                  CLASS OF {batch}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {groupedAlumni[batch].map((member) => (
                    <div key={member._id || member.name} className="member-card-wrapper">
                      <AlumniCard person={member} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
