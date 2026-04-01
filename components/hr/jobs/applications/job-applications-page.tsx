"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

export default function HRJobApplications({ id }: { id: string }) {
  const { applications, loading, error } = useJobApplications(id);
  const { job } = useJobDetails(id);

  const pendingList = applications.filter(
    (app) => app.status.toLowerCase() === "pending",
  );
  const shortlistedList = applications.filter(
    (app) => app.status.toLowerCase() === "shortlisted",
  );
  const interviewedList = applications.filter(
    (app) => app.status.toLowerCase() === "interview",
  );
  const deferredList = applications.filter(
    (app) => app.status.toLowerCase() === "deferred",
  );
  const hiredList = applications.filter(
    (app) => app.status.toLowerCase() === "hired",
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href={`/jobs/${id}`}
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Applications for {toTitleCase(job?.position || "this job")}
                </h1>
                <p className="text-sm text-slate-600">
                  Review and manage applicants
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Pending List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {pendingList.length || 0}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              {pendingList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-slate-500"
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {pendingList.map((applicant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-slate-900">
                        {applicant.id}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            applicant.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : applicant.status === "Shortlisted"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.email_address}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.mobile_number}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getDate(applicant.applied_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/jobs/${id}/applications/${applicant.id}`}
                          className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Interviewed List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {interviewedList.length || 0}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              {interviewedList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-slate-500"
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {interviewedList.map((applicant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-slate-900">
                        {applicant.id}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            applicant.status === "Interview"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.email_address}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.mobile_number}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getDate(applicant.applied_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/jobs/${id}/applications/${applicant.id}`}
                          className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Shortlisted List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {shortlistedList.length || 0}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              {shortlistedList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-slate-500"
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {shortlistedList.map((applicant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-slate-900">
                        {applicant.id}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex h-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium capitalize text-emerald-800">
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.email_address}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.mobile_number}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getDate(applicant.applied_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/jobs/${id}/applications/${applicant.id}`}
                          className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Deferred List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {deferredList.length || 0}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              {deferredList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-slate-500"
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {deferredList.map((applicant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-slate-900">
                        {applicant.id}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex h-fit items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium capitalize text-orange-800">
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.email_address}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.mobile_number}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getDate(applicant.applied_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/jobs/${id}/applications/${applicant.id}`}
                          className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Hired List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {hiredList.length || 0}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              {hiredList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-slate-500"
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {hiredList.map((applicant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-slate-900">
                        {applicant.id}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex h-fit items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-800">
                          {applicant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.email_address}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {applicant.mobile_number}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getDate(applicant.applied_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/jobs/${id}/applications/${applicant.id}`}
                          className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </section>
        </div>
      </main>
    </div>
  );
}
