"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  _id?: string;
  title: string;
  image: string;
  category: string;
  order: number;
}

const placeholderImages: GalleryItem[] = [
  { title: "Rangmanch '25", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=800&fit=crop", category: "Drama", order: 0 },
  { title: "Mime Night", image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&h=600&fit=crop", category: "Drama", order: 1 },
  { title: "Shorts '24", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=600&fit=crop", category: "Film", order: 2 },
  { title: "Nukkad Natak", image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=600&fit=crop", category: "Drama", order: 3 },
  { title: "Alumni Workshop", image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&h=1200&fit=crop", category: "Workshop", order: 4 },
  { title: "Documentary Fest", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop", category: "Film", order: 5 },
];

export default function GalleryPage() {
  const container = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GalleryItem[]>(placeholderImages);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setImages(data);
        }
      } catch (e) {
        console.error("Failed to fetch gallery:", e);
      }
    }
    fetchGallery();
  }, []);

  useGSAP(
    () => {
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
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
        {/* Header */}
        <section className="section-padding bg-[url('/images/bg_grunge_red.png')] bg-cover halftone-overlay pb-12 border-b-8 border-white">
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl md:text-8xl font-anton uppercase text-white tracking-wide drop-shadow-[5px_5px_0_var(--neon-green)] mb-6 transform -rotate-1">
              THE GALLERY
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold font-inter max-w-2xl mx-auto bg-black p-4 border-2 border-white shadow-[4px_4px_0_var(--neon-pink)] rotate-1">
              Frozen moments from our wildest performances, workshops, and behind-the-scenes chaos.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-grunge-dark halftone-overlay relative">
          <div className="max-w-7xl mx-auto gallery-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 relative z-10">
            {images.map((image, idx) => (
              <div 
                key={image._id || idx} 
                className={`gallery-item break-inside-avoid mb-6 relative overflow-hidden group cursor-pointer border-4 border-black shadow-[8px_8px_0_#FFF] hover:shadow-[10px_10px_0_var(--neon-yellow)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 bg-zinc-900`}
                style={{ transform: `rotate(${(idx % 3 - 1) * 0.8}deg)` }}
              >
                <img 
                  src={image.image} 
                  alt={image.title} 
                  className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-anton text-2xl text-white uppercase tracking-wider group-hover:text-[var(--neon-pink)]">
                    {image.title}
                  </h3>
                  <span className="text-xs font-inter font-bold text-zinc-400 uppercase">{image.category}</span>
                </div>
                
                {/* Decorative Tape */}
                <div className={`absolute -top-3 ${idx % 2 === 0 ? '-left-3 rotate-[-15deg]' : '-right-3 rotate-[15deg]'} w-24 h-8 border-2 border-black bg-[var(--neon-yellow)] z-20`}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-[url('/images/bg_grunge_purple.png')] bg-cover halftone-overlay border-t-8 border-white text-center">
            <h2 className="text-5xl md:text-7xl font-anton text-white tracking-widest uppercase mb-8 drop-shadow-[4px_4px_0_#000]">
                WANT TO BE IN THE FRAME?
            </h2>
            <a href="/team" className="inline-block px-10 py-5 bg-[var(--neon-pink)] text-black border-4 border-black font-anton text-2xl hover:bg-white hover:shadow-[8px_8px_0_var(--neon-yellow)] transition-all shadow-[6px_6px_0_#000] -rotate-2 hover:rotate-0">
                JOIN THE SQUAD
            </a>
        </section>

      </main>
      <Footer />
    </>
  );
}
