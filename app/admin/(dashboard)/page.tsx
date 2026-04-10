"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, FileText, Code2, Activity, Images } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Events", description: "Drama festivals, workshops, competitions", icon: Calendar, href: "/admin/events", color: "var(--neon-pink)" },
  { title: "Team", description: "Team members and post bearers", icon: Users, href: "/admin/team", color: "var(--neon-green)" },
  { title: "Content", description: "Hero, intro, professor sections", icon: FileText, href: "/admin/content", color: "var(--neon-yellow)" },
  { title: "Developers", description: "Developer profiles", icon: Code2, href: "/admin/developers", color: "var(--neon-cyan)" },
  { title: "Gallery", description: "Gallery images", icon: Images, href: "/admin/gallery", color: "var(--neon-pink)" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [events, team, devs, gallery] = await Promise.all([
          fetch("/api/events").then(r => r.ok ? r.json() : []),
          fetch("/api/team").then(r => r.ok ? r.json() : []),
          fetch("/api/developers").then(r => r.ok ? r.json() : []),
          fetch("/api/gallery").then(r => r.ok ? r.json() : []),
        ]);
        setCounts({
          Events: events.length,
          Team: team.length,
          Developers: devs.length,
          Gallery: gallery.length,
          Content: 3,
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b-2 border-dashed border-zinc-800 pb-6">
        <h1 className="text-4xl font-anton text-white uppercase tracking-wider drop-shadow-[4px_4px_0_#000]">
          Dashboard
        </h1>
        <p className="mt-2 font-inter font-bold text-zinc-500">
          Welcome to the Natvansh admin panel. Manage your club&apos;s digital presence.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, i) => (
          <Link
            key={action.title}
            href={action.href}
            className={`bg-zinc-900 border-2 border-zinc-800 p-6 group hover:border-[var(--neon-yellow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transform ${i % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000]"
                style={{ background: action.color }}
              >
                <action.icon size={24} className="text-black" />
              </div>
              <span className="text-3xl font-anton text-white">
                {counts[action.title] ?? "—"}
              </span>
            </div>
            <h3 className="font-anton text-lg text-white uppercase tracking-wider group-hover:text-[var(--neon-yellow)] transition-colors">
              {action.title}
            </h3>
            <p className="text-xs font-inter text-zinc-500 mt-1">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-zinc-900 border-2 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--neon-green)] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
            <Activity size={20} className="text-black" />
          </div>
          <h3 className="font-anton text-xl text-white uppercase tracking-wider">
            Getting Started
          </h3>
        </div>
        <div className="space-y-3 text-sm font-inter text-zinc-400">
          <p>👋 Welcome to the admin panel! Here&apos;s how to get started:</p>
          <ul className="space-y-2 ml-4 list-disc">
            <li><strong className="text-white">Events:</strong> Add your club events with images, dates, and descriptions.</li>
            <li><strong className="text-white">Team:</strong> Set up post bearers and team members with their roles and photos.</li>
            <li><strong className="text-white">Content:</strong> Edit the hero text, club introduction, and professor&apos;s message.</li>
            <li><strong className="text-white">Gallery:</strong> Upload and manage gallery images shown on the public gallery page.</li>
            <li><strong className="text-white">Developers:</strong> Add developer credits with their GitHub/LinkedIn profiles.</li>
          </ul>
          <p className="mt-4 text-xs text-zinc-600">
            💡 All changes are saved to the database and reflected on the live site immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
