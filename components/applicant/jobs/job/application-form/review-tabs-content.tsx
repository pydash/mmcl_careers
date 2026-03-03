import { useProfileDetails } from "@/hooks/applicant/jobs/useProfileDetails";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toTitleCase } from "@/utils/formatText";
import { getShortDate } from "@/utils/formatDate";

export default function ReviewTabsContent() {
  const { profile, loading, error } = useProfileDetails();

  return (
    <Tabs defaultValue="personal">
      <TabsList className="bg-gray-50 p-1 rounded-lg border border-gray-200 mb-6 inline-flex">
        <TabsTrigger
          value="personal"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Personal
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Education
        </TabsTrigger>
        <TabsTrigger
          value="employment"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Work
        </TabsTrigger>
        <TabsTrigger
          value="credentials"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Credentials
        </TabsTrigger>
        <TabsTrigger
          value="ids"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Government IDs
        </TabsTrigger>
        <TabsTrigger
          value="media"
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
        >
          Social Media
        </TabsTrigger>
      </TabsList>

      {/* TAB FOR PERSONAL  */}

      <TabsContent value="personal">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.profile && (
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Full Name
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {profile.profile.first_name}{" "}
                    {profile.profile.middle_name &&
                      `${profile.profile.middle_name} `}
                    {profile.profile.last_name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Gender
                  </p>
                  <p className="text-sm text-gray-900 capitalize">
                    {profile.profile.gender}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Civil Status
                  </p>
                  <p className="text-sm text-gray-900 capitalize">
                    {profile.profile.civil_status}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Citizenship
                  </p>
                  <p className="text-sm text-gray-900">
                    {toTitleCase(profile.profile.citizenship)}
                  </p>
                </div>
                {profile.profile.religion && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Religion
                    </p>
                    <p className="text-sm text-gray-900 capitalize">
                      {profile.profile.religion}
                    </p>
                  </div>
                )}
                {profile.profile.birth_place && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Birth Place
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.profile.birth_place}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-900">
                    {profile.profile.email_address}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Mobile Number
                  </p>
                  <p className="text-sm text-gray-900">
                    {profile.profile.mobile_number}
                  </p>
                </div>
                {profile.profile.landline_number && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Landline
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.profile.landline_number}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information Section */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                Address Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Permanent Address
                  </p>
                  <p className="text-sm text-gray-900">
                    {profile.profile.permanent_address}
                  </p>
                </div>
                {profile.profile.mailing_address &&
                  profile.profile.mailing_address !==
                    profile.profile.permanent_address && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Mailing Address
                      </p>
                      <p className="text-sm text-gray-900">
                        {profile.profile.mailing_address}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </TabsContent>

      {/* TAB FOR EDUCATION */}

      <TabsContent value="education">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.education_background && (
          <div className="space-y-4">
            {profile.education_background.length > 0 ? (
              profile.education_background.map((edu: any) => (
                <div key={edu.id} className="border rounded-lg p-6 bg-white">
                  <div className="flex items-start justify-between mb-4 pb-3 border-b">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.school_name}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded capitalize">
                      {edu.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Status
                      </p>
                      <p className="text-sm text-gray-900 capitalize">
                        {toTitleCase(edu.status)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Year Graduated
                      </p>
                      <p className="text-sm text-gray-900">
                        {edu.year_graduated}
                      </p>
                    </div>
                    {edu.units_earned && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Units Earned
                        </p>
                        <p className="text-sm text-gray-900">
                          {edu.units_earned}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-8 bg-white text-center">
                <p className="text-gray-500">No education background found.</p>
              </div>
            )}
          </div>
        )}
      </TabsContent>

      {/* TAB FOR EMPLOYMENT */}

      <TabsContent value="employment">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.work_experience && (
          <div className="space-y-4">
            {profile.work_experience.length > 0 ? (
              profile.work_experience.map((job: any, index: number) => (
                <div key={job.id} className="border rounded-lg p-6 bg-white">
                  <div className="mb-4 pb-3 border-b">
                    <h3 className="text-base font-semibold text-gray-900">
                      {job.position}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {job.company} • {job.department}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Employment Period
                      </p>
                      <p className="text-sm text-gray-900">
                        {getShortDate(job.date_started)} -{" "}
                        {getShortDate(job.date_ended)}
                      </p>
                    </div>
                    {job.courses_handled && (
                      <div className="space-y-1 col-span-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Courses Handled
                        </p>
                        <p className="text-sm text-gray-900">
                          {job.courses_handled}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-8 bg-white text-center">
                <p className="text-gray-500">No employment history found.</p>
              </div>
            )}
          </div>
        )}
      </TabsContent>

      {/* TAB FOR CREDENTIALS */}

      <TabsContent value="credentials">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.credentials && (
          <div className="space-y-4">
            {profile.credentials.length > 0 ? (
              profile.credentials.map((credential: any, index: number) => (
                <div
                  key={credential.id}
                  className="border rounded-lg p-6 bg-white"
                >
                  <div className="mb-4 pb-3 border-b">
                    <h3 className="text-base font-semibold text-gray-900">
                      {credential.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {credential.authority}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {credential.number && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Number
                        </p>
                        <p className="text-sm text-gray-900">
                          {credential.number}
                        </p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Date Taken
                      </p>
                      <p className="text-sm text-gray-900">
                        {getShortDate(credential.date_taken)}
                      </p>
                    </div>
                    {credential.valid_until && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Valid Until
                        </p>
                        <p className="text-sm text-gray-900">
                          {credential.valid_until}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-8 bg-white text-center">
                <p className="text-gray-500">
                  No licenses or certifications found.
                </p>
              </div>
            )}
          </div>
        )}
      </TabsContent>

      {/* TAB FOR GOVERNMENT IDS */}

      <TabsContent value="ids">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.government_ids && (
          <div className="space-y-4">
            {profile.government_ids.length > 0 ? (
              profile.government_ids.map((govId: any) => (
                <div key={govId.id} className="border rounded-lg p-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-sm text-gray-600">
                        ID Type:
                      </strong>
                      <p className="text-gray-900 capitalize">
                        {toTitleCase(govId.id_type)}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        ID Number:
                      </strong>
                      <p className="text-gray-900">{govId.id_number}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No government IDs found.</p>
            )}
          </div>
        )}
      </TabsContent>

      {/* TAB FOR MEDIA ACCOUNTS */}

      <TabsContent value="media">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.media_accounts && (
          <div className="space-y-4">
            {profile.media_accounts.length > 0 ? (
              profile.media_accounts.map((media: any) => (
                <div key={media.id} className="border rounded-lg p-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-sm text-gray-600">
                        Platform:
                      </strong>
                      <p className="text-gray-900 capitalize">
                        {media.platform}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">Link:</strong>
                      <p className="text-gray-900">
                        <a
                          href={media.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {media.link}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No social media links found.</p>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
