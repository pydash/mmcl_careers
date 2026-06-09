"use client";

// Next.js
import Link from "next/link";
import { useParams } from "next/navigation";

// Hooks
import { useProfile } from "@/hooks/applicant/useProfile";
import { useApplyJob } from "@/hooks/applicant/useApplyJob";

// Components
import UserInfoTabs from "./user-info-tabs";

// Icons
import { ChevronLeft } from "lucide-react";

export default function ApplicantJobApplyPage() {
  const { id } = useParams() as { id: string };

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  const {
    pitch,
    setPitch,
    confirmed,
    setConfirmed,
    loading,
    error,
    submitApplication,
  } = useApplyJob(id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Navigation */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-950 hover:underline mb-6"
      >
        <ChevronLeft size={16} />
        Back
      </Link>

      {/* Page Header */}
      <div className="border border-gray-300 bg-white p-4 md:p-6 mb-6">
        <div className="bg-red-600 text-white text-xs px-2 py-1 inline-block mb-4">
          APPLICATION
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Submit Application
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Review your information before submitting.
        </p>
      </div>

      {/* Applicant Information */}
      <section className="border border-gray-300 bg-white p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Applicant Information</h2>

        {profileLoading ? (
          <h3>Loading...</h3>
        ) : profileError ? (
          <h3>{profileError}</h3>
        ) : (
          <UserInfoTabs data={profile} />
        )}
      </section>

      {/* Application Form */}
      <form onSubmit={submitApplication} className="space-y-6 mt-6">
        {/* Application Pitch */}
        <section className="border border-gray-300 bg-white p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Application Pitch
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Tell the hiring committee why you are a good fit for this position.
            Highlight your qualifications, experience, achievements, and any
            relevant skills that support your application.
          </p>

          <textarea
            rows={5}
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="Write your pitch here..."
            className="w-full border border-gray-300 p-2 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-blue-950"
            required
          />
        </section>

        {/* Applicant Declaration */}
        <section className="border border-gray-300 bg-white p-4 md:p-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-red-600"
              required
            />

            <span className="text-sm text-gray-700">
              I confirm that all information and documents provided in this
              application are complete and truthful. I understand that any
              false, misleading, or omitted information may result in the
              rejection of my application or disqualification from the hiring
              process.
            </span>
          </label>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Link href="/jobs">
            <button
              type="button"
              className="w-full sm:w-auto border border-gray-300 px-6 py-3 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            disabled={!confirmed || !pitch.trim()}
            className="w-full sm:w-auto bg-blue-950 text-white px-6 py-3 text-sm hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Send Application"}
          </button>
        </div>

        {/* Submission Error */}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}
