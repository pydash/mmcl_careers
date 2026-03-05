import ApplicantNavbar from "./navbar";

export default function ApplicantSettings() {
  return (
    <div className="flex">
      <ApplicantNavbar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">
              Here you can update your settings and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
