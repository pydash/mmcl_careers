import IntextEmpty from "@/components/intext-empty";
import { useJobs } from "@/hooks/applicant/dashboard/useJobs";
import { getDate } from "@/utils/formatDate";

export default function ExploreJobs() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading jobs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-sm text-red-600 font-medium">
          Error loading jobs: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-gray-50">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Explore Jobs</h1>
      
      {jobs.length === 0 ? (
        <IntextEmpty message="No jobs available at the moment." />
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  {job.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-medium text-slate-500">
                    Valid until {getDate(job.expiry_date)}
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>
              
           
              <div className="mt-6 pt-4 border-t border-slate-50">
                <button className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}