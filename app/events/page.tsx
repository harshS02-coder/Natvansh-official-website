"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Drama", "Film", "Workshop", "Competition"];

const placeholderEvents = [
  {
    id: "1",
    title: "Rangmanch — Annual Drama Festival",
    description: "The flagship annual drama festival featuring theatrical performances, monologue competitions, and workshops.",
    date: "March 15-17, 2025",
    venue: "Cultural Complex, NIT Patna",
    category: "Drama",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Short Film Competition",
    description: "Annual short film making competition — 48-hour filmmaking challenge with a surprise theme reveal.",
    date: "February 20, 2025",
    venue: "Auditorium, NIT Patna",
    category: "Film",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "3",
    title: "Nukkad Natak — Street Play Day",
    description: "Bringing socially relevant stories to the streets of NIT Patna campus through powerful street theater.",
    date: "January 26, 2025",
    venue: "Main Campus Ground",
    category: "Drama",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Acting Workshop by Alumni",
    description: "Master class on method acting and improvisation led by Natvansh alumni from the film industry.",
    date: "December 10, 2024",
    venue: "Seminar Hall, NIT Patna",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "5",
    title: "Mime & Monologue Night",
    description: "An evening dedicated to the art of mime and solo performances, exploring silence and solitude on stage.",
    date: "November 15, 2024",
    venue: "Open Air Theater",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "6",
    title: "Documentary Screening",
    description: "Screening of award-winning documentaries followed by panel discussion on independent filmmaking.",
    date: "October 8, 2024",
    venue: "Auditorium, NIT Patna",
    category: "Film",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop",
    featured: false,
  },
];

export default function EventsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".events-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.6,
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
        {/* Hero Banner */}
        <section className="section-padding bg-[url('/images/bg_grunge_red.png')] bg-cover halftone-overlay pb-12 border-b-8 border-white">
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <SectionHeading
                accent="✦ The Stage Awaits"
                title="Our Events"
                subtitle="From the raw energy of nukkad natak to the magic of cinema, explore everything Natvansh has to offer."
              />
            </div>
            <div className="flex-1 w-full max-w-md mx-auto hidden md:block transform -rotate-2 hover:rotate-2 transition-transform duration-500">
              <div className="border-4 border-black p-2 bg-[var(--neon-green)] shadow-[10px_10px_0_#000]">
                <img src="/images/hero_drama_doodle.png" alt="Drama Events" className="w-full h-auto border-4 border-black" />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 relative z-10">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-8 py-3 font-anton uppercase text-xl transition-all duration-300 border-2 border-black transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] focus:outline-none ${
                  i === 0
                    ? "bg-[var(--neon-yellow)] text-black shadow-[4px_4px_0_#000]"
                    : "bg-black text-white hover:bg-[var(--neon-pink)] hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Events Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-grunge-dark halftone-overlay relative">
          <div className="max-w-6xl mx-auto events-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            {placeholderEvents.map((event) => (
              <div
                key={event.id}
                className="event-card bg-[#0a0a0a] border-4 border-black p-4 flex flex-col group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[10px_10px_0_var(--neon-pink)]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden border-2 border-zinc-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  {event.featured && (
                    <span
                      className="absolute top-3 right-3 px-4 py-1 text-sm font-anton uppercase text-black bg-[var(--neon-yellow)] border-2 border-black shadow-[2px_2px_0_#000]"
                    >
                      ★ Featured
                    </span>
                  )}
                  <span
                    className="absolute bottom-3 left-3 px-4 py-1 text-xs font-bold uppercase text-white bg-[var(--neon-purple)] tracking-wider border-2 border-transparent group-hover:border-white transition-all transform -rotate-2"
                  >
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-anton text-white uppercase tracking-wider group-hover:text-[var(--neon-yellow)] transition-colors mt-2 mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-sm font-inter text-zinc-400 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t-2 border-dashed border-zinc-800 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--neon-pink)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                        <Calendar size={16} className="text-black" />
                      </div>
                      <span className="text-sm font-bold text-zinc-300">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--neon-green)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                        <MapPin size={16} className="text-black" />
                      </div>
                      <span className="text-sm font-bold text-zinc-300">
                        {event.venue.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
