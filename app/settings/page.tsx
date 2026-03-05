import { getUserRole } from "@/lib/auth";
import ApplicantSettings from "@/components/applicant/settings";

export default async function SettingsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantSettings />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">
              You do not have access to this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
