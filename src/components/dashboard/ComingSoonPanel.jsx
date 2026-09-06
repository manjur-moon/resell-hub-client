import Link from "next/link";

export default function ComingSoonPanel({ title, description, phase }) {
  return (
    <div className="dashboard-hero max-w-3xl">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-300">✦</div>
      <p className="eyebrow">Coming soon</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-white">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-white/58">{description}</p>
      <div className="mt-5 rounded-2xl border border-orange-400/15 bg-orange-500/10 px-4 py-3 text-sm font-medium text-orange-200">
        This page will be implemented in {phase}.
      </div>
      <Link href="/dashboard" className="btn-primary mt-6">
        Back to Dashboard
      </Link>
    </div>
  );
}
