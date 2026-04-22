"use client";

import { useState, useEffect } from "react";
import { Trash2, Eye, Mail, Phone, Search, Filter } from "lucide-react";

interface Submission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  message: string;
  status: "new" | "reviewed" | "contacted";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-[var(--neon-green)] text-black",
  reviewed: "bg-[var(--neon-yellow)] text-black",
  contacted: "bg-[var(--neon-pink)] text-white",
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      const res = await fetch("/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (e) {
      console.error("Failed to fetch submissions:", e);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: status as Submission["status"] } : s))
        );
        if (selectedSubmission?._id === id) {
          setSelectedSubmission((prev) => prev ? { ...prev, status: status as Submission["status"] } : null);
        }
      }
    } catch (e) {
      console.error("Failed to update:", e);
    }
  }

  async function deleteSubmission(id: string) {
    if (!confirm("Delete this submission?")) return;
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s._id !== id));
        if (selectedSubmission?._id === id) setSelectedSubmission(null);
      }
    } catch (e) {
      console.error("Failed to delete:", e);
    }
  }

  const filtered = submissions.filter((s) => {
    const matchesFilter = filter === "all" || s.status === filter;
    const matchesSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.branch.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    reviewed: submissions.filter((s) => s.status === "reviewed").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500 font-inter font-bold animate-pulse">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-anton text-white uppercase tracking-wider mb-2">
          Submissions
        </h1>
        <p className="text-sm font-inter font-bold text-zinc-500">
          Join requests and contact form entries
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(["all", "new", "reviewed", "contacted"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`p-4 border-2 text-left transition-all ${
              filter === key
                ? "border-white bg-zinc-900 shadow-[4px_4px_0_var(--neon-yellow)]"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
            }`}
          >
            <p className="text-2xl font-anton text-white">{counts[key]}</p>
            <p className="text-xs font-inter font-bold text-zinc-500 uppercase tracking-wider">
              {key === "all" ? "Total" : key}
            </p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or branch..."
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border-2 border-zinc-800 text-white font-inter font-bold text-sm focus:border-[var(--neon-yellow)] outline-none"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-3 border-2 border-zinc-800 bg-zinc-900 text-zinc-500">
          <Filter size={14} />
          <span className="text-xs font-inter font-bold uppercase">{filtered.length} results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-zinc-800">
              <p className="text-zinc-500 font-inter font-bold">No submissions found</p>
            </div>
          ) : (
            filtered.map((sub) => (
              <div
                key={sub._id}
                onClick={() => setSelectedSubmission(sub)}
                className={`p-4 border-2 cursor-pointer transition-all hover:border-zinc-600 ${
                  selectedSubmission?._id === sub._id
                    ? "border-[var(--neon-yellow)] bg-zinc-900 shadow-[4px_4px_0_var(--neon-yellow)]"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-anton text-lg text-white truncate">{sub.name}</h3>
                      <span className={`px-2 py-0.5 text-[10px] font-inter font-bold uppercase ${statusColors[sub.status]}`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-inter font-bold text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Mail size={10} /> {sub.email}
                      </span>
                      {sub.year && <span>{sub.year}</span>}
                      {sub.branch && <span>{sub.branch}</span>}
                    </div>
                    {sub.message && (
                      <p className="mt-2 text-xs text-zinc-400 font-inter line-clamp-2">{sub.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteSubmission(sub._id); }}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] font-inter text-zinc-600 mt-2">
                  {new Date(sub.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedSubmission ? (
            <div className="sticky top-8 border-2 border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-anton text-xl text-white uppercase">{selectedSubmission.name}</h3>
                <span className={`px-2 py-0.5 text-[10px] font-inter font-bold uppercase ${statusColors[selectedSubmission.status]}`}>
                  {selectedSubmission.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm font-inter font-bold text-zinc-300">
                  <Mail size={14} className="text-zinc-500" />
                  <a href={`mailto:${selectedSubmission.email}`} className="hover:text-[var(--neon-yellow)] transition-colors">
                    {selectedSubmission.email}
                  </a>
                </div>
                {selectedSubmission.phone && (
                  <div className="flex items-center gap-2 text-sm font-inter font-bold text-zinc-300">
                    <Phone size={14} className="text-zinc-500" />
                    <a href={`tel:${selectedSubmission.phone}`} className="hover:text-[var(--neon-yellow)] transition-colors">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}
                {selectedSubmission.year && (
                  <p className="text-sm font-inter font-bold text-zinc-400">
                    <span className="text-zinc-600">Year:</span> {selectedSubmission.year}
                  </p>
                )}
                {selectedSubmission.branch && (
                  <p className="text-sm font-inter font-bold text-zinc-400">
                    <span className="text-zinc-600">Branch:</span> {selectedSubmission.branch}
                  </p>
                )}
              </div>

              {selectedSubmission.message && (
                <div className="mb-6">
                  <p className="text-xs font-inter font-bold text-zinc-600 uppercase mb-1">Message</p>
                  <div className="p-3 bg-zinc-800 border border-zinc-700 text-sm font-inter text-zinc-300 leading-relaxed">
                    {selectedSubmission.message}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-inter font-bold text-zinc-600 uppercase mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {(["new", "reviewed", "contacted"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedSubmission._id, status)}
                      className={`px-3 py-1.5 text-xs font-inter font-bold uppercase border-2 transition-all ${
                        selectedSubmission.status === status
                          ? `${statusColors[status]} border-black shadow-[2px_2px_0_#000]`
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] font-inter text-zinc-600 mt-4">
                Submitted: {new Date(selectedSubmission.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-zinc-800 p-8 text-center">
              <Eye size={32} className="mx-auto text-zinc-700 mb-3" />
              <p className="text-sm font-inter font-bold text-zinc-600">
                Select a submission to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
