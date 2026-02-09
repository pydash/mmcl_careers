import { useProfileDetails } from "@/hooks/applicant/jobs/useProfileDetails";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewTabsContent() {
  const { profile: rawProfile, loading, error } = useProfileDetails();

  console.log("ProfileTabsContent render:", {
    profile: rawProfile,
    loading,
    error,
  });

  // Handle if profile is returned as array (fallback)
  const profile =
    Array.isArray(rawProfile) && rawProfile.length > 0
      ? (rawProfile[0] as any)?.profile
      : rawProfile;

  return (
    <Tabs defaultValue="personal">
      <TabsList className="bg-gray-100">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="licenses">Licenses & Certifications</TabsTrigger>
        <TabsTrigger value="employment">Employment</TabsTrigger>
      </TabsList>
      <Separator className="my-2" />
      <TabsContent value="personal">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.personal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-sm text-gray-600">Full Name:</strong>
                <p className="text-gray-900">
                  {profile.personal.first_name} {profile.personal.middle_name}{" "}
                  {profile.personal.last_name}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Sex:</strong>
                <p className="text-gray-900 capitalize">
                  {profile.personal.sex}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Birth Date:</strong>
                <p className="text-gray-900">
                  {new Date(profile.personal.birth_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Civil Status:</strong>
                <p className="text-gray-900 capitalize">
                  {profile.personal.civil_status}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Citizenship:</strong>
                <p className="text-gray-900">{profile.personal.citizenship}</p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Phone Number:</strong>
                <p className="text-gray-900">{profile.personal.phone_number}</p>
              </div>
            </div>
            <div>
              <strong className="text-sm text-gray-600">
                Physical Address:
              </strong>
              <p className="text-gray-900">
                {profile.personal.physical_address}
              </p>
            </div>
            {profile.personal.honorifics &&
              profile.personal.honorifics.length > 0 && (
                <div>
                  <strong className="text-sm text-gray-600">Honorifics:</strong>
                  <p className="text-gray-900">
                    {profile.personal.honorifics.join(", ")}
                  </p>
                </div>
              )}
            {profile.personal.about && (
              <div>
                <strong className="text-sm text-gray-600">About:</strong>
                <p className="text-gray-900">{profile.personal.about}</p>
              </div>
            )}
            {profile.personal.photo_url && (
              <div>
                <strong className="text-sm text-gray-600">Photo:</strong>
                <p className="text-gray-900">
                  <a
                    href={profile.personal.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Photo
                  </a>
                </p>
              </div>
            )}
            {profile.personal.resume_url && (
              <div>
                <strong className="text-sm text-gray-600">Resume:</strong>
                <p className="text-gray-900">
                  <a
                    href={profile.personal.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent value="education">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.education && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-sm text-gray-600">Institution:</strong>
                <p className="text-gray-900">{profile.education.institution}</p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Course:</strong>
                <p className="text-gray-900">{profile.education.course}</p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Degree:</strong>
                <p className="text-gray-900">{profile.education.degree}</p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Status:</strong>
                <p className="text-gray-900 capitalize">
                  {profile.education.status}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">Units Earned:</strong>
                <p className="text-gray-900">
                  {profile.education.units_earned}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">
                  Year Finished:
                </strong>
                <p className="text-gray-900">
                  {profile.education.year_finished}
                </p>
              </div>
            </div>
            {profile.education.honors &&
              profile.education.honors.length > 0 && (
                <div>
                  <strong className="text-sm text-gray-600">Honors:</strong>
                  <p className="text-gray-900">
                    {profile.education.honors.join(", ")}
                  </p>
                </div>
              )}
          </div>
        )}
      </TabsContent>
      <TabsContent value="licenses">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.license && (
          <div className="space-y-4">
            {profile.license.length > 0 ? (
              profile.license.map((license: any, index: number) => (
                <div
                  key={license.id}
                  className="border rounded-lg p-4 bg-white"
                >
                  <h3 className="font-semibold text-sm text-gray-900 mb-3">
                    {license.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-sm text-gray-600">Number:</strong>
                      <p className="text-gray-900">{license.number}</p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Issuing Organization:
                      </strong>
                      <p className="text-gray-900">
                        {license.issuing_organization}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Date Issued:
                      </strong>
                      <p className="text-gray-900">
                        {new Date(license.date_issued).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Expiry Date:
                      </strong>
                      <p className="text-gray-900">
                        {new Date(license.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                    {license.image_url && (
                      <div>
                        <strong className="text-sm text-gray-600">
                          Image:
                        </strong>
                        <p className="text-gray-900">
                          <a
                            href={license.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Image
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No licenses or certifications found.
              </p>
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent value="employment">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.employment && (
          <div className="space-y-4">
            {profile.employment.length > 0 ? (
              profile.employment.map((job: any, index: number) => (
                <div key={job.id} className="border rounded-lg p-4 bg-white">
                  <h3 className="font-semibold text-sm text-gray-900 mb-3">
                    {job.job_title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-sm text-gray-600">
                        Company Name:
                      </strong>
                      <p className="text-gray-900">{job.company_name}</p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Industry:
                      </strong>
                      <p className="text-gray-900">{job.industry}</p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Position Specialization:
                      </strong>
                      <p className="text-gray-900">
                        {job.position_specialization}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Monthly Salary:
                      </strong>
                      <p className="text-gray-900">
                        {job.monthly_salary !== null &&
                        job.monthly_salary !== undefined
                          ? `₱${Number(job.monthly_salary).toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">
                        Employment Period:
                      </strong>
                      <p className="text-gray-900">
                        {new Date(job.date_started).toLocaleDateString()} -{" "}
                        {new Date(job.date_ended).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No employment history found.</p>
            )}
          </div>
        )}
      </TabsContent>
      {/* <TabsContent value="extras">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.extras && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-sm text-gray-600">
                  Onsite Willing:
                </strong>
                <p className="text-gray-900 capitalize">
                  {profile.extras.onsite_willing}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">
                  WFH Capability:
                </strong>
                <p className="text-gray-900 capitalize">
                  {profile.extras.wfh_capability}
                </p>
              </div>
              <div>
                <strong className="text-sm text-gray-600">
                  Start Date Preference:
                </strong>
                <p className="text-gray-900">
                  {new Date(
                    profile.extras.start_date_preference,
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            {profile.extras.skills && profile.extras.skills.length > 0 && (
              <div>
                <strong className="text-sm text-gray-600">Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.extras.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {profile.extras.sources && profile.extras.sources.length > 0 && (
              <div>
                <strong className="text-sm text-gray-600">Sources:</strong>
                <p className="text-gray-900">
                  {profile.extras.sources.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
      </TabsContent> */}
      {/* <TabsContent value="attachments">
        {loading && <div>Loading profile...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {profile && profile.attachments && (
          <div className="space-y-4">
            {profile.attachments.length > 0 ? (
              profile.attachments
                .filter(Boolean)
                .map((attachment: any, index: number) => (
                  <div
                    key={attachment.id}
                    className="border rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {attachment.file_name}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <strong className="text-gray-600">Type:</strong>
                            <p className="text-gray-900">
                              {attachment.file_type}
                            </p>
                          </div>
                          <div>
                            <strong className="text-gray-600">Size:</strong>
                            <p className="text-gray-900">
                              {(attachment.file_size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <div>
                            <strong className="text-gray-600">Uploaded:</strong>
                            <p className="text-gray-900">
                              {new Date(
                                attachment.created_at,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        href={attachment.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-blue-600 hover:underline text-sm font-medium"
                      >
                        View File
                      </a>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No attachments found.</p>
            )}
          </div>
        )}
      </TabsContent> */}
    </Tabs>
  );
}
