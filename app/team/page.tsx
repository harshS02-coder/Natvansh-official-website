"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconInstagram, IconLinkedin, IconWhatsapp, IconX } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const fallbackImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop";

const postBearers = [
  { 
    name: "Rahul Sharma", 
    role: "President", 
    image: fallbackImage,
    phone: "+91 98765 43210"
  },
  { 
    name: "Priya Singh", 
    role: "Vice President", 
    image: fallbackImage,
    phone: "+91 87654 32109"
  },
  { 
    name: "Arjun Patel", 
    role: "General Secretary", 
    image: fallbackImage,
    phone: "+91 76543 21098"
  },
  { 
    name: "Sneha Gupta", 
    role: "Cultural Secretary", 
    image: fallbackImage,
    phone: "+91 65432 10987"
  },
];

const teamCategories = [
  {
    name: "CREATIVE TEAM",
    members: [
      { name: "Ananya Roy", role: "Head of Direction", image: fallbackImage, phone: "+91 99999 00000" },
      { name: "Vikram Das", role: "Head of Scripting", image: fallbackImage, phone: "+91 88888 11111" },
      { name: "Meera Yadav", role: "Head of Acting", image: fallbackImage, phone: "+91 77777 22222" },
      { name: "Karan Joshi", role: "Choreographer", image: fallbackImage, phone: "+91 66666 33333" },
    ],
  },
  {
    name: "TECHNICAL TEAM",
    members: [
      { name: "Amit Kumar", role: "Head of Cinematography", image: fallbackImage, phone: "+91 55555 44444" },
      { name: "Riya Verma", role: "Head of Editing", image: fallbackImage, phone: "+91 44444 55555" },
      { name: "Saurav Mishra", role: "Sound Design", image: fallbackImage, phone: "+91 33333 66666" },
      { name: "Nisha Agarwal", role: "Lighting Design", image: fallbackImage, phone: "+91 22222 77777" },
    ],
  },
];

// Helper to wrap the reusable card layout
const TeamCard = ({ person }: { person: any }) => (
  <div className="bg-[#050505] rounded-[1.5rem] overflow-hidden border border-zinc-900 group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,100,50,0.3)] flex flex-col h-full mx-auto w-full max-w-[320px]">
    {/* Doodle Image Area */}
    <div className="relative h-60 w-full bg-[url('/images/card_doodle_bg.png')] bg-cover bg-center overflow-hidden flex items-end justify-center">
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply rounded-t-[1.5rem]"></div>
      {/* Cutout style subject photo */}
      <img 
        src={person.image} 
        alt={person.name} 
        className="relative z-10 w-full h-[90%] object-cover object-top mask-image-bottom drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] filter contrast-125"
      />
    </div>

    {/* Text & Socials Area */}
    <div className="p-6 flex flex-col flex-1 items-start justify-between text-left gap-8">
      <div>
        <h4 className="font-inter font-bold text-2xl text-white tracking-tight leading-tight">
          {person.name}
        </h4>
        <p className="text-sm font-medium text-zinc-400 mt-1">
          {person.role}
        </p>
        
        <p className="text-sm text-zinc-300 font-medium tracking-wider mt-6">
          {person.phone}
        </p>
      </div>

      <div className="flex items-center gap-6 w-full justify-start mt-2">
        <a href="#" className="text-zinc-300 hover:text-white transition-colors">
          <IconWhatsapp size={22} />
        </a>
        <a href="#" className="text-zinc-300 hover:text-white transition-colors">
          <IconLinkedin size={20} />
        </a>
        <a href="#" className="text-zinc-300 hover:text-white transition-colors">
          <IconInstagram size={22} />
        </a>
        <a href="#" className="text-zinc-300 hover:text-white transition-colors">
          <IconX size={20} />
        </a>
      </div>
    </div>
  </div>
);

export default function TeamPage() {
  const container = useRef<HTMLDivElement>(null);

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
            <h3 className="text-4xl md:text-5xl border-b-4 border-black pb-2 font-anton text-left mb-12 text-black uppercase">
              POST BEARERS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {postBearers.map((person) => (
                <div key={person.name} className="member-card-wrapper">
                  <TeamCard person={person} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Categories */}
        {teamCategories.map((category, catIndex) => (
          <section
            key={category.name}
            className={`px-4 sm:px-6 lg:px-8 py-20 relative ${
              catIndex % 2 === 0 ? "bg-[url('/images/bg_grunge_purple.png')]" : "bg-[url('/images/bg_dark_texture.png')]"
            } bg-cover halftone-overlay border-t-8 border-black`}
          >
            <div className="max-w-6xl mx-auto relative z-10">
              <h3 className="text-4xl md:text-5xl font-anton mb-12 text-left text-white border-b-4 border-[var(--neon-pink)] pb-2 inline-block">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.members.map((member) => (
                  <div key={member.name} className="member-card-wrapper">
                    <TeamCard person={{...member, image: member.image}} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

