export default function SkeletonCard() {
  return (
    <div className="h-full animate-pulse overflow-hidden rounded-xl border border-[#ded5cb] bg-[#fbf8f4] shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-[#3a2f28] dark:bg-[#17120f]">
      <div className="aspect-[4/3] bg-[#ddd3c9] dark:bg-[#2a211c]" />
      <div className="p-4">
        <div className="h-3 w-1/3 rounded bg-[#ddd3c9] dark:bg-[#2a211c]" />
        <div className="mt-3 h-5 w-3/4 rounded bg-[#ddd3c9] dark:bg-[#2a211c]" />
        <div className="mt-3 h-4 w-full rounded bg-[#eee7df] dark:bg-[#2a211c]" />
        <div className="mt-2 h-4 w-4/5 rounded bg-[#eee7df] dark:bg-[#2a211c]" />
        <div className="mt-5 h-9 w-full rounded-md bg-[#ddd3c9] dark:bg-[#2a211c]" />
      </div>
    </div>
  );
}
