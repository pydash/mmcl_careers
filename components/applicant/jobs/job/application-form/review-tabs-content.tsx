import { useProfileDetails } from "@/hooks/applicant/jobs/useProfileDetails";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewTabsContent() {
  const { profile: rawProfile, loading, error } = useProfileDetails();

  // Handle if profile is returned as array (fallback)
  const profile =
    Array.isArray(rawProfile) && rawProfile.length > 0
      ? (rawProfile[0] as any)?.profile
      : rawProfile;

  const LoadingState = () => (
    <div className="py-8 text-center text-sm font-medium text-slate-500 animate-pulse">
      Loading profile details...
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="py-4 text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100">
      Error: {message}
    </div>
  );

  return (
    <Tabs defaultValue="personal" className="w-full">
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <TabsList className="bg-slate-100 p-1 h-auto flex justify-start sm:justify-center min-w-max rounded-xl">
          <TabsTrigger value="personal" className="px-4 py-2 text-xs sm:text-sm rounded-lg">Personal</TabsTrigger>
          <TabsTrigger value="education" className="px-4 py-2 text-xs sm:text-sm rounded-lg">Education</TabsTrigger>
          <TabsTrigger value="licenses" className="px-4 py-2 text-xs sm:text-sm rounded-lg">Licenses & Certifications</TabsTrigger>
          <TabsTrigger value="employment" className="px-4 py-2 text-xs sm:text-sm rounded-lg">Employment</TabsTrigger>
        </TabsList>
      </div>

      <Separator className="my-4" />

      <TabsContent value="personal" className="focus-visible:outline-none">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {profile && profile.personal && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Full Name</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.personal.first_name} {profile.personal.middle_name}{" "}
                  {profile.personal.last_name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sex</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">{profile.personal.sex}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Birth Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(profile.personal.birth_date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Civil Status</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">{profile.personal.civil_status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Citizenship</p>
                <p className="text-sm font-semibold text-slate-900">{profile.personal.citizenship}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone Number</p>
                <p className="text-sm font-semibold text-slate-900">{profile.personal.phone_number}</p>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Physical Address</p>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">{profile.personal.physical_address}</p>
              </div>
            </div>

            {profile.personal.about && (
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">About</p>
                <p className="text-sm text-slate-700 leading-relaxed">{profile.personal.about}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
              {profile.personal.photo_url && (
                <a href={profile.personal.photo_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-red-600 hover:underline">
                  View Photo
                </a>
              )}
              {profile.personal.resume_url && (
                <a href={profile.personal.resume_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-red-600 hover:underline">
                  View Resume (PDF)
                </a>
              )}
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="education" className="focus-visible:outline-none">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {profile && profile.education && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1 sm:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Institution</p>
                <p className="text-sm font-semibold text-slate-900">{profile.education.institution}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Course & Degree</p>
                <p className="text-sm font-semibold text-slate-900">{profile.education.course} - {profile.education.degree}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">{profile.education.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Units Earned</p>
                <p className="text-sm font-semibold text-slate-900">{profile.education.units_earned}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Year Finished</p>
                <p className="text-sm font-semibold text-slate-900">{profile.education.year_finished}</p>
              </div>
            </div>
            {profile.education.honors?.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Honors</p>
                <p className="text-sm font-semibold text-slate-900">{profile.education.honors.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="licenses" className="focus-visible:outline-none">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {profile && profile.license && (
          <div className="space-y-4">
            {profile.license.length > 0 ? (
              profile.license.map((license: any) => (
                <div key={license.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                  <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">{license.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">License Number</p>
                      <p className="text-sm font-mono font-semibold text-slate-900">{license.number}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Issuing Body</p>
                      <p className="text-sm font-semibold text-slate-900">{license.issuing_organization}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Issue Date</p>
                      <p className="text-sm font-semibold text-slate-900">{new Date(license.date_issued).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Expiry Date</p>
                      <p className="text-sm font-semibold text-slate-900">{new Date(license.expiry_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {license.image_url && (
                    <div className="mt-4 pt-3 border-t border-slate-50">
                      <a href={license.image_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-red-600 hover:underline">
                        View Credential Image
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-sm text-slate-500 italic">No licenses or certifications found.</p>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="employment" className="focus-visible:outline-none">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {profile && profile.employment && (
          <div className="space-y-4">
            {profile.employment.length > 0 ? (
              profile.employment.map((job: any) => (
                <div key={job.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                  <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">{job.job_title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Company</p>
                      <p className="text-sm font-semibold text-slate-900">{job.company_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Industry</p>
                      <p className="text-sm font-semibold text-slate-900">{job.industry}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Salary</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.monthly_salary ? `₱${Number(job.monthly_salary).toLocaleString()}` : "Not Disclosed"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Period</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(job.date_started).toLocaleDateString()} - {new Date(job.date_ended).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-sm text-slate-500 italic">No employment history found.</p>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}