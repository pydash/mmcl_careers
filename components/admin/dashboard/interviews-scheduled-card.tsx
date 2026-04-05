export default function InterviewsScheduledCard({ count }: { count?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm transition-all hover:shadow-md">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Interviews scheduled
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {count ?? 0}
        </span>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          Upcoming
        </span>
      </div>
      <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 w-1/2 rounded-full" />
      </div>
    </div>
  );
}