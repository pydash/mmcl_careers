"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useApplicationDetails } from "@/hooks/applicant/applications/useApplicationDetails";
import { Calendar, Fingerprint, Activity, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ApplicationDetailsPage({ id }: { id: string }) {
  const { application, loading, error } = useApplicationDetails(id);

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

  const handleCancel = async () => {
  const confirmCancel = confirm(
    "Are you sure you want to cancel this application?"
  );
  if (!confirmCancel) return;

  try {
    const res = await fetch(`/api/applications/${id}/cancel`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to cancel");
    }

    alert("Application cancelled successfully!");


    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Something went wrong while cancelling.");
  }
};

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
  
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {application.title}
          </h1>
          <p className="text-sm text-slate-500 font-medium italic">
            Reviewing your submission for this position.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="outline" 
            className="rounded-xl font-bold shadow-sm border-slate-200 hover:bg-slate-50"
          >
            <Link href={`/applicant/applications/${id}/edit`} className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Edit
            </Link>
          </Button>

          <Button
          onClick={handleCancel}
          variant="destructive"
          className="rounded-xl font-bold shadow-sm bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Cancel Application
          </div>
        </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-slate-200 shadow-sm">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <Activity className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-sm font-bold text-slate-900">{application.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-slate-200 shadow-sm">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied On</p>
            <p className="text-sm font-bold text-slate-900">
              {new Date(application.applied_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-slate-200 shadow-sm">
          <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
            <Fingerprint className="h-4 w-4 text-slate-600" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application ID</p>
            <p className="text-sm font-mono font-bold text-slate-900 truncate">
              {application.public_id ?? id}
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Main Content Area */}
      <div className="flex flex-col gap-8">
        {application.pitch ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              Pitch
            </h2>
            <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm italic text-slate-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              "{application.pitch}"
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