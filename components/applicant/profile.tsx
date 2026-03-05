import ApplicantNavbar from "@/components/applicant/navbar";

export default function ApplicantProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Name: John Doe</p>
            <p className="text-sm text-gray-600 mt-2">
              Email:
              <a
                href="mailto:john.doe@example.com"
                className="text-red-600 hover:underline ml-1"
              >
                john.doe@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
