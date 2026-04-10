"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Globe } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/ui/SocialIcons";

interface DevData {
  _id?: string;
  name: string;
  role: string;
  image: string;
  imageTransform: { x: number; y: number; scale: number };
  github: string;
  linkedin: string;
  portfolio: string;
  order: number;
}

const emptyDev: DevData = {
  name: "", role: "", image: "", github: "", linkedin: "", portfolio: "", order: 0,
  imageTransform: { x: 0, y: 0, scale: 1 },
};

export default function AdminDevelopersPage() {
  const [devs, setDevs] = useState<DevData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDev, setEditingDev] = useState<DevData>(emptyDev);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDevs(); }, []);

  async function fetchDevs() {
    try {
      const res = await fetch("/api/developers");
      if (res.ok) setDevs(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingDev._id ? `/api/developers/${editingDev._id}` : "/api/developers";
      const method = editingDev._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingDev) });
      if (res.ok) { await fetchDevs(); setIsEditing(false); setEditingDev(emptyDev); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this developer?")) return;
    try {
      const res = await fetch(`/api/developers/${id}`, { method: "DELETE" });
      if (res.ok) await fetchDevs();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Developers</h1>
          <p className="text-sm font-inter text-zinc-500">Manage developer profiles</p>
        </div>
        <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={() => { setEditingDev(emptyDev); setIsEditing(true); }}>
          <Plus size={16} /> Add Developer
        </button>
      </div>

      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-green)] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingDev._id ? "Edit Developer" : "New Developer"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Name</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.name} onChange={(e) => setEditingDev({ ...editingDev, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Role</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.role} onChange={(e) => setEditingDev({ ...editingDev, role: e.target.value })} placeholder="e.g. Full-Stack Developer" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">GitHub</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.github} onChange={(e) => setEditingDev({ ...editingDev, github: e.target.value })} placeholder="GitHub URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">LinkedIn</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.linkedin} onChange={(e) => setEditingDev({ ...editingDev, linkedin: e.target.value })} placeholder="LinkedIn URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Portfolio</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.portfolio} onChange={(e) => setEditingDev({ ...editingDev, portfolio: e.target.value })} placeholder="Portfolio URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Order</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" type="number" value={editingDev.order} onChange={(e) => setEditingDev({ ...editingDev, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL (Bg-less)</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingDev.image} onChange={(e) => setEditingDev({ ...editingDev, image: e.target.value })} placeholder="Image URL" />
            </div>
          </div>
          
          {/* Image Transform Controls */}
          {editingDev.image && (
            <div className="bg-black border-2 border-zinc-800 p-4">
              <label className="block text-xs font-inter font-bold mb-4 text-[var(--neon-pink)] uppercase tracking-widest">Image Positioning</label>
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">X Offset</span><span className="text-xs text-white">{editingDev.imageTransform?.x || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingDev.imageTransform?.x || 0} onChange={(e) => setEditingDev({ ...editingDev, imageTransform: { ...(editingDev.imageTransform || {x:0, y:0, scale:1}), x: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-yellow)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Y Offset</span><span className="text-xs text-white">{editingDev.imageTransform?.y || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingDev.imageTransform?.y || 0} onChange={(e) => setEditingDev({ ...editingDev, imageTransform: { ...(editingDev.imageTransform || {x:0, y:0, scale:1}), y: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-green)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Zoom (Scale)</span><span className="text-xs text-white">{editingDev.imageTransform?.scale || 1}</span></div>
                    <input type="range" min="0.5" max="2" step="0.05" value={editingDev.imageTransform?.scale || 1} onChange={(e) => setEditingDev({ ...editingDev, imageTransform: { ...(editingDev.imageTransform || {x:0, y:0, scale:1}), scale: parseFloat(e.target.value) } })} className="w-full accent-[var(--neon-pink)]" />
                  </div>
                </div>
                
                {/* Preview Box */}
                <div className="relative h-48 w-48 mx-auto bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-end justify-center rounded-lg">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                  <img 
                    src={editingDev.image} 
                    alt="Preview" 
                    className="relative z-10 w-full h-[90%] object-cover object-top drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                    style={{ transform: `translate(${editingDev.imageTransform?.x || 0}px, ${editingDev.imageTransform?.y || 0}px) scale(${editingDev.imageTransform?.scale || 1})` }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-center z-30">
                    <span className="text-xs font-anton text-white uppercase tracking-widest bg-black/50 px-2 py-1">Preview</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading...</div>
      ) : devs.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12"><p className="text-zinc-500 font-inter">No developers yet.</p></div>
      ) : (
        <div className="space-y-3">
          {devs.map((dev) => (
            <div key={dev._id} className="bg-zinc-900 border-2 border-zinc-800 flex items-center gap-4 py-3 px-4 hover:border-zinc-600 transition-colors">
              {dev.image ? (
                <img src={dev.image} alt="" className="w-10 h-10 object-cover shrink-0 border border-zinc-700 filter grayscale" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black shrink-0 bg-[var(--neon-cyan)] border-2 border-black">
                  {dev.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-inter font-bold text-sm text-white truncate">{dev.name}</h4>
                <p className="text-xs text-zinc-500">{dev.role}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {dev.github && <a href={dev.github} target="_blank" rel="noopener noreferrer" className="p-1 text-zinc-500 hover:text-white"><IconGithub size={14} /></a>}
                {dev.linkedin && <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 text-zinc-500 hover:text-white"><IconLinkedin size={14} /></a>}
                {dev.portfolio && <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="p-1 text-zinc-500 hover:text-white"><Globe size={14} /></a>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { setEditingDev(dev); setIsEditing(true); }}><Pencil size={14} /></button>
                <button className="p-2 text-red-400 hover:text-red-300 transition-colors" onClick={() => dev._id && handleDelete(dev._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
