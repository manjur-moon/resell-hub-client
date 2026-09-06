import {
  ArrowRight,
  BadgeCheck,
  Facebook,
  Github,
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

export default function Footer() {
  return (
    <footer className="border-t border-[#ded5cb] bg-[#f4f1eb] text-[#211a16] dark:border-[#2b211c] dark:bg-[#0d0a08] dark:text-white">
      <div className="border-b border-[#ded5cb] px-4 py-10 sm:px-6 lg:px-8 dark:border-white/8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#d8cdbf] bg-[radial-gradient(circle_at_88%_0%,rgba(249,115,22,0.14),transparent_34%),linear-gradient(135deg,#fffaf5_0%,#f7efe7_60%,#f1e5da_100%)] p-6 shadow-[0_20px_50px_rgba(35,24,18,0.08)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 dark:border-white/10 dark:bg-[radial-gradient(circle_at_85%_0%,rgba(249,115,22,0.18),transparent_32%),linear-gradient(135deg,#18120f_0%,#100c0a_68%,#0b0807_100%)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
              Give good products another life
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#211a16] sm:text-3xl dark:text-white">
              Have something valuable sitting unused?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6f6259] dark:text-white/55">
              Create a seller account, publish your listing and connect with buyers through one focused marketplace.
            </p>
          </div>

          <Link
            href="/register"
            className="mt-6 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.22)] transition hover:bg-orange-600 lg:mt-0"
          >
            Start selling
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-[0_8px_24px_rgba(249,115,22,0.16)]">
                <BadgeCheck size={21} />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em]">ReSell Hub</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b786d] dark:text-white/35">
                  Trusted resale marketplace
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-[#6f6259] dark:text-white/48">
              A trust-first marketplace for discovering quality pre-owned products, understanding seller context and completing purchases securely.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-orange-300/70 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 dark:border-orange-500/15 dark:bg-orange-500/8 dark:text-orange-200">
              <ShieldCheck size={14} />
              Verified seller signals · Secure checkout
            </div>

            <div className="mt-6 flex gap-2">
              {[Facebook, Linkedin, Github].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8cdbf] bg-[#fbf8f4] text-[#8a776c] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-white/38 dark:hover:border-orange-500/30 dark:hover:bg-orange-500/8 dark:hover:text-orange-300"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/38">
              Company
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#62554d] dark:text-white/52">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition hover:text-orange-600 dark:hover:text-orange-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/38">
              Marketplace
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#62554d] dark:text-white/52">
              {marketplaceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition hover:text-orange-600 dark:hover:text-orange-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b786d] dark:text-white/38">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#62554d] dark:text-white/52">
              <p className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                Dhaka, Bangladesh
              </p>
              <p className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                support@resellhub.com
              </p>
              <p className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                +880 1712 345678
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-[#ded5cb] pt-6 text-xs text-[#8b786d] sm:flex-row sm:items-center sm:justify-between dark:border-white/8 dark:text-white/32">
          <p>© {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
          <p>Buy better · Sell smarter · Keep useful products moving.</p>
        </div>
      </div>
    </footer>
  );
}
