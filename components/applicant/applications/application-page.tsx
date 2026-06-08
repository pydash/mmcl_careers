"use client";

// Hooks
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useApplication } from "@/hooks/applicant/useApplications";

// Services
import { cancelApplication } from "@/services/applicant/applications.service";

// Next
import Link from "next/link";

// Helpers
import { getDate, getDateTime } from "@/lib/datetime.helpers";

// Icons
import { ChevronLeft } from "lucide-react";

// Components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ApplicantApplicationPage() {
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const {
    application: application_details,
    loading,
    error,
  } = useApplication(params.id);
  const application = application_details?.application;
  const stage_history = application_details?.stage_history;

  // Cancel function for Cancel button
  async function handleCancelApplication(id: string) {
    try {
      setCancelLoading(true);

      const response = await cancelApplication(id);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to cancel application");
      }

      router.push("/applications");
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCancelLoading(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading application...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!application) {
    return <p className="text-sm text-gray-500">Application not found.</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        href="/applications"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-950 mb-6"
      >
        <ChevronLeft size={16} />
        Back to Applications
      </Link>

      {/* Header */}
      <div className="border border-gray-300 bg-white p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`text-xs px-2 py-1 bg-red-600 text-white`}>
            {application.department || "No department"}
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-1">Applying for</p>
        <h1 className="text-3xl font-bold text-gray-900">
          {application.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pitch</h2>

            <div className="text-sm text-gray-700 whitespace-pre-line">
              {application.pitch || "No pitch provided."}
            </div>
          </section>

          <section className="border border-gray-300 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 p-4">
              Status History
            </h2>

            <div className="space-y-4">
              {stage_history?.map((history) => (
                <div
                  key={history.id}
                  className="space-y-1 hover:bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1">
                    {history.status}
                  </p>
                  <p className="text-sm">{history.stage}</p>
                  <p className="text-xs text-gray-400">
                    {getDateTime(history.created_at)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="border border-gray-300 bg-white p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Application Details
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <p className="font-medium text-gray-900">
                  {application.status}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Date Applied</p>
                <p className="font-medium text-gray-900">
                  {getDate(application.created_at)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Notes from HR</p>
                <p className="h-24 p-2 text-gray-900 border border-gray-300">
                  {application.notes || "No notes."}
                </p>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-red-600 text-white px-3 py-2 hover:bg-red-700">
                      Cancel Application
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm bg-white p-6 rounded-none!">
                    <DialogHeader>
                      <DialogTitle className="font-semibold mb-4">
                        Cancel application
                      </DialogTitle>
                      <p className="text-sm border-b border-gray-300 pb-2">
                        Are you sure you want to cancel your application? This
                        action cannot be undone.
                      </p>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button className="text-sm bg-gray-300 px-3 py-2">
                          Cancel
                        </button>
                      </DialogClose>
                      <button
                        className={`text-sm px-3 py-2 text-white ${
                          cancelLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600"
                        }`}
                        onClick={() => handleCancelApplication(params.id)}
                        disabled={cancelLoading}
                      >
                        {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
