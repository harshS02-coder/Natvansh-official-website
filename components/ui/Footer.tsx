"use client";

import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { IconInstagram, IconYoutube } from "@/components/ui/SocialIcons";

const socialLinks = [
  { icon: IconInstagram, href: "https://instagram.com/natvansh_nitp", label: "Instagram" },
  { icon: IconYoutube, href: "https://youtube.com/@natvansh", label: "YouTube" },
  { icon: Mail, href: "mailto:natvansh@nitp.ac.in", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black border-t-8 border-white overflow-hidden py-12">
      <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* LEFT: Branding */}
          <div className="flex flex-col items-center md:items-start group">
            <Link href="/" className="flex items-center gap-4 group">
              <img 
                src="/images/logo.png" 
                alt="Natvansh Logo" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[4px_4px_0px_#39FF14]" 
              />
              <div className="flex flex-col">
                <h2 className="text-5xl sm:text-6xl font-anton tracking-widest uppercase transition-transform group-hover:scale-105"
                    style={{ 
                      backgroundImage: "linear-gradient(to right, #FF007F, #FFFF00, #39FF14)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 20px rgba(255,0,127,0.4)"
                    }}>
                  NATVANSH
                </h2>
                <h3 className="font-bebas text-xl text-[var(--neon-pink)] uppercase tracking-widest mt-[-5px]">Drama & Film Club</h3>
              </div>
            </Link>
          </div>

          {/* MIDDLE: Address */}
          <div className="text-center md:text-right border-l-0 md:border-l-4 border-white md:pl-8">
            <p className="text-lg font-bold font-inter text-white leading-relaxed">
              Natvansh Office, Student Activity Center (SAC),<br/>
              NIT Patna, Ashok Rajpath, Patna, Bihar - 800005
            </p>
          </div>

          {/* RIGHT: Socials */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-pink)] hover:text-black transition-all shadow-[4px_4px_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW: Links & Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-dashed border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 font-anton text-lg tracking-wider text-white">
            <Link href="/" className="hover:text-[var(--neon-yellow)]">HOME</Link>
            <Link href="/events" className="hover:text-[var(--neon-green)]">EVENTS</Link>
            <Link href="/team" className="hover:text-[var(--neon-pink)]">TEAM</Link>
            <Link href="/developers" className="hover:text-blue-400">DEVELOPERS</Link>
          </div>
          
          <div className="text-zinc-400 font-bold font-inter flex flex-col items-end gap-1">
             <p>© {new Date().getFullYear()} Natvansh. All rights reserved.</p>
             <p className="flex items-center gap-1">
              Made with <Heart size={14} className="text-[var(--neon-pink)]" fill="var(--neon-pink)" /> by{" "}
              <Link href="/developers" className="text-white hover:text-[var(--neon-yellow)]">
                Natvansh Dev Team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

