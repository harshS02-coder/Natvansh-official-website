"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

interface ContentSection {
  section: string;
  title: string;
  content: string;
  image: string;
  images?: string[];
  metadata: Record<string, string>;
}

const defaultContent: ContentSection[] = [
  {
    section: "hero",
    title: "नटवंश",
    content: "Where every emotion finds its stage and every story finds its screen.",
    image: "",
    metadata: { tagline: "अस्ति कश्चित् विशेषः!", subtitle: "Drama & Film Club · NIT Patna" },
  },
  {
    section: "intro",
    title: "Where Stories Come Alive",
    content: "Founded at the National Institute of Technology, Patna, Natvansh is the heartbeat of dramatic arts on campus.",
    image: "",
    images: [
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&h=600&fit=crop"
    ],
    metadata: {},
  },
  {
    section: "professor",
    title: "Prof. Faculty Name",
    content: "Drama and cinema are not merely forms of entertainment — they are mirrors of society, vehicles of empathy, and crucibles of character.",
    image: "",
    metadata: { designation: "Professor In-Charge, Natvansh", department: "Department of Humanities & Social Sciences, NIT Patna" },
  },
];

export default function AdminContentPage() {
  const [sections, setSections] = useState<ContentSection[]>(defaultContent);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [newImageUrls, setNewImageUrls] = useState<Record<string, string>>({});

  useEffect(() => { fetchContent(); }, []);

  async function fetchContent() {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setSections(defaultContent.map((dc) => {
            const found = data.find((d: ContentSection) => d.section === dc.section);
            return found || dc;
          }));
        }
      }
    } catch (e) { console.error(e); }
  }

  async function handleSave(section: ContentSection) {
    setSaving(section.section);
    try {
      const res = await fetch(`/api/content/${section.section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      if (res.ok) { setSaved(section.section); setTimeout(() => setSaved(null), 2000); }
    } catch (e) { console.error(e); }
    finally { setSaving(null); }
  }

  function updateSection(sectionName: string, updates: Partial<ContentSection>) {
    setSections(sections.map((s) => (s.section === sectionName ? { ...s, ...updates } : s)));
  }

  function addImageUrl(sectionName: string) {
    const url = newImageUrls[sectionName];
    if (url && url.trim()) {
      setSections(sections.map(s => s.section === sectionName ? { ...s, images: [...(s.images || []), url.trim()] } : s));
      setNewImageUrls({ ...newImageUrls, [sectionName]: "" });
    }
  }

  function removeImage(sectionName: string, index: number) {
    setSections(sections.map(s => s.section === sectionName ? { ...s, images: (s.images || []).filter((_, i) => i !== index) } : s));
  }

  function updateMetadata(sectionName: string, key: string, value: string) {
    setSections(sections.map((s) =>
      s.section === sectionName ? { ...s, metadata: { ...s.metadata, [key]: value } } : s
    ));
  }

  const sectionLabels: Record<string, { label: string; color: string }> = {
    hero: { label: "🎭 HERO SECTION", color: "var(--neon-pink)" },
    intro: { label: "✦ CLUB INTRODUCTION", color: "var(--neon-green)" },
    professor: { label: "📜 PROFESSOR'S MESSAGE", color: "var(--neon-yellow)" },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Site Content</h1>
        <p className="text-sm font-inter text-zinc-500">Edit homepage sections — hero, intro, and professor message</p>
      </div>

      {sections.map((section) => {
        const meta = sectionLabels[section.section] || { label: section.section, color: "var(--neon-pink)" };
        return (
          <div key={section.section} className="bg-zinc-900 border-2 border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-anton text-lg uppercase tracking-wider px-3 py-1 border-2 border-black shadow-[3px_3px_0_#000] text-black" style={{ background: meta.color }}>
                {meta.label}
              </h3>
              <button
                className={`px-4 py-2 font-anton text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2 ${
                  saved === section.section ? "bg-[var(--neon-green)] text-black" : "bg-[var(--neon-yellow)] text-black"
                }`}
                onClick={() => handleSave(section)}
                disabled={saving === section.section}
              >
                {saving === section.section ? (
                  <><RefreshCw size={14} className="animate-spin" /> Saving...</>
                ) : saved === section.section ? (
                  <>✓ Saved!</>
                ) : (
                  <><Save size={14} /> Save</>
                )}
              </button>
            </div>

            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Title</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={section.title} onChange={(e) => updateSection(section.section, { title: e.target.value })} />
            </div>

            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Content</label>
              <textarea className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" rows={4} value={section.content} onChange={(e) => updateSection(section.section, { content: e.target.value })} />
            </div>

            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={section.image} onChange={(e) => updateSection(section.section, { image: e.target.value })} placeholder="Optional image URL" />
            </div>

            {section.section === "intro" && (
              <div>
                <label className="block text-xs font-inter font-bold mb-2 text-zinc-500 uppercase">Carousel Images</label>
                <div className="flex gap-2 mb-3">
                  <input className="flex-1 bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={newImageUrls[section.section] || ""} onChange={(e) => setNewImageUrls({ ...newImageUrls, [section.section]: e.target.value })} placeholder="Paste image URL and click Add" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl(section.section))} />
                  <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[2px_2px_0_#000] hover:-translate-y-0.5 transition-transform" onClick={() => addImageUrl(section.section)}>Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(section.images || []).map((img, i) => (
                    <div key={i} className="relative w-20 h-20 border-2 border-zinc-700 overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center text-xs font-bold" onClick={() => removeImage(section.section, i)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Fields */}
            {Object.keys(section.metadata).length > 0 && (
              <div>
                <label className="block text-xs font-inter font-bold mb-2 text-zinc-500 uppercase">Metadata</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(section.metadata).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-[10px] uppercase tracking-wider mb-1 text-zinc-600 font-inter font-bold">{key}</label>
                      <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={value} onChange={(e) => updateMetadata(section.section, key, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
