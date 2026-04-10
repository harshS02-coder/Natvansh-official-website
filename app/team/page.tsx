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

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  position: string;
  image: string;
  imageTransform?: { x: number; y: number; scale: number };
  socialLinks: { instagram?: string; linkedin?: string; email?: string };
  year: string;
  order: number;
}

const placeholderPostBearers: TeamMember[] = [
  { name: "Rahul Sharma", role: "President", position: "Post Bearer", image: fallbackImage, socialLinks: {}, year: "2025", order: 1 },
  { name: "Priya Singh", role: "Vice President", position: "Post Bearer", image: fallbackImage, socialLinks: {}, year: "2025", order: 2 },
  { name: "Arjun Patel", role: "General Secretary", position: "Post Bearer", image: fallbackImage, socialLinks: {}, year: "2025", order: 3 },
  { name: "Sneha Gupta", role: "Cultural Secretary", position: "Post Bearer", image: fallbackImage, socialLinks: {}, year: "2025", order: 4 },
];

const placeholderCreative: TeamMember[] = [
  { name: "Ananya Roy", role: "Head of Direction", position: "Creative", image: fallbackImage, socialLinks: {}, year: "2025", order: 1 },
  { name: "Vikram Das", role: "Head of Scripting", position: "Creative", image: fallbackImage, socialLinks: {}, year: "2025", order: 2 },
];

const placeholderTechnical: TeamMember[] = [
  { name: "Amit Kumar", role: "Head of Cinematography", position: "Technical", image: fallbackImage, socialLinks: {}, year: "2025", order: 1 },
  { name: "Riya Verma", role: "Head of Editing", position: "Technical", image: fallbackImage, socialLinks: {}, year: "2025", order: 2 },
];

// Card component
const TeamCard = ({ person }: { person: TeamMember }) => {
  const transformStyle = person.imageTransform
    ? `translate(${person.imageTransform.x}px, ${person.imageTransform.y}px) scale(${person.imageTransform.scale})`
    : 'none';

  return (
    <div className="bg-[#050505] rounded-[1.5rem] overflow-hidden border border-zinc-900 group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,100,50,0.3)] flex flex-col h-full mx-auto w-full max-w-[320px]">
      <div className="relative h-60 w-full bg-[url('/images/card_doodle_bg.png')] bg-cover bg-center overflow-hidden flex items-end justify-center">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply rounded-t-[1.5rem]"></div>
        <img
          src={person.image || fallbackImage}
          alt={person.name}
          className="relative z-10 w-full h-[90%] object-cover object-top mask-image-bottom drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] filter contrast-125 transition-transform duration-500 ease-in-out"
          style={{ transform: transformStyle }}
        />
      </div>
    <div className="p-6 flex flex-col flex-1 items-start justify-between text-left gap-8">
      <div>
        <h4 className="font-inter font-bold text-2xl text-white tracking-tight leading-tight">
          {person.name}
        </h4>
        <p className="text-sm font-medium text-zinc-400 mt-1">{person.role}</p>
        {person.year && (
          <p className="text-sm text-zinc-300 font-medium tracking-wider mt-6">Batch {person.year}</p>
        )}
      </div>
      <div className="flex items-center gap-6 w-full justify-start mt-2">
        {person.socialLinks?.instagram && (
          <a href={person.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors"><IconInstagram size={22} /></a>
        )}
        {person.socialLinks?.linkedin && (
          <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors"><IconLinkedin size={20} /></a>
        )}
        {person.socialLinks?.email && (
          <a href={`mailto:${person.socialLinks.email}`} className="text-zinc-300 hover:text-white transition-colors"><IconWhatsapp size={22} /></a>
        )}
        {!person.socialLinks?.instagram && !person.socialLinks?.linkedin && !person.socialLinks?.email && (
          <>
            <span className="text-zinc-300"><IconInstagram size={22} /></span>
            <span className="text-zinc-300"><IconLinkedin size={20} /></span>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default function TeamPage() {
  const container = useRef<HTMLDivElement>(null);
  const [postBearers, setPostBearers] = useState<TeamMember[]>(placeholderPostBearers);
  const [creativeTeam, setCreativeTeam] = useState<TeamMember[]>(placeholderCreative);
  const [technicalTeam, setTechnicalTeam] = useState<TeamMember[]>(placeholderTechnical);
  const [managementTeam, setManagementTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const data: TeamMember[] = await res.json();
          if (data.length > 0) {
            const pb = data.filter(m => m.position === "Post Bearer").sort((a, b) => a.order - b.order);
            const cr = data.filter(m => m.position === "Creative").sort((a, b) => a.order - b.order);
            const tc = data.filter(m => m.position === "Technical").sort((a, b) => a.order - b.order);
            const mg = data.filter(m => m.position === "Management").sort((a, b) => a.order - b.order);
            if (pb.length > 0) setPostBearers(pb);
            if (cr.length > 0) setCreativeTeam(cr);
            if (tc.length > 0) setTechnicalTeam(tc);
            if (mg.length > 0) setManagementTeam(mg);
          }
        }
      } catch (e) {
        console.error("Failed to fetch team:", e);
      }
    }
    fetchTeam();
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

  const teamSections = [
    { name: "CREATIVE TEAM", members: creativeTeam, bg: "bg-[url('/images/bg_grunge_purple.png')]" },
    { name: "TECHNICAL TEAM", members: technicalTeam, bg: "bg-[url('/images/bg_dark_texture.png')]" },
    ...(managementTeam.length > 0 ? [{ name: "MANAGEMENT TEAM", members: managementTeam, bg: "bg-[url('/images/bg_grunge_red.png')]" }] : []),
  ];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28 bg-black">
        {/* Header */}
        <section className="section-padding bg-grunge-dark halftone-overlay pb-12 relative border-b-8 border-white">
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-anton uppercase text-[var(--neon-yellow)] tracking-wide drop-shadow-[5px_5px_0_#FFF] mb-6 inline-block transform -rotate-2">
              THE SQUAD
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold font-inter max-w-2xl mx-auto bg-black p-4 border-2 border-white shadow-[4px_4px_0_var(--neon-pink)] rotate-1">
              For years, Natvansh has built a legacy of discovering and celebrating raw talent. At the heart of this journey are the people holding it together.
            </p>
          </div>
        </section>

        {/* Post Bearers */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[url('/images/bg_grunge_red.png')] bg-cover halftone-overlay relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <h3 className="text-4xl md:text-5xl border-b-4 border-black pb-2 font-anton text-left mb-12 text-white uppercase">
              POST BEARERS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {postBearers.map((person) => (
                <div key={person._id || person.name} className="member-card-wrapper">
                  <TeamCard person={person} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Categories */}
        {teamSections.map((category) => (
          category.members.length > 0 && (
            <section
              key={category.name}
              className={`px-4 sm:px-6 lg:px-8 py-20 relative ${category.bg} bg-cover halftone-overlay border-t-8 border-black`}
            >
              <div className="max-w-6xl mx-auto relative z-10">
                <h3 className="text-4xl md:text-5xl font-anton mb-12 text-left text-white border-b-4 border-[var(--neon-pink)] pb-2 inline-block">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.members.map((member) => (
                    <div key={member._id || member.name} className="member-card-wrapper">
                      <TeamCard person={member} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        ))}
      </main>
      <Footer />
    </>
  );
}
