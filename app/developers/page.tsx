"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { Globe, Code2, Heart } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const fallbackImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop";

interface DevItem {
  _id?: string;
  name: string;
  role: string;
  image: string;
  imageTransform?: { x: number; y: number; scale: number };
  github: string;
  linkedin: string;
  portfolio: string;
  order: number;
}

const placeholderDevs: DevItem[] = [
  { name: "Developer One", role: "Full-Stack Developer", image: fallbackImage, github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://example.com", order: 0 },
  { name: "Developer Two", role: "Frontend Developer", image: fallbackImage, github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "", order: 1 },
  { name: "Developer Three", role: "UI/UX Designer", image: fallbackImage, github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://example.com", order: 2 },
];

const techStack = [
  { name: "Next.js", color: "var(--neon-pink)" },
  { name: "React", color: "var(--neon-yellow)" },
  { name: "Three.js", color: "var(--neon-green)" },
  { name: "GSAP", color: "#FFF" },
  { name: "MongoDB", color: "var(--neon-pink)" },
  { name: "Tailwind", color: "var(--neon-yellow)" },
  { name: "Clerk", color: "var(--neon-green)" },
  { name: "TypeScript", color: "#FFF" },
];

const DevCard = ({ dev }: { dev: DevItem }) => {
  const transformStyle = dev.imageTransform
    ? `translate(${dev.imageTransform.x}px, ${dev.imageTransform.y}px) scale(${dev.imageTransform.scale})`
    : 'none';

  return (
    <div className="bg-[#050505] rounded-[1.5rem] overflow-hidden border-2 border-[var(--neon-purple)] group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] flex flex-col h-full mx-auto w-full max-w-[340px]">
      <div className="relative h-60 w-full bg-[url('/images/card_doodle_bg_alt.webp')] bg-cover bg-center overflow-hidden flex items-end justify-center">
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply rounded-t-[1.5rem]"></div>
        <img 
          src={dev.image || fallbackImage} 
          alt={dev.name} 
          loading="lazy"
          className="relative z-10 w-full h-[90%] object-cover object-top mask-image-bottom drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] filter contrast-125 saturate-150 transition-all duration-500 ease-in-out cursor-pointer"
          style={{ transform: transformStyle }}
        />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-black border-2 border-[var(--neon-pink)] shadow-[2px_2px_0_#FFF] z-20 transform rotate-[10deg]">
          <Code2 size={24} style={{ color: "var(--neon-pink)" }} />
        </div>
      </div>
    <div className="p-6 flex flex-col flex-1 items-center justify-between text-center gap-6">
      <div>
        <h4 className="font-anton text-3xl text-white tracking-widest uppercase text-stroke-black drop-shadow-[2px_2px_0_#000]">
          {dev.name}
        </h4>
        <p className="text-md font-bold font-inter text-[var(--neon-pink)] uppercase mt-2 border-t-2 border-dashed border-zinc-700 pt-2 inline-block">
          {dev.role}
        </p>
      </div>
      <div className="flex items-center gap-6 w-full justify-center mt-2">
        {dev.github && (
          <a href={dev.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-yellow)] hover:text-black hover:border-black shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
            <IconGithub size={24} />
          </a>
        )}
        {dev.linkedin && (
          <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-green)] hover:text-black hover:border-black shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
            <IconLinkedin size={24} />
          </a>
        )}
        {dev.portfolio && (
          <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-pink)] hover:text-black hover:border-black shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
            <Globe size={24} />
          </a>
        )}
      </div>
    </div>
    </div>
  );
};

export default function DevelopersPage() {
  const container = useRef<HTMLDivElement>(null);
  const [developers, setDevelopers] = useState<DevItem[]>(placeholderDevs);

  useEffect(() => {
    async function fetchDevs() {
      try {
        const res = await fetch("/api/developers");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setDevelopers(data);
        }
      } catch (e) {
        console.error("Failed to fetch developers:", e);
      }
    }
    fetchDevs();
  }, []);

  useGSAP(
    () => {
      gsap.from(".dev-card-wrapper", {
        scrollTrigger: {
          trigger: ".dev-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        rotateY: 15,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".tech-badge", {
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 85%",
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(2)",
      });
    },
    { scope: container }
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28 bg-black">
        {/* Header */}
        <section className="section-padding bg-[url('/images/bg_grunge_purple.webp')] bg-cover halftone-overlay pb-12 overflow-hidden relative border-b-8 border-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1">
              <SectionHeading
                accent="✦ Behind the Curtain"
                title="The Developers"
                subtitle="The tech wizards who built this digital stage for Natvansh."
              />
            </div>
            <div className="flex-1 w-full max-w-md mx-auto hidden lg:block transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="border-4 border-black p-2 bg-[var(--neon-pink)] shadow-[10px_10px_0_#000]">
                <img src="/images/team_doodle.webp" alt="Dev Team Doodle" loading="lazy" className="w-full h-auto border-4 border-black filter contrast-125" />
              </div>
            </div>
          </div>
        </section>

        {/* Developer Cards */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-grunge-dark halftone-overlay border-b-8 border-black">
          <div className="max-w-5xl mx-auto dev-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            {developers.map((dev) => (
              <div key={dev._id || dev.name} className="dev-card-wrapper">
                <DevCard dev={dev} />
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-[url('/images/bg_grunge_red.webp')] bg-cover halftone-overlay relative">
          <div className="max-w-4xl mx-auto text-center relative z-10 bg-black p-10 border-4 border-black shadow-[15px_15px_0_var(--neon-yellow)] transform -rotate-1">
            <h3 className="text-5xl font-anton uppercase text-white mb-4 text-stroke-black drop-shadow-[3px_3px_0_#000]">
              Built With
            </h3>
            <p className="text-xl font-bold font-inter mb-10 text-[var(--neon-green)] uppercase">
              Technologies powering this experience
            </p>
            <div className="tech-grid flex flex-wrap justify-center gap-4">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="tech-badge px-6 py-3 border-2 border-black font-anton text-xl uppercase tracking-wider shadow-[4px_4px_0_#FFF] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-default"
                  style={{ backgroundColor: tech.color, color: "black" }}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Love message */}
            <div className="mt-16 pt-8 border-t-4 border-dashed border-zinc-800 flex items-center justify-center gap-4">
              <span className="text-xl font-bold text-white uppercase">
                Crafted with
              </span>
              <Heart size={32} fill="var(--neon-pink)" stroke="black" strokeWidth={2} />
              <span className="text-xl font-bold text-white uppercase">
                for
              </span>
              <span className="font-anton text-4xl bg-[var(--neon-yellow)] text-black px-4 py-1 border-2 border-black transform rotate-2">नटवंश</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
