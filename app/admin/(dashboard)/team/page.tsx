"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";

interface MemberData {
  _id?: string;
  name: string;
  role: string;
  position: string;
  image: string;
  imageTransform: { x: number; y: number; scale: number };
  socialLinks: { instagram?: string; linkedin?: string; email?: string };
  year: string;
  campus: string;
  order: number;
}

const emptyMember: MemberData = {
  name: "", role: "", position: "Post Bearer", image: "",
  imageTransform: { x: 0, y: 0, scale: 1 },
  socialLinks: { instagram: "", linkedin: "", email: "" },
  year: "", campus: "Patna", order: 0,
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberData>(emptyMember);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMembers(); }, []);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/team");
      if (res.ok) setMembers(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingMember._id ? `/api/team/${editingMember._id}` : "/api/team";
      const method = editingMember._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingMember) });
      if (res.ok) { await fetchMembers(); setIsEditing(false); setEditingMember(emptyMember); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) await fetchMembers();
    } catch (e) { console.error(e); }
  }

  const grouped = {
    "Post Bearer": members.filter((m) => m.position === "Post Bearer"),
    Creative: members.filter((m) => m.position === "Creative"),
    Technical: members.filter((m) => m.position === "Technical"),
    Management: members.filter((m) => m.position === "Management"),
  };

  const positionColors: Record<string, string> = {
    "Post Bearer": "var(--neon-yellow)",
    Creative: "var(--neon-pink)",
    Technical: "var(--neon-green)",
    Management: "var(--neon-cyan)",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Team</h1>
          <p className="text-sm font-inter text-zinc-500">Manage team members and post bearers</p>
        </div>
        <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={() => { setEditingMember(emptyMember); setIsEditing(true); }}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-green)] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingMember._id ? "Edit Member" : "New Member"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Name</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Role</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.role} onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })} placeholder="e.g. President" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Position</label>
              <select className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.position} onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}>
                <option value="Post Bearer">Post Bearer</option>
                <option value="Creative">Creative</option>
                <option value="Technical">Technical</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Year</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.year} onChange={(e) => setEditingMember({ ...editingMember, year: e.target.value })} placeholder="e.g. 2025" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Campus</label>
              <select className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.campus} onChange={(e) => setEditingMember({ ...editingMember, campus: e.target.value })}>
                <option value="Patna">Patna</option>
                <option value="Bihta">Bihta</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Order</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" type="number" value={editingMember.order} onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL (Bg-less)</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.image} onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })} placeholder="Image URL" />
            </div>
          </div>
          
          {/* Image Transform Controls */}
          {editingMember.image && (
            <div className="bg-black border-2 border-zinc-800 p-4">
              <label className="block text-xs font-inter font-bold mb-4 text-[var(--neon-pink)] uppercase tracking-widest">Image Positioning</label>
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">X Offset</span><span className="text-xs text-white">{editingMember.imageTransform?.x || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingMember.imageTransform?.x || 0} onChange={(e) => setEditingMember({ ...editingMember, imageTransform: { ...(editingMember.imageTransform || {x:0, y:0, scale:1}), x: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-yellow)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Y Offset</span><span className="text-xs text-white">{editingMember.imageTransform?.y || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingMember.imageTransform?.y || 0} onChange={(e) => setEditingMember({ ...editingMember, imageTransform: { ...(editingMember.imageTransform || {x:0, y:0, scale:1}), y: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-green)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Zoom (Scale)</span><span className="text-xs text-white">{editingMember.imageTransform?.scale || 1}</span></div>
                    <input type="range" min="0.5" max="2" step="0.05" value={editingMember.imageTransform?.scale || 1} onChange={(e) => setEditingMember({ ...editingMember, imageTransform: { ...(editingMember.imageTransform || {x:0, y:0, scale:1}), scale: parseFloat(e.target.value) } })} className="w-full accent-[var(--neon-pink)]" />
                  </div>
                </div>
                
                {/* Preview Box */}
                <div className="relative h-48 w-48 mx-auto bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-end justify-center rounded-lg">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                  <img 
                    src={editingMember.image} 
                    alt="Preview" 
                    className="relative z-10 w-full h-[90%] object-cover object-top drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                    style={{ transform: `translate(${editingMember.imageTransform?.x || 0}px, ${editingMember.imageTransform?.y || 0}px) scale(${editingMember.imageTransform?.scale || 1})` }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-center z-30">
                    <span className="text-xs font-anton text-white uppercase tracking-widest bg-black/50 px-2 py-1">Preview</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Instagram</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.socialLinks.instagram || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, instagram: e.target.value } })} placeholder="@handle" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">LinkedIn</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.socialLinks.linkedin || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, linkedin: e.target.value } })} placeholder="LinkedIn URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Email</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingMember.socialLinks.email || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, email: e.target.value } })} placeholder="email@example.com" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {/* Members List */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading...</div>
      ) : members.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12"><p className="text-zinc-500 font-inter">No team members yet.</p></div>
      ) : (
        Object.entries(grouped).map(([position, grpMembers]) =>
          grpMembers.length > 0 ? (
            <div key={position}>
              <h3 className="text-sm font-anton uppercase tracking-widest mb-3 px-2 py-1 inline-block border-2 border-black shadow-[2px_2px_0_#000]" style={{ background: positionColors[position] || "var(--neon-pink)", color: "black" }}>{position}</h3>
              <div className="space-y-2">
                {grpMembers.map((m) => (
                  <div key={m._id} className="bg-zinc-900 border-2 border-zinc-800 flex items-center gap-4 py-3 px-4 hover:border-zinc-600 transition-colors">
                    {m.image ? (
                      <img src={m.image} alt="" className="w-10 h-10 object-cover shrink-0 border border-zinc-700 filter grayscale" />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black shrink-0 border-2 border-black" style={{ background: positionColors[position] }}>
                        {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                         <h4 className="font-inter font-bold text-sm text-white truncate">{m.name}</h4>
                         <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm text-black ${m.campus === "Bihta" ? "bg-[var(--neon-cyan)]" : "bg-[var(--neon-yellow)]"}`}>
                           {m.campus || "Patna"}
                         </span>
                      </div>
                      <p className="text-xs text-zinc-500">{m.role}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { setEditingMember(m); setIsEditing(true); }}><Pencil size={14} /></button>
                      <button className="p-2 text-red-400 hover:text-red-300 transition-colors" onClick={() => m._id && handleDelete(m._id)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
