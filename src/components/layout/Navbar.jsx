"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  ArrowRight,
  BadgeCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "../shared/ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      toast.success("Logged out successfully.");
    } catch (e) {
      toast.error(e.message || "Logout failed.");
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const desktopLinkClass = (href) => {
    if (isHome) {
      return isActive(href)
        ? "text-[#211a16] dark:text-white"
        : "text-[#6f6259] hover:text-[#211a16] dark:text-white/62 dark:hover:text-white";
    }

    return isActive(href)
      ? "text-[#211a16] dark:text-white"
      : "text-[#74655c] hover:text-[#211a16] dark:text-[#b8a79c] dark:hover:text-white";
  };

  return (
    <header
      className={
        isHome
          ? `fixed inset-x-0 top-0 z-50 border-b text-[#211a16] backdrop-blur-xl transition-all duration-300 dark:text-white ${
              isScrolled
                ? "border-[#dfd5ca]/95 bg-[#fbf8f4]/96 shadow-[0_10px_30px_rgba(35,24,18,0.08)] dark:border-[#312720] dark:bg-[#0f0c0a]/94 dark:shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
                : "border-[#dfd5ca]/70 bg-[#fbf8f4]/72 shadow-[0_1px_0_rgba(75,58,47,0.03)] dark:border-white/10 dark:bg-[#0f0c0a]/24"
            }`
          : "sticky top-0 z-50 border-b border-[#dfd5ca]/90 bg-[#fbf8f4]/96 shadow-[0_8px_24px_rgba(35,24,18,0.04)] backdrop-blur-xl dark:border-[#312720] dark:bg-[#0f0c0a]/94 dark:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      }
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="ReSell Hub home">
          <div
            className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition duration-200 group-hover:-translate-y-0.5 ${
              isHome
                ? "border border-[#d8cdc2] bg-[#fffaf4]/78 text-orange-500 shadow-[0_8px_24px_rgba(35,24,18,0.08)] backdrop-blur dark:border-white/15 dark:bg-white/8 dark:text-orange-400 dark:shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                : "border border-orange-400/20 bg-orange-500 text-white shadow-[0_8px_22px_rgba(249,115,22,0.2)]"
            }`}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_45%)]" />
            <BadgeCheck size={21} strokeWidth={2.2} className="relative" />
          </div>
          <div className="leading-tight">
            <p
              className={`text-[17px] font-semibold tracking-[-0.02em] ${
                isHome ? "text-[#211a16] dark:text-white" : "text-[#211a16] dark:text-white"
              }`}
            >
              ReSell Hub
            </p>
            <p
              className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                isHome ? "text-[#99877b] dark:text-white/40" : "text-[#99877b] dark:text-[#8f7d72]"
              }`}
            >
              Trusted resale marketplace
            </p>
          </div>
        </Link>

        <div className="hidden h-full items-center lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative flex h-full items-center px-4 text-sm font-medium transition-colors ${desktopLinkClass(
                link.href,
              )}`}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className={`absolute inset-x-4 bottom-[17px] h-0.5 rounded-full ${
                    isHome ? "bg-orange-400" : "bg-orange-500"
                  }`}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle overlay={isHome && !isScrolled} />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={
                  isHome
                    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#d8cdc2] bg-[#fffaf4]/78 px-4 py-2.5 text-sm font-semibold text-[#211a16] backdrop-blur transition hover:border-[#cbb8a7] hover:bg-white/85 dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                    : "btn-secondary"
                }
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={
                  isHome
                    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400 dark:bg-[#fbf8f4] dark:text-[#211a16] dark:hover:bg-orange-50"
                    : "btn-primary"
                }
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={
                  isHome
                    ? "inline-flex min-h-10 items-center justify-center rounded-full border border-[#d8cdc2] bg-[#fffaf4]/78 px-4 py-2.5 text-sm font-semibold text-[#211a16] backdrop-blur transition hover:border-[#cbb8a7] hover:bg-white/85 dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                    : "btn-secondary"
                }
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className={
                  isHome
                    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 dark:bg-[#fbf8f4] dark:text-[#211a16] dark:hover:bg-orange-50"
                    : "btn-primary"
                }
              >
                Start selling
                <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm lg:hidden ${
            isHome
              ? "border-[#d8cdc2] bg-[#fffaf4]/78 text-[#211a16] backdrop-blur-md dark:border-white/15 dark:bg-white/8 dark:text-white"
              : "border-[#cfc2b7] bg-[#fbf8f4] text-[#584940] dark:border-[#57483f] dark:bg-[#17120f] dark:text-[#e2d7ce]"
          }`}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          className={`border-t px-4 py-4 lg:hidden ${
            isHome
              ? "border-[#ded5cb] bg-[#fbf8f4]/98 text-[#211a16] backdrop-blur-xl dark:border-white/10 dark:bg-[#15110f]/98 dark:text-white"
              : "border-[#ded5cb] bg-[#fbf8f4] dark:border-[#3a2f28] dark:bg-[#0f0c0a]"
          }`}
        >
          <div className="mx-auto max-w-7xl space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                onClick={() => setOpen(false)}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isHome
                    ? isActive(link.href)
                      ? "bg-orange-50 text-orange-700 dark:bg-white/8 dark:text-white"
                      : "text-[#5d4e46] hover:bg-[#f1e9df] hover:text-[#211a16] dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                    : isActive(link.href)
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"
                      : "text-[#584940] hover:bg-[#eee7df] dark:text-[#c9bbb1] dark:hover:bg-[#17120f]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                )}
              </Link>
            ))}

            <div
              className={`mt-3 flex flex-wrap gap-2 border-t pt-4 ${
                isHome ? "border-[#ded5cb] dark:border-white/10" : "border-[#ded5cb] dark:border-[#3a2f28]"
              }`}
            >
              <ThemeToggle overlay={isHome && !isScrolled} />
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className={
                      isHome
                        ? "inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-[#d8cdc2] bg-[#fffaf4]/78 px-4 py-2.5 text-sm font-semibold text-[#211a16] dark:border-white/15 dark:bg-white/8 dark:text-white"
                        : "btn-secondary flex-1"
                    }
                  >
                    <User size={16} />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={
                      isHome
                        ? "inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white dark:bg-[#fbf8f4] dark:text-[#211a16]"
                        : "btn-primary flex-1"
                    }
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={
                      isHome
                        ? "inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-[#d8cdc2] bg-[#fffaf4]/78 px-4 py-2.5 text-sm font-semibold text-[#211a16] dark:border-white/15 dark:bg-white/8 dark:text-white"
                        : "btn-secondary flex-1"
                    }
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className={
                      isHome
                        ? "inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white dark:bg-[#fbf8f4] dark:text-[#211a16]"
                        : "btn-primary flex-1"
                    }
                  >
                    Start selling
                    <ArrowRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
