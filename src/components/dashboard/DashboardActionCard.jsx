import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardActionCard({ href, icon: Icon, title, text }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[22px] border border-[#e4d9ce] bg-[#fbf8f4] p-5 shadow-[0_10px_30px_rgba(47,34,26,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_16px_34px_rgba(47,34,26,0.08)] dark:border-[#30261f] dark:bg-[#15110f] dark:hover:border-orange-500/35"
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-orange-500/[0.06] blur-2xl transition group-hover:bg-orange-500/[0.1]" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
          <Icon size={19} />
        </div>
        <ArrowUpRight size={17} className="text-[#aa9a8f] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-white/30" />
      </div>
      <div className="relative mt-6">
        <h3 className="font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-[#807168] dark:text-white/42">{text}</p>
      </div>
    </Link>
  );
}
