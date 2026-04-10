// Shared components
import IntextEmpty from "@/components/intext-empty";

// Hooks
import { useJobs } from "@/hooks/applicant/dashboard/useJobs";

// Icons
import { ArrowRight } from "lucide-react";

// Utilities
import { getDate } from "@/lib/datetime.helpers";

export default function ExploreJobs() {
  const { jobs, loading, error } = useJobs();
  const hasJobs = jobs.length > 0;

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="text-red-600 animate-pulse">Error: {error}</p>
      </div>
    );
  }

  return (
    // Main explore jobs panel
    <div className="p-4 sm:p-6 border border-slate-200 bg-gray-50">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Explore Jobs</h1>

      {/* Empty state or jobs grid */}
      {hasJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 border border-slate-200 bg-white flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  {job.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-medium text-slate-500">
                    Apply until {getDate(job.expiry_date)}
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Card action */}
              <div className="mt-6 pt-4 border-slate-50">
                <button className="text-xs font-medium text-red-600 hover:text-red-700">
                  Open <ArrowRight className="size-4 inline-block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 border border-slate-200 rounded-xl bg-white text-center">
          <IntextEmpty message="No jobs available at the moment. Please check back later!" />
        </div>
      )}
    </div>
  );
}
