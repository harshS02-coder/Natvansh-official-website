"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Code2,
  ChevronLeft,
  Images,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/developers", label: "Developers", icon: Code2 },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
];

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show admin layout on sign-in page
  if (pathname?.includes("sign-in")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r-4 border-zinc-800 bg-black" style={{ minHeight: "100vh" }}>
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-sm mb-4 text-zinc-500 hover:text-[var(--neon-green)] transition-colors font-inter font-bold">
              <ChevronLeft size={16} />
              Back to Site
            </Link>
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Natvansh" className="w-10 h-10 object-contain" />
              <div>
                <h2 className="text-xl font-anton text-white uppercase tracking-wider">Admin</h2>
                <p className="text-[10px] font-inter font-bold uppercase tracking-widest text-zinc-600">
                  Natvansh CMS
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 font-inter font-bold text-sm transition-all duration-200 border-2 ${
                    isActive
                      ? "bg-[var(--neon-yellow)] text-black border-black shadow-[4px_4px_0_#000]"
                      : "text-zinc-400 border-transparent hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="pt-4 border-t-2 border-dashed border-zinc-800">
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
              <span className="text-sm font-inter font-bold text-zinc-400">
                Admin
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b-2 border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Natvansh" className="w-8 h-8 object-contain" />
            <h2 className="text-lg font-anton text-white uppercase tracking-wider">Admin</h2>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-2 border-2 ${pathname === link.href ? "bg-[var(--neon-yellow)] text-black border-black" : "text-zinc-500 border-transparent"}`}
              >
                <link.icon size={16} />
              </Link>
            ))}
            <UserButton appearance={{ elements: { avatarBox: "w-6 h-6" } }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen lg:p-8 p-4 pt-20 lg:pt-8 overflow-auto bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
