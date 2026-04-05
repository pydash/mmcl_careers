"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import Link from "next/link";
import { ArrowLeft, Search, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useJobApplications from "@/hooks/jobs/useJobApplications";
import useJobDetails from "@/hooks/jobs/useJobDetails";
import { getDate } from "@/lib/datetime.helpers";
import { toTitleCase } from "@/lib/text.helpers";
import { Input } from "@/components/ui/input";

export default function HRJobApplications({ id }: { id: string }) {
  const { applications, loading, error } = useJobApplications(id);
  const { job } = useJobDetails(id);

  const getFilteredList = (status: string) =>
    applications.filter((app) => app.status.toLowerCase() === status.toLowerCase());

  const pendingList = getFilteredList("pending");
  const shortlistedList = getFilteredList("shortlisted");
  const interviewedList = getFilteredList("interview");
  const deferredList = getFilteredList("deferred");
  const hiredList = getFilteredList("hired");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">Error loading data</p>
          <p className="text-sm text-slate-500">{error.message}</p>
        </div>
      </div>
    );
  }

  // Reusable Section Component for Lists
  const ApplicationSection = ({ 
    title, 
    list, 
    badgeColor 
  }: { 
    title: string; 
    list: any[]; 
    badgeColor: string 
  }) => (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            {list.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[100px] text-xs font-bold uppercase tracking-wider">ID</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider">Applicant</TableHead>
              <TableHead className="hidden md:table-cell text-xs font-bold uppercase tracking-wider">Contact</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider">Applied Date</TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-sm text-slate-400">
                  No candidates in this stage
                </TableCell>
              </TableRow>
            ) : (
              list.map((applicant) => (
                <TableRow key={applicant.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs font-medium text-slate-500">
                    #{applicant.id.toString().slice(-4)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{applicant.name}</span>
                      <span className="text-xs text-slate-500 md:hidden">{applicant.email_address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col text-xs text-slate-600">
                      <span>{applicant.email_address}</span>
                      <span>{applicant.mobile_number}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">
                    {getDate(applicant.applied_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/jobs/${id}/applications/${applicant.id}`}
                      className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Breadcrumb Header */}
          <div className="space-y-4 mt-12 lg:mt-0">
            <Link
              href={`/jobs/${id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Job Details
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-slate-900 md:text-4xl tracking-tight">
                  {toTitleCase(job?.position || "Applications")}
                </h1>
                <div className="flex items-center gap-2 text-slate-500">
                  <Users className="h-4 w-4" />
                  <p className="text-sm font-medium">
                    {applications.length} Total Applicants
                  </p>
                </div>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search applicants..." 
                  className="pl-10 h-10 border-slate-200 focus-visible:ring-red-600/20"
                />
              </div>
            </div>
          </div>

          {/* Kanban-style Lists */}
          <div className="space-y-10">
            <ApplicationSection 
              title="Pending Review" 
              list={pendingList} 
              badgeColor="bg-yellow-100 text-yellow-800" 
            />
            
            <ApplicationSection 
              title="Shortlisted" 
              list={shortlistedList} 
              badgeColor="bg-emerald-100 text-emerald-800" 
            />

            <ApplicationSection 
              title="In Interview" 
              list={interviewedList} 
              badgeColor="bg-blue-100 text-blue-800" 
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ApplicationSection 
                title="Deferred" 
                list={deferredList} 
                badgeColor="bg-orange-100 text-orange-800" 
              />
              <ApplicationSection 
                title="Hired" 
                list={hiredList} 
                badgeColor="bg-green-100 text-green-800" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}