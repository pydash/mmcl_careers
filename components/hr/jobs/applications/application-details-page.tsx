"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/datetime.helpers";
import { Download } from "lucide-react";
import { useState } from "react";

const applicantData = {
  personal: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+63 912 345 6789",
    address: "Makati City, Philippines",
    date_applied: "2024-02-25T00:00:00Z",
    status: "Pending",
    notes: "Strong in full-stack development with React and Node.js.",
  },
  application: {
    applied_date: "2024-02-25T00:00:00Z",
    status: "Pending",
    stage: "Initial Screening",
    notes: "Strong in full-stack development with React and Node.js.",
  },
  education: [
    {
      institution: "University of the Philippines",
      level: "College",
      degree: "BS Computer Science",
      year_graduate: "2022",
    },
  ],
  experience: [
    {
      company: "MMCL",
      position: "Software Engineer",
      date_started: "2023",
      date_ended: "Present",
    },
  ],
  credentials: [
    { title: "AWS Cloud Practitioner", authority: "Amazon Web Services" },
  ],
  government_ids: [{ type: "TIN", number: "123-456-789" }],
  social_media: [{ platform: "LinkedIn", link: "linkedin.com/in/johndoe" }],
  attachments: [{ name: "Resume.pdf" }],
};

const tabs = [
  "Personal",
  "Education",
  "Experience",
  "Credentials",
  "Government IDs",
  "Social Media",
  "Attachments",
];

const tabValue = (tab: string) => tab.toLowerCase().replace(/\s+/g, "-");
const applicationStatusTrack = [
  "Pending",
  "Shortlisted",
  "Interview",
  "Offer",
  "Hired",
];

export default function HRApplicationDetailsPage() {
  const [applicationStatus, setApplicationStatus] = useState(
    applicantData.application.status,
  );

  const currentStatusIndex = applicationStatusTrack.indexOf(applicationStatus);
  const isRejected = applicationStatus === "Rejected";

  const handleDownloadApplicationDetails = () => {
    const payload = {
      ...applicantData,
      application: {
        ...applicantData.application,
        status: applicationStatus,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `application-details-${applicantData.personal.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href="/jobs/1/applications"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  Application Details
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Review application status, stage, and notes.
                </p>
              </div>

              <Button
                variant="default"
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleDownloadApplicationDetails}
              >
                <Download className="h-4 w-4" />
                Download Details
              </Button>
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Status Track</p>

              {isRejected ? (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  Application marked as Rejected.
                </div>
              ) : (
                <ol className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
                  {applicationStatusTrack.map((status, index) => {
                    const isActive = currentStatusIndex >= index;
                    const isCurrent = applicationStatus === status;

                    return (
                      <li key={status} className="flex shrink-0 items-center">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${
                              isActive
                                ? "border-red-600 bg-red-600 text-white"
                                : "border-slate-300 bg-white text-slate-500"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span
                            className={`whitespace-nowrap pr-1 text-xs sm:text-sm ${
                              isCurrent
                                ? "font-semibold text-red-700"
                                : isActive
                                  ? "text-slate-900"
                                  : "text-slate-500"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {index < applicationStatusTrack.length - 1 && (
                          <span
                            className={`h-0.5 w-10 rounded ${
                              currentStatusIndex > index
                                ? "bg-red-500"
                                : "bg-slate-200"
                            }`}
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Applied Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {getDate(applicantData.application.applied_date)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Application Status</p>
                <div className="mt-2">
                  <Select
                    value={applicationStatus}
                    onValueChange={setApplicationStatus}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select application status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Hired">Hired</SelectItem>
                      <SelectItem value="Deferred">Deferred</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                <p className="text-xs text-slate-500">Current Stage</p>
                <p className="text-sm font-semibold text-slate-900">
                  {applicantData.application.stage}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                <p className="text-xs text-slate-500">Application Notes</p>
                <p className="text-sm font-semibold text-slate-900">
                  {applicantData.application.notes}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              About the Applicant
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Review applicant profile and submitted records.
            </p>

            <Tabs defaultValue={tabValue(tabs[0])} className="mt-6 w-full">
              <TabsList className="bg-transparent">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tabValue(tab)}
                    className="rounded-2xl px-4 py-2 text-gray-600 border-black/10 data-[state=active]:text-red-700 data-[state=active]:bg-red-100 data-[state=active]:border-red-200"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.name}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.email}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Mobile</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.mobile}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Status</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.status}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                    <p className="text-xs text-slate-500">Address</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.address}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                    <p className="text-xs text-slate-500">Applied On</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {getDate(applicantData.personal.date_applied)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                    <p className="text-xs text-slate-500">Notes</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {applicantData.personal.notes}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <div className="space-y-3">
                  {applicantData.education.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.level} in {item.degree}
                      </p>
                      <p className="text-sm text-slate-600">
                        {item.institution}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.year_graduate}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <div className="space-y-3">
                  {applicantData.experience.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.position}
                      </p>
                      <p className="text-sm text-slate-600">{item.company}</p>
                      <p className="text-xs text-slate-500">
                        {item.date_started} - {item.date_ended}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="credentials">
                <div className="space-y-3">
                  {applicantData.credentials.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-600">{item.authority}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="government-ids">
                <div className="space-y-3">
                  {applicantData.government_ids.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.type}
                      </p>
                      <p className="text-sm text-slate-600">{item.number}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social-media">
                <div className="space-y-3">
                  {applicantData.social_media.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.platform}
                      </p>
                      <p className="text-sm text-slate-600">{item.link}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attachments">
                <div className="space-y-3">
                  {applicantData.attachments.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}
