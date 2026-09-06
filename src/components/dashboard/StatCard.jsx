export default function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="dashboard-card group relative overflow-hidden p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-orange-500/[0.07] blur-2xl transition group-hover:bg-orange-500/[0.11]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d7d72] dark:text-white/35">
            {title}
          </p>
          {Icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-200/80 bg-orange-50 text-orange-600 shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-orange-300 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
              <Icon size={19} />
            </div>
          )}
        </div>

        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#211a16] dark:text-white sm:text-[2rem]">
          {value}
        </h3>

        <div className="mt-4 flex items-center gap-2 border-t border-[#ebe2d9] pt-3 dark:border-white/[0.07]">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <p className="text-xs leading-5 text-[#807168] dark:text-white/42">{description}</p>
        </div>
      </div>
    </div>
  );
}
