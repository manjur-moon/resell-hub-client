import {
  ArrowRight,
  BadgeCheck,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const marketplaceLinks = [
  { label: "Browse listings", href: "/products" },
  { label: "Explore categories", href: "/categories" },
  { label: "Start selling", href: "/register" },
  { label: "Sign in", href: "/login" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-manjurul-islam-616701295",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/manjur-moon",
    icon: Github,
  },
  
];

export default function Footer() {
  return (
    <footer className="border-t border-[#ded5cb] bg-[#f7f3ee] text-[#211a16] dark:border-white/8 dark:bg-[#0d0a08] dark:text-white">
      <div className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 rounded-[22px] border border-[#ddd2c6] bg-[#fffaf5] px-5 py-4 shadow-[0_10px_30px_rgba(35,24,18,0.045)] sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.2)]">
                <BadgeCheck size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-[-0.02em]">ReSell Hub</p>
                <p className="mt-0.5 text-xs text-[#74665d] dark:text-white/45">
                  Trusted resale marketplace for better second-hand buying and selling.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-orange-700 dark:border-orange-500/15 dark:bg-orange-500/8 dark:text-orange-200">
                <ShieldCheck size={13} />
                Verified sellers · Secure checkout
              </span>
              <Link
                href="/register"
                className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
              >
                Start selling
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="mt-7 grid gap-7 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.95fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <BadgeCheck size={18} />
                </div>
                <div>
                  <p className="font-semibold tracking-[-0.02em]">ReSell Hub</p>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a8980] dark:text-white/30">
                    Trusted resale marketplace
                  </p>
                </div>
              </div>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#6f6259] dark:text-white/48">
                Discover quality pre-owned products, understand seller context and complete purchases with confidence.
              </p>

              <div className="mt-4 flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8cdbf] bg-[#fbf8f4] text-[#7d6c62] transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-white/42 dark:hover:border-orange-500/30 dark:hover:bg-orange-500/8 dark:hover:text-orange-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/35">
                Company
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-[#62554d] dark:text-white/52 md:grid-cols-1">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit transition hover:text-orange-600 dark:hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/35">
                Marketplace
              </h3>
              <div className="mt-3 grid gap-2.5 text-sm text-[#62554d] dark:text-white/52">
                {marketplaceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit transition hover:text-orange-600 dark:hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/35">
                Contact
              </h3>
              <div className="mt-3 space-y-2.5 text-sm text-[#62554d] dark:text-white/52">
                <p className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                  Dhaka, Bangladesh
                </p>
                <a
                  href="mailto:support@resellhub.com"
                  className="flex w-fit items-start gap-2.5 transition hover:text-orange-600 dark:hover:text-orange-300"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                  support@resellhub.com
                </a>
                <a
                  href="tel:+8801712345678"
                  className="flex w-fit items-start gap-2.5 transition hover:text-orange-600 dark:hover:text-orange-300"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                  +880 1712 345678
                </a>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-[#ded5cb] pt-4 text-[11px] text-[#8b786d] sm:flex-row sm:items-center sm:justify-between dark:border-white/8 dark:text-white/30">
            <p>© {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
            <p>Buy better · Sell smarter · Keep useful products moving.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
