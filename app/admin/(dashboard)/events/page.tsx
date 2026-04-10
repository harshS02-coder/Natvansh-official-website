"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Star, Image as ImageIcon } from "lucide-react";

interface EventData {
  _id?: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  images: string[];
  featured: boolean;
}

const emptyEvent: EventData = {
  title: "",
  description: "",
  date: "",
  venue: "",
  category: "Drama",
  images: [],
  featured: false,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData>(emptyEvent);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      if (res.ok) setEvents(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingEvent._id ? `/api/events/${editingEvent._id}` : "/api/events";
      const method = editingEvent._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingEvent) });
      if (res.ok) { await fetchEvents(); setIsEditing(false); setEditingEvent(emptyEvent); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) await fetchEvents();
    } catch (e) { console.error(e); }
  }

  function addImageUrl() {
    if (newImageUrl.trim()) {
      setEditingEvent({ ...editingEvent, images: [...editingEvent.images, newImageUrl.trim()] });
      setNewImageUrl("");
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Events</h1>
          <p className="text-sm font-inter text-zinc-500">Manage drama festivals, workshops, and competitions</p>
        </div>
        <button
          className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2"
          onClick={() => { setEditingEvent(emptyEvent); setIsEditing(true); }}
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-green)] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingEvent._id ? "Edit Event" : "New Event"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Title</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} placeholder="Event title" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Date</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} placeholder="e.g. March 15-17, 2025" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Venue</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingEvent.venue} onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })} placeholder="Event venue" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Category</label>
              <select className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingEvent.category} onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}>
                <option value="Drama">Drama</option>
                <option value="Film">Film</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Description</label>
            <textarea className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" rows={4} value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} placeholder="Event description..." />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editingEvent.featured} onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm font-inter text-zinc-400">Featured Event</span>
            </label>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-xs font-inter font-bold mb-2 text-zinc-500 uppercase">Images</label>
            <div className="flex gap-2 mb-3">
              <input className="flex-1 bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Paste image URL and click Add" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())} />
              <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[2px_2px_0_#000] hover:-translate-y-0.5 transition-transform" onClick={addImageUrl}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editingEvent.images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 border-2 border-zinc-700 overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center text-xs font-bold" onClick={() => setEditingEvent({ ...editingEvent, images: editingEvent.images.filter((_, idx) => idx !== i) })}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12">
          <p className="text-zinc-500 font-inter">No events yet. Add your first event!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event._id} className="bg-zinc-900 border-2 border-zinc-800 flex items-center gap-4 p-4 hover:border-zinc-600 transition-colors">
              {event.images[0] ? (
                <img src={event.images[0]} alt="" className="w-16 h-16 object-cover shrink-0 border-2 border-zinc-700 filter grayscale hover:grayscale-0 transition-all" />
              ) : (
                <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-zinc-800 border-2 border-zinc-700">
                  <ImageIcon size={20} className="text-zinc-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-anton text-sm text-white uppercase truncate">{event.title}</h4>
                  {event.featured && <Star size={14} fill="var(--neon-yellow)" className="text-[var(--neon-yellow)]" />}
                </div>
                <p className="text-xs text-zinc-500 font-inter">{event.date} · {event.venue}</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-anton uppercase bg-zinc-800 text-zinc-400 border border-zinc-700 shrink-0">{event.category}</span>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { setEditingEvent(event); setIsEditing(true); }}><Pencil size={14} /></button>
                <button className="p-2 text-red-400 hover:text-red-300 transition-colors" onClick={() => event._id && handleDelete(event._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
