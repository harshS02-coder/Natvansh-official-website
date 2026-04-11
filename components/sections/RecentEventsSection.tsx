"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Placeholder event data
const placeholderEvent = {
  title: "RANGMANCH '25",
  description:
    "The flagship annual drama festival of Natvansh featuring theatrical performances, monologue competitions, short film screenings, and workshops. Three days of non-stop creative energy.",
  date: "MARCH 15-17",
  venue: "CULTURAL COMPLEX",
  images: [
    "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=500&fit=crop",
  ],
};

export default function RecentEventsSection() {
  const container = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/content/recent_events");
        if (res.ok) {
          const contentData = await res.json();
          setContent(contentData);
        }
      } catch (err) {
        console.error("Failed to fetch data for recent events landing page:", err);
      }
    }
    fetchData();
  }, []);

  useGSAP(
    () => {
      gsap.from(".event-carousel", {
        scrollTrigger: {
          trigger: ".event-carousel",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".event-details", {
        scrollTrigger: {
          trigger: ".event-details",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="section-padding relative overflow-hidden bg-grunge-red halftone-overlay"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          accent={content?.metadata?.accent || "SPOTLIGHT"}
          title={content?.title || "RECENT EVENTS"}
          subtitle={content?.content || "Get a glimpse into our latest high-voltage productions."}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-center">
          {/* Image Carousel — Left */}
          <div className="event-carousel p-4 bg-black border-4 border-black shadow-[8px_8px_0px_#FFFF00] rotate-1">
              <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={1}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="overflow-hidden"
              >
                {(content?.images?.length ? content.images : placeholderEvent.images).map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[16/10] overflow-hidden border-2 border-black bg-zinc-950 filter grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center">
                      <img
                        src={img}
                        alt={`Event photo ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>

          {/* Event Details — Right */}
          <div className="event-details space-y-6 bg-black p-8 border-4 border-black shadow-[8px_8px_0px_var(--neon-green)] -rotate-1 relative">
            <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4">
              <span className="bg-[var(--neon-pink)] text-white text-xl font-anton px-4 py-1 border-2 border-black rotate-[12deg] inline-block shadow-[4px_4px_0_#000]">
                FEATURED
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-6xl font-anton text-[var(--neon-yellow)] uppercase leading-none text-stroke-black drop-shadow-[4px_4px_0_#000]">
              {content?.metadata?.eventTitle || placeholderEvent.title}
            </h3>

            <p className="text-sm md:text-lg font-bold font-inter text-white leading-relaxed">
              {content?.metadata?.eventDescription || placeholderEvent.description}
            </p>

            <div className="space-y-4 pt-4 border-t-2 border-dashed border-zinc-600">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neon-pink)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                  <Calendar size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-anton text-white tracking-wider">
                    {content?.metadata?.eventDate || placeholderEvent.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neon-green)] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000]">
                  <MapPin size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-anton text-white tracking-wider">
                    {content?.metadata?.eventVenue || placeholderEvent.venue}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/events" className="grunge-btn w-full">
                {content?.metadata?.buttonText || "VIEW ALL EVENTS"} <ArrowRight size={24} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

