"use client";

import { useAuth } from "@/providers/AuthProvider";
import { BadgeCheck, LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "../shared/ThemeToggle";

const links = [
  { label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Categories", href: "/categories" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => { try { await logout(); toast.success("Logged out successfully."); } catch (e) { toast.error(e.message || "Logout failed."); } };
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <Link href="/" className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white"><BadgeCheck size={22}/></div><div><p className="text-lg font-black text-slate-950 dark:text-white">ReSell Hub</p><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Marketplace</p></div></Link>
      <div className="hidden items-center gap-7 lg:flex">{links.map(link => <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-600 transition hover:text-orange-600 dark:text-slate-300">{link.label}</Link>)}</div>
      <div className="hidden items-center gap-3 lg:flex"><ThemeToggle/>{user ? <><Link href="/dashboard" className="btn-secondary"><LayoutDashboard size={17}/>Dashboard</Link><button onClick={handleLogout} className="btn-primary"><LogOut size={17}/>Logout</button></> : <><Link href="/login" className="btn-secondary">Login</Link><Link href="/register" className="btn-primary">Register</Link></>}</div>
      <button onClick={() => setOpen(v => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 lg:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </nav>
    {open && <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-3">{links.map(link => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 dark:text-slate-300">{link.label}</Link>)}<div className="flex gap-3 pt-3"><ThemeToggle/>{user ? <><Link href="/dashboard" className="btn-secondary flex-1"><User size={17}/>Dashboard</Link><button onClick={handleLogout} className="btn-primary flex-1">Logout</button></> : <><Link href="/login" className="btn-secondary flex-1">Login</Link><Link href="/register" className="btn-primary flex-1">Register</Link></>}</div></div></div>}
  </header>;
}
