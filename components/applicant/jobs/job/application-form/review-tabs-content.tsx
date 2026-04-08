// Hooks
import { useProfileDetails } from "@/hooks/applicant/jobs/useProfileDetails";

// UI components
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewTabsContent() {
  const { profile: profileResponse, loading, error } = useProfileDetails();

  // Normalize profile payload (API can return object or array-wrapped object)
  const profile =
    Array.isArray(profileResponse) && profileResponse.length > 0
      ? (profileResponse[0] as any)?.profile
      : profileResponse;

  // Derived collections/flags to avoid repeating filter/optional checks in JSX
  const licenses = (profile?.license ?? []).filter(Boolean);
  const employmentHistory = (profile?.employment ?? []).filter(Boolean);
  const hasAttachments =
    Boolean(profile?.personal?.photo_url) ||
    Boolean(profile?.personal?.resume_url) ||
    licenses.some((license: any) => Boolean(license?.image_url));
  const hasEducation = Boolean(profile?.education?.institution);

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

  // Shared feedback renderer used by each tab section
  const FeedbackState = () => (
    <>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
    </>
  );

  return (
    // Main tabs container
    <Tabs defaultValue="personal" className="w-full">
      {/* Tabs header */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <TabsList className="bg-slate-100 p-1 h-auto flex justify-start rounded-none">
          <TabsTrigger
            value="personal"
            className="px-4 py-2 text-xs sm:text-sm rounded-none"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="px-4 py-2 text-xs sm:text-sm rounded-none"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="employment"
            className="px-4 py-2 text-xs sm:text-sm rounded-none"
          >
            Employment
          </TabsTrigger>
          <TabsTrigger
            value="licenses"
            className="px-4 py-2 text-xs sm:text-sm rounded-none"
          >
            Licenses & Certifications
          </TabsTrigger>
          <TabsTrigger
            value="attachments"
            className="px-4 py-2 text-xs sm:text-sm rounded-none"
          >
            Attachments
          </TabsTrigger>
        </TabsList>
      </div>

      <Separator className="my-4" />

      {/* Personal section */}
      <TabsContent value="personal" className="focus-visible:outline-none">
        <FeedbackState />
        {profile && profile.personal && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Full Name</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.personal.first_name} {profile.personal.middle_name}{" "}
                  {profile.personal.last_name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Sex</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {profile.personal.sex}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Birth Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(profile.personal.birth_date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Civil Status</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {profile.personal.civil_status}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Citizenship</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.personal.citizenship}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Phone Number</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.personal.phone_number}
                </p>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <p className="text-xs text-slate-600">Physical Address</p>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {profile.personal.physical_address}
                </p>
              </div>
            </div>

            {profile.personal.about && (
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <p className="text-xs text-slate-600">About</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {profile.personal.about}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
              {profile.personal.photo_url && (
                <a
                  href={profile.personal.photo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  View Photo
                </a>
              )}
              {profile.personal.resume_url && (
                <a
                  href={profile.personal.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  View Resume (PDF)
                </a>
              )}
            </div>
          </div>
        )}
      </TabsContent>

      {/* Education section */}
      <TabsContent value="education" className="focus-visible:outline-none">
        <FeedbackState />
        {profile && profile.education && hasEducation ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs text-slate-600">Institution</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.education.institution}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Course & Degree</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.education.course} - {profile.education.degree}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Status</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {profile.education.status}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Units Earned</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.education.units_earned}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">Year Finished</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.education.year_finished}
                </p>
              </div>
            </div>
            {profile.education.honors?.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <p className="text-xs text-slate-600">Honors</p>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.education.honors.join(", ")}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center py-6 text-sm text-slate-500">
            No education background added
          </p>
        )}
      </TabsContent>

      {/* Employment section */}
      <TabsContent value="employment" className="focus-visible:outline-none">
        <FeedbackState />
        {profile && profile.employment && (
          <div className="space-y-4">
            {employmentHistory.length > 0 ? (
              employmentHistory.map((job: any) => (
                <div
                  key={job.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
                >
                  <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    {job.job_title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Company</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.company_name}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Industry</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.industry}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Salary</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.monthly_salary
                          ? `₱${Number(job.monthly_salary).toLocaleString()}`
                          : "Not Disclosed"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Period</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(job.date_started).toLocaleDateString()} -{" "}
                        {new Date(job.date_ended).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-sm text-slate-600">
                No employment history found
              </p>
            )}
          </div>
        )}
      </TabsContent>

      {/* Licenses and certifications section */}
      <TabsContent value="licenses" className="focus-visible:outline-none">
        <FeedbackState />
        {profile && profile.license && (
          <div className="space-y-4">
            {licenses.length > 0 ? (
              licenses.map((license: any) => (
                <div
                  key={license.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
                >
                  <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    {license.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">License Number</p>
                      <p className="text-sm font-mono font-semibold text-slate-900">
                        {license.number}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Issuing Body</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {license.issuing_organization}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Issue Date</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(license.date_issued).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">Expiry Date</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(license.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {license.image_url && (
                    <div className="mt-4 pt-3 border-t border-slate-50">
                      <a
                        href={license.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        View Credential Image
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-sm text-slate-500">
                No licenses or certifications found
              </p>
            )}
          </div>
        )}
      </TabsContent>

      {/* Attachments section */}
      <TabsContent value="attachments" className="focus-visible:outline-none">
        <FeedbackState />
        {profile && (
          <div className="space-y-4">
            {hasAttachments ? (
              <div className="space-y-3">
                {profile.personal?.photo_url && (
                  <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                    <p className="text-xs font-semibold text-slate-600 mb-2">
                      Photo
                    </p>
                    <a
                      href={profile.personal.photo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-red-600 hover:underline break-all"
                    >
                      {profile.personal.photo_url}
                    </a>
                  </div>
                )}
                {profile.personal?.resume_url && (
                  <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                    <p className="text-xs font-semibold text-slate-600 mb-2">
                      Resume
                    </p>
                    <a
                      href={profile.personal.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-red-600 hover:underline break-all"
                    >
                      {profile.personal.resume_url}
                    </a>
                  </div>
                )}
                {licenses.map(
                  (license: any) =>
                    license.image_url && (
                      <div
                        key={license.id}
                        className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
                      >
                        <p className="text-xs font-semibold text-slate-600 mb-2">
                          {license.title} Credential
                        </p>
                        <a
                          href={license.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-red-600 hover:underline break-all"
                        >
                          {license.image_url}
                        </a>
                      </div>
                    ),
                )}
              </div>
            ) : (
              <p className="text-center py-6 text-sm text-slate-500">
                No attachments found.
              </p>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
