"use client";

import { useSettings } from "@/hooks/applicant/settings/useSettings";

export default function ApplicantSettingsPage() {
  const { settings, loading, error } = useSettings();

  if (loading) {
    return <p>Loading settings...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applicant Settings</h1>
      <p className="text-gray-600">
        Manage your account settings and preferences.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
        <p className="text-gray-600 mb-4">
          Customize how you receive notifications about job applications and
          updates.
        </p>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Email Address</h3>
            <p className="text-gray-600 mb-3">{settings?.email}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Email
            </button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Password</h3>
            <p className="text-gray-600 mb-3">
              Change your password regularly to keep your account secure.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Password
            </button>
          </div>
        </div>
      </section>

      {/* Additional settings sections can be added here */}
    </main>
  );
}
