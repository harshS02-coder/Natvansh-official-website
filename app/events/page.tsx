"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfessorSection from "@/components/sections/ProfessorSection";
import { Calendar, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Drama", "Film", "Workshop", "Competition"];

interface EventItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  images: string[];
  featured: boolean;
}

const placeholderEvents: EventItem[] = [
  {
    id: "1",
    title: "RANGMANCH '25",
    description: "The flagship annual drama festival of Natvansh featuring theatrical performances, monologue competitions, short film screenings, and workshops. Three days of non-stop creative energy.",
    date: "MARCH 15-17",
    venue: "CULTURAL COMPLEX",
    category: "Drama",
    images: [
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=500&fit=crop"
    ],
    featured: true,
  },
  {
    id: "2",
    title: "SHORT FILM COMPETITION",
    description: "Annual short film making competition — 48-hour filmmaking challenge with a surprise theme reveal.",
    date: "FEBRUARY 20, 2025",
    venue: "AUDITORIUM, NIT PATNA",
    category: "Film",
    images: [
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop"
    ],
    featured: false,
  },
];

export default function EventsPage() {
  const container = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<EventItem[]>(placeholderEvents);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setEvents(data);
        }
      } catch (e) {
        console.error("Failed to fetch events:", e);
      }
    }
    fetchEvents();
  }, []);

  useGSAP(
    () => {
      document.querySelectorAll(".event-alternating-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".event-anim-left"), {
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(row.querySelectorAll(".event-anim-right"), {
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { scope: container }
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-[60px] sm:pt-[10vh] md:pt-[12vh] bg-black">
        {/* Hero Banner */}
        <section className="section-padding bg-[url('/images/bg_grunge_red.webp')] bg-cover halftone-overlay pb-12 border-b-8 border-white">
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
                <Image src="/images/hero_drama_doodle.webp" alt="Drama Events" width={600} height={400} className="w-full h-auto border-4 border-black" />
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

        {/* Alternating Events Layout */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[url('/images/bg_grunge_purple.webp')] bg-cover halftone-overlay relative">
          <div className="max-w-7xl mx-auto relative z-10 space-y-24">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={event._id || event.id || index} className="event-alternating-row grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* Image Carousel */}
                  <div className={`p-4 bg-black border-4 border-black shadow-[8px_8px_0px_#FFFF00] rotate-1 ${isEven ? 'lg:order-1 event-anim-left' : 'lg:order-2 event-anim-right'}`}>
                    <Swiper
                      effect="coverflow"
                      grabCursor
                      centeredSlides
                      slidesPerView={1}
                      coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      modules={[EffectCoverflow, Pagination, Autoplay]}
                      className="overflow-hidden bg-zinc-900"
                    >
                      {event.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative aspect-[16/10] overflow-hidden border-2 border-black bg-zinc-950 transition-all duration-500 flex items-center justify-center">
                            <img src={img} alt={`${event.title} photo ${i + 1}`} loading="lazy" className="w-full h-full object-contain" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Event Details */}
                  <div className={`space-y-6 bg-black p-6 md:p-8 border-4 border-black -rotate-1 relative ${isEven ? 'lg:order-2 shadow-[6px_6px_0px_var(--neon-green)] lg:shadow-[8px_8px_0px_var(--neon-green)] event-anim-right' : 'lg:order-1 shadow-[6px_6px_0px_var(--neon-pink)] lg:shadow-[8px_8px_0px_var(--neon-pink)] event-anim-left'}`}>
                    
                    {event.featured && (
                      <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4">
                        <span className="bg-[var(--neon-pink)] text-white text-sm md:text-xl font-anton px-4 py-1 border-2 border-black rotate-[12deg] inline-block shadow-[4px_4px_0_#000]">
                          FEATURED
                        </span>
                      </div>
                    )}
                    
                    <span className="bg-[var(--neon-yellow)] text-black px-4 py-1 font-anton text-sm uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_#000] inline-block mb-2 transform -rotate-2">
                       {event.category}
                    </span>

                    <h3 className="text-3xl sm:text-4xl md:text-6xl font-anton text-white uppercase leading-none text-stroke-black drop-shadow-[4px_4px_0_#000] hover:text-[var(--neon-yellow)] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-base md:text-lg font-bold font-inter text-zinc-300 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-4 pt-4 md:pt-6 mt-4 md:mt-6 border-t-4 border-dashed border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neon-pink)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                          <Calendar size={20} className="text-black" />
                        </div>
                        <div>
                          <p className="text-lg md:text-2xl font-anton text-white tracking-wider uppercase">
                            {event.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neon-green)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                          <MapPin size={20} className="text-black" />
                        </div>
                        <div>
                          <p className="text-lg md:text-2xl font-anton text-white tracking-wider uppercase">
                            {event.venue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </section>

        {/* Professor Section */}
        <section className="border-t-8 border-white bg-black">
          <ProfessorSection />
        </section>

      </main>
      <Footer />
    </>
  );
}
