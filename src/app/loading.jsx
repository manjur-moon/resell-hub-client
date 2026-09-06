import { BadgeCheck } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c0a] px-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.11),transparent_28%)]" />
      <div className="relative text-center" role="status" aria-live="polite">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-[0_12px_36px_rgba(249,115,22,0.2)]">
          <BadgeCheck size={23} />
        </div>
        <div className="mx-auto mt-6 h-8 w-8 animate-spin rounded-full border-2 border-white/12 border-t-orange-400" />
        <p className="mt-5 text-sm font-semibold text-white/75">Loading ReSell Hub</p>
        <p className="mt-1 text-xs text-white/35">Preparing your marketplace view...</p>
      </div>
    </main>
  );
}
