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
    <footer className="relative bg-[url('/images/nav_footer_bg.png')] bg-cover bg-center border-t-4 sm:border-t-8 border-white overflow-hidden py-8 sm:py-12">
      <div className="absolute inset-0 bg-black/60 halftone-overlay opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-[100vw] mx-auto px-0 relative z-10">
        <div className="flex flex-col items-start gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* LEFT: Branding */}
          <div className="flex flex-col items-start shrink-0">
            <Link href="/" className="flex items-center ml-0 pl-1 sm:pl-3">
              <img 
                src="/images/logo.png" 
                alt="Natvansh Logo" 
                className="h-16 sm:h-24 md:h-32 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* MIDDLE: Address */}
          <div className="text-left md:text-right md:border-l-4 md:border-white pl-4 sm:pl-6 md:pl-8">
            <p className="text-sm sm:text-base md:text-lg font-bold font-inter text-white leading-relaxed">
              Natvansh Office, Student Activity Center (SAC),<br/>
              NIT Patna, Ashok Rajpath, Patna, Bihar - 800005
            </p>
          </div>

          {/* RIGHT: Socials */}
          <div className="flex items-center gap-4 sm:gap-6 pr-2 sm:pr-4 pl-4 sm:pl-6 md:pl-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-pink)] hover:text-black transition-all shadow-[3px_3px_0_#FFF] sm:shadow-[4px_4px_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW: Links & Copyright */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 px-4 sm:px-8 border-t-2 border-dashed border-zinc-700 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-wrap gap-4 sm:gap-6 font-anton text-sm sm:text-base md:text-lg tracking-wider text-white justify-center">
            <Link href="/" className="hover:text-[var(--neon-yellow)]">HOME</Link>
            <Link href="/events" className="hover:text-[var(--neon-green)]">EVENTS</Link>
            <Link href="/team" className="hover:text-[var(--neon-pink)]">TEAM</Link>
            <Link href="/gallery" className="hover:text-[var(--neon-magenta)]">GALLERY</Link>
            <Link href="/developers" className="hover:text-blue-400">DEVELOPERS</Link>
          </div>
          
          <div className="text-zinc-400 font-bold font-inter text-xs sm:text-sm flex flex-col items-center md:items-end gap-1">
             <p>© {new Date().getFullYear()} Natvansh. All rights reserved.</p>
             <p className="flex items-center gap-1">
              Made with <Heart size={12} className="text-[var(--neon-pink)]" fill="var(--neon-pink)" /> by{" "}
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
