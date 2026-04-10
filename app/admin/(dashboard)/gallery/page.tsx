"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";

interface GalleryData {
  _id?: string;
  title: string;
  image: string;
  category: string;
  order: number;
}

const emptyImage: GalleryData = {
  title: "",
  image: "",
  category: "General",
  order: 0,
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryData>(emptyImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchImages(); }, []);

  async function fetchImages() {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) setImages(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingImage._id ? `/api/gallery/${editingImage._id}` : "/api/gallery";
      const method = editingImage._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingImage) });
      if (res.ok) { await fetchImages(); setIsEditing(false); setEditingImage(emptyImage); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) await fetchImages();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Gallery</h1>
          <p className="text-sm font-inter text-zinc-500">Manage gallery images</p>
        </div>
        <button
          className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2"
          onClick={() => { setEditingImage(emptyImage); setIsEditing(true); }}
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-green)] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingImage._id ? "Edit Image" : "New Image"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Title</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingImage.title} onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })} placeholder="Image title" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Category</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingImage.category} onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })} placeholder="e.g. Drama, Film, Workshop" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingImage.image} onChange={(e) => setEditingImage({ ...editingImage, image: e.target.value })} placeholder="Paste image URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Order</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" type="number" value={editingImage.order} onChange={(e) => setEditingImage({ ...editingImage, order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          {editingImage.image && (
            <div className="border-2 border-zinc-700 p-2 inline-block">
              <img src={editingImage.image} alt="Preview" className="w-40 h-28 object-cover" />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading...</div>
      ) : images.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12">
          <p className="text-zinc-500 font-inter">No gallery images yet. Add your first!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="bg-zinc-900 border-2 border-zinc-800 group relative overflow-hidden">
              {img.image ? (
                <img src={img.image} alt={img.title} className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-zinc-800">
                  <ImageIcon size={32} className="text-zinc-600" />
                </div>
              )}
              <div className="p-2 border-t-2 border-zinc-800">
                <p className="text-xs font-anton text-white uppercase truncate">{img.title}</p>
                <p className="text-[10px] text-zinc-500">{img.category}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-black/80 text-white border border-zinc-600 hover:bg-[var(--neon-yellow)] hover:text-black transition-colors" onClick={() => { setEditingImage(img); setIsEditing(true); }}><Pencil size={12} /></button>
                <button className="p-1.5 bg-black/80 text-red-400 border border-zinc-600 hover:bg-red-500 hover:text-white transition-colors" onClick={() => img._id && handleDelete(img._id)}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
