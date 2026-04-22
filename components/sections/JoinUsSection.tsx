"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { IconInstagram, IconYoutube } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

export default function JoinUsSection() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    branch: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useGSAP(
    () => {
      gsap.from(".joinus-heading", {
        scrollTrigger: { trigger: container.current, start: "top 80%" },
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".joinus-form", {
        scrollTrigger: { trigger: ".joinus-form", start: "top 85%" },
        opacity: 0,
        x: -40,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".joinus-info", {
        scrollTrigger: { trigger: ".joinus-info", start: "top 85%" },
        opacity: 0,
        x: 40,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", year: "", branch: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={container}
      className="section-padding relative bg-[url('/images/bg_grunge_red.webp')] bg-cover halftone-overlay border-t-8 border-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="joinus-heading text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-black bg-[var(--neon-cyan)] shadow-[4px_4px_0_#000] rotate-[-2deg] mb-4">
            <Sparkles size={14} className="text-black" />
            <span className="font-anton text-sm tracking-widest text-black uppercase">Want In?</span>
            <Sparkles size={14} className="text-black" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-anton uppercase text-white tracking-wide drop-shadow-[4px_4px_0_#000] mb-4">
            JOIN THE SQUAD
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-inter font-bold text-zinc-200 max-w-2xl mx-auto bg-black/60 p-3 border-2 border-white/20">
            Got what it takes? Drop your details and we&apos;ll reach out. Drama, film, tech — there&apos;s a spot for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="joinus-form lg:col-span-3 bg-black p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0_var(--neon-yellow)] -rotate-[0.5deg]">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-3xl font-anton text-[var(--neon-green)] uppercase mb-2">
                  You&apos;re In The Queue!
                </h3>
                <p className="text-zinc-300 font-inter font-bold">
                  We&apos;ve received your submission. The team will reach out soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-[var(--neon-yellow)] text-black font-anton border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-all"
                >
                  SUBMIT ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors"
                      placeholder="you@nitp.ac.in"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors"
                      placeholder="+91 ..."
                    />
                  </div>
                  <div>
                    <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors"
                      placeholder="CSE, ECE..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-anton text-sm text-[var(--neon-yellow)] uppercase tracking-wider mb-1">
                    Why Natvansh?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-900 border-2 border-zinc-700 text-white font-inter font-bold focus:border-[var(--neon-pink)] outline-none transition-colors resize-none"
                    placeholder="Tell us about your passion for drama, film, or anything creative..."
                  />
                </div>

                {error && (
                  <div className="bg-red-900/50 border-2 border-red-500 p-3 text-red-300 font-inter font-bold text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-[var(--neon-pink)] text-black font-anton text-xl uppercase tracking-wider border-3 border-black shadow-[6px_6px_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[3px_3px_0_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  {submitting ? "SENDING..." : "SEND IT"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="joinus-info lg:col-span-2 space-y-6">
            {/* Contact Card */}
            <div className="bg-black p-6 border-4 border-black shadow-[6px_6px_0_var(--neon-green)] rotate-[1deg]">
              <h3 className="text-2xl font-anton text-white uppercase mb-6 drop-shadow-[2px_2px_0_#000]">
                REACH OUT
              </h3>

              <div className="space-y-5">
                <a href="mailto:natvansh@nitp.ac.in" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[var(--neon-pink)] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0_#000] transition-all">
                    <Mail size={18} className="text-black" />
                  </div>
                  <span className="text-zinc-300 font-inter font-bold text-sm group-hover:text-white transition-colors">
                    natvansh@nitp.ac.in
                  </span>
                </a>

                <a href="tel:+919876543210" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[var(--neon-yellow)] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0_#000] transition-all">
                    <Phone size={18} className="text-black" />
                  </div>
                  <span className="text-zinc-300 font-inter font-bold text-sm group-hover:text-white transition-colors">
                    +91 98765 43210
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--neon-green)] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000] shrink-0">
                    <MapPin size={18} className="text-black" />
                  </div>
                  <span className="text-zinc-300 font-inter font-bold text-sm">
                    SAC Building, NIT Patna<br />
                    Ashok Rajpath, Patna - 800005
                  </span>
                </div>
              </div>
            </div>

            {/* Social Card */}
            <div className="bg-black p-6 border-4 border-black shadow-[6px_6px_0_var(--neon-cyan)] -rotate-[1deg]">
              <h3 className="text-xl font-anton text-white uppercase mb-4">FOLLOW THE CHAOS</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/natvansh_nitp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-pink)] hover:text-black transition-all shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  <IconInstagram size={22} />
                </a>
                <a
                  href="https://youtube.com/@natvansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-yellow)] hover:text-black transition-all shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  <IconYoutube size={22} />
                </a>
                <a
                  href="mailto:natvansh@nitp.ac.in"
                  className="w-12 h-12 flex items-center justify-center border-2 border-white text-white hover:bg-[var(--neon-green)] hover:text-black transition-all shadow-[3px_3px_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>

            {/* Fun stats */}
            <div className="bg-[var(--neon-yellow)] p-5 border-4 border-black shadow-[6px_6px_0_#000] rotate-[2deg]">
              <p className="font-anton text-2xl text-black uppercase text-center leading-tight">
                50+ ACTIVE MEMBERS<br />
                <span className="text-base text-zinc-800">AND COUNTING...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
