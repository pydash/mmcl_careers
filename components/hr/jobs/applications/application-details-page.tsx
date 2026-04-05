"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getDate, getDateTime } from "@/lib/datetime.helpers";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import StageButton from "./application/stage-buttons";

const applicantData = {
  personal: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+63 912 345 6789",
    address: "Makati City, Philippines",
    date_applied: "2024-02-25T00:00:00Z",
    status: "Interview",
    notes: "Strong in full-stack development with React and Node.js.",
  },
  application: {
    applied_date: "2024-02-25T00:00:00Z",
    status: "Shortlisted",
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

type ApplicationHistoryItem = {
  date: string;
  status: string;
  info: string;
};

const applicationHistory: ApplicationHistoryItem[] = [
  {
    date: "2024-02-25T00:00:00Z",
    status: "Pending",
    info: "Application submitted.",
  },
  {
    date: "2024-02-27T00:00:00Z",
    status: "Shortlisted",
    info: "Application shortlisted for review.",
  },
  {
    date: "2024-03-01T00:00:00Z",
    status: "Interview",
    info: "Scheduled for interview on March 5th.",
  },
];

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
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href={`/jobs/${id}/applications`}
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
              >
                <Download className="h-4 w-4" />
                Download Details
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6">
              {/* Row 1 - Status Track (Full Width) */}
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Track Status</p>
                <Table className="w-full text-sm">
                  <TableHeader>
                    <TableRow className="border-b border-slate-200">
                      <TableHead className="text-left py-2 px-3 text-xs font-semibold text-slate-600">
                        Date & Time
                      </TableHead>
                      <TableHead className="text-left py-2 px-3 text-xs font-semibold text-slate-600">
                        Status
                      </TableHead>
                      <TableHead className="text-left py-2 px-3 text-xs font-semibold text-slate-600">
                        Info
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationHistory.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <TableCell className="py-3 px-3 text-slate-700">
                          {getDateTime(item.date)}
                        </TableCell>
                        <TableCell className="py-3 px-3">
                          {item.status}
                        </TableCell>
                        <TableCell className="py-3 px-3">{item.info}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Row 2 - 3 Column Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Date Applied</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {getDate(applicantData.application.applied_date)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Note to Applicant</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {applicantData.application.notes}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 flex flex-col gap-2">
                  <StageButton status={applicantData.application.status} />
                </div>
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
