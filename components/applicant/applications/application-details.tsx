"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Next.js
import Link from "next/link";

// Hooks
import { useApplicationDetails } from "@/hooks/applicant/applications/useApplicationDetails";

// Icons
import { Activity, ArrowRight, Calendar, Fingerprint } from "lucide-react";

// UI components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WithdrawApplicationDialog from "@/components/applicant/applications/withdraw-application-dialog";

// Utilities
import { getDate } from "@/lib/datetime.helpers";

export default function ApplicationDetailsPage({ id }: { id: string }) {
  // Fetch application details by id
  const router = useRouter();
  const { application, loading, error } = useApplicationDetails(id);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const isCancelled = application?.status === "Cancelled";

  if (isCancelled) {
    return (
      <div className="p-12 text-center">
        <Alert variant="destructive" className="mx-auto max-w-md">
          <AlertTitle>Application Withdrawn</AlertTitle>
          <AlertDescription>
            You have withdrawn this application. If this was a mistake, you can
            submit a new application for the same position.
          </AlertDescription>
          <div className="flex flex-row items-center mt-8 gap-2 justify-center">
            <Link
              href="/applicant/jobs"
              className="text-red-500 hover:underline"
            >
              Browse Jobs
            </Link>
            <ArrowRight className="size-4 text-red-500" />
          </div>
        </Alert>
      </div>
    );
  }

  // Loading/error/empty states
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading application details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
        Error: {error}
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        Application not found.
      </div>
    );
  }

  // Cancel current application and refresh details
  const handleCancelApplication = async () => {
    try {
      setIsWithdrawing(true);

      const res = await fetch(`/api/applicant/applications/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to cancel");
      }

      alert("Application cancelled successfully!");

      router.push("/applicant/applications");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while cancelling.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    // Main application details layout
    <div className="flex w-full flex-col gap-8">
      {/* Header: title + actions */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            {application.title}
          </h1>
          <p className="text-sm text-slate-500">
            Reviewing your submission for this position.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-none shadow-none border-slate-200 hover:bg-slate-50"
          >
            <Link
              href={`/applicant/applications/${id}/edit`}
              className="flex items-center gap-2"
            >
              Edit
            </Link>
          </Button>

          <WithdrawApplicationDialog
            onConfirm={handleCancelApplication}
            isSubmitting={isWithdrawing}
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-slate-200 ">
          <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Activity className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-medium text-slate-400">Status</p>
            <p className="text-sm font-bold text-slate-900">
              {application.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-slate-200 ">
          <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-medium text-slate-400">Applied On</p>
            <p className="text-sm font-bold text-slate-900">
              {getDate(application.applied_at)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-slate-200 ">
          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <Fingerprint className="h-4 w-4 text-slate-600" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-xs font-medium text-slate-400">Application ID</p>
            <p className="text-sm font-mono font-bold text-slate-900 truncate">
              {application.public_id ?? id}
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Main content area */}
      <div className="flex flex-col gap-8">
        {application.pitch ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Your Pitch
            </h2>
            <div className="p-4 bg-white border border-slate-200 text-slate-700 leading-relaxed text-sm md:text-base">
              {application.pitch}
            </div>
          </div>
        ) : null}

        {application.notes ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              Notes
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-wrap px-1">
              {application.notes}
            </p>
          </div>
        ) : null}

        {!application.pitch && !application.notes ? (
          <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-2xl">
            <p className="text-sm text-slate-400 font-medium">
              No additional application details provided.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
