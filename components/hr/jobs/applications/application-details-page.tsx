"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getDate, getDateTime } from "@/lib/datetime.helpers";
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

const applicationHistory = [
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

export default function HRApplicationDetailsPage() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href={`/jobs/${id}/applications`}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          {/* Application Status Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  Application Details
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Ref ID: <span className="font-mono text-slate-700">APP-{id?.toString().slice(0, 8)}</span>
                </p>
              </div>

              <Button
                variant="outline"
                className="gap-2 border-slate-200 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Export Profile
              </Button>
            </div>

            <div className="mt-8 space-y-6">
              {/* Status Tracking Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status History</p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[180px] text-xs font-semibold">Date & Time</TableHead>
                        <TableHead className="w-[150px] text-xs font-semibold">Status</TableHead>
                        <TableHead className="text-xs font-semibold">Activity Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicationHistory.map((item, index) => (
                        <TableRow key={index} className="hover:bg-slate-50/50">
                          <TableCell className="text-sm text-slate-600">{getDateTime(item.date)}</TableCell>
                          <TableCell className="text-sm font-medium">{item.status}</TableCell>
                          <TableCell className="text-sm text-slate-600">{item.info}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Action and Contextual Info */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/30">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Date Applied</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {getDate(applicantData.application.applied_date)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/30">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">HR Internal Notes</p>
                  <p className="text-sm text-slate-700 line-clamp-2">
                    {applicantData.application.notes}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 flex items-center justify-center bg-white">
                  <StageButton status={applicantData.application.status} />
                </div>
              </div>
            </div>
          </section>

          {/* Applicant Profile Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Applicant Profile
              </h2>
              <p className="text-sm text-slate-500">Comprehensive view of candidate credentials.</p>
            </div>

            <Tabs defaultValue={tabValue(tabs[0])} className="w-full">
              <div className="overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="bg-transparent h-auto p-0 flex justify-start border-b border-slate-200 rounded-none min-w-max">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tabValue(tab)}
                      className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm text-slate-500 whitespace-nowrap transition-all data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 font-medium"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-6 px-1">
                <TabsContent value="personal" className="focus-visible:outline-none">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { label: "Full Name", value: applicantData.personal.name },
                      { label: "Email Address", value: applicantData.personal.email },
                      { label: "Mobile Number", value: applicantData.personal.mobile },
                      { label: "Permanent Address", value: applicantData.personal.address, full: true },
                      { label: "Application Notes", value: applicantData.personal.notes, full: true },
                    ].map((field, idx) => (
                      <div key={idx} className={`space-y-1 p-4 rounded-xl border border-slate-100 bg-slate-50/20 ${field.full ? "sm:col-span-2" : ""}`}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{field.label}</p>
                        <p className="text-sm font-semibold text-slate-800">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="focus-visible:outline-none">
                  <div className="space-y-3">
                    {applicantData.education.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-sm font-bold text-slate-900">{item.level} in {item.degree}</p>
                        <p className="text-sm text-slate-600">{item.institution}</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium italic">Class of {item.year_graduate}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="focus-visible:outline-none">
                  <div className="space-y-3">
                    {applicantData.experience.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-sm font-bold text-slate-900">{item.position}</p>
                        <p className="text-sm text-slate-600">{item.company}</p>
                        <p className="text-xs font-semibold text-red-600 mt-1">{item.date_started} — {item.date_ended}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="credentials" className="focus-visible:outline-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicantData.credentials.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Issuing Body</p>
                        <p className="text-sm font-bold text-slate-900 mb-1">{item.authority}</p>
                        <p className="text-sm text-slate-700">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="government-ids" className="focus-visible:outline-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicantData.government_ids.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.type}</p>
                        <p className="text-sm font-mono font-bold text-slate-800">{item.number}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="social-media" className="focus-visible:outline-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicantData.social_media.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.platform}</p>
                        <a href={`https://${item.link}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline break-all">
                          {item.link}
                        </a>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="focus-visible:outline-none">
                  <div className="space-y-2">
                    {applicantData.attachments.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/20">
                        <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}