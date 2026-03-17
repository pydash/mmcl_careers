import ApplicantNavbar from "@/components/applicant/navbar";
import ProfileEditForm from "./edit/profile-edit-form";

export default function ApplicantProfileEdit() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Edit Profile
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Update your profile details to keep your information current.
          </p>

          {/* Render the profile edit form here */}
          <ProfileEditForm />
        </div>
      </main>
    </div>
  );
}
