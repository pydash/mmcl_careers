"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { getDate } from "@/utils/formatDate";
import { useAllApplications } from "@/hooks/hr/applicants/useAllApplications";
import { InterviewsTable } from "@/components/hr/applicants/interviews-table";
import { useEffect, useState } from "react";
import { OffersTable } from "@/components/hr/applicants/offers-table";
import { ApplicationDetailsButton } from "@/components/hr/applicants/application-details-button";
import { off } from "process";

const applicants = [
  {
    name: "Alex Turner",
    role: "Senior Backend Engineer",
    stage: "Interview",
    status: "Active",
    updated: "Today",
  },
  {
    name: "Maria Chen",
    role: "Product Designer",
    stage: "Portfolio Review",
    status: "Active",
    updated: "1d ago",
  },
  {
    name: "Samir Patel",
    role: "QA Engineer",
    stage: "Offer",
    status: "Offer",
    updated: "2d ago",
  },
  {
    name: "Grace Hill",
    role: "People Operations Lead",
    stage: "Screen",
    status: "On hold",
    updated: "3d ago",
  },
];

export default function ApplicantsPage() {
  const [mounted, setMounted] = useState(false);
  const {
    applications: allApplications,
    loading,
    error,
  } = useAllApplications();
  const [applications, setApplications] = useState<any>(allApplications);

  useEffect(() => {
    setMounted(true);
    setApplications(allApplications);
  }, [allApplications]);

  if (!mounted) {
    return null;
  }

  const setStatus = (id: string | number, status: string) => {
    setApplications((old: any) =>
      old.map((app: any) => (app.id === id ? { ...app, status } : app)),
    );
  };

  const pendingApplications = applications.filter(
    (app: any) => app.status === "Pending",
  );
  const forInterviewApplications = applications.filter(
    (app: any) => app.status === "For interview",
  );
  const deferredApplications = applications.filter(
    (app: any) => app.status === "Deferred",
  );
  const offeredApplications = applications.filter(
    (app: any) => app.status === "Offered",
  );

  const appsFilterLabels = ["all", "pending", "for_interview", "deferred", "offered"];
  const appsFilters = [
    applications,
    pendingApplications,
    forInterviewApplications,
    deferredApplications,
    offeredApplications,
  ];

  const ApplicationsTable = ({
    applicationsList,
  }: {
    applicationsList: any[];
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Application No.</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicationsList.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No applications found
            </TableCell>
          </TableRow>
        ) : (
          applicationsList.map((application: any) => (
            <TableRow key={application.id}>
              <TableCell>{application.id}</TableCell>
              <TableCell>{application.score}</TableCell>
              <TableCell>
                {application.first_name} {application.last_name}
              </TableCell>
              <TableCell>{application.title.trim()}</TableCell>
              <TableCell>{getDate(application.applied_at)}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                <ApplicationDetailsButton
                  application={application}
                  setStatus={setStatus}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <Tabs defaultValue="applications">
      <div className="flex border-b-2 border-b-muted pb-4">
        <div>
          <TabsList className="bg-0">
            <TabsTrigger value="applications" className="shadow-none!">
              Applications
            </TabsTrigger>
            <TabsTrigger value="interviews" className="shadow-none!">
              Interviews
            </TabsTrigger>
            <TabsTrigger value="hire_offers" className="shadow-none!">
              Offers
            </TabsTrigger>
          </TabsList>
        </div>
        {/* <div className="ml-auto">asd</div> */}
      </div>
      <TabsContent value="applications">
        <Tabs defaultValue="all">
          <div className="flex border-b-2 border-b-muted pb-4">
            <div>
              <TabsList className="bg-0">
                <TabsTrigger value="all" className="shadow-none!">
                  All
                </TabsTrigger>
                <TabsTrigger value="pending" className="shadow-none!">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="for_interview" className="shadow-none!">
                  For Interview
                </TabsTrigger>
                <TabsTrigger value="deferred" className="shadow-none!">
                  Deferred
                </TabsTrigger>
                <TabsTrigger value="offered" className="shadow-none!">
                  Offered
                </TabsTrigger>
              </TabsList>
            </div>
            {/* <div className="ml-auto">asd</div> */}
          </div>
          {appsFilterLabels.map((label, i) => {
            return (
              <TabsContent value={label} key={i}>
                {loading && (
                  <div className="mt-4 text-muted-foreground">
                    Loading applications...
                  </div>
                )}
                {error && (
                  <div className="mt-4 text-destructive">Error: {error}</div>
                )}
                {!loading && !error && (
                  <ApplicationsTable applicationsList={appsFilters[i]} />
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </TabsContent>
      <TabsContent value="interviews">
        <InterviewsTable />
      </TabsContent>
      <TabsContent value="hire_offers">
     <OffersTable offers={applications.filter(app => app.status === "Offered")} />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Candidate list</p>
          <h2 className="text-xl font-semibold">Applicants</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>New applicant</Button>
        </div>
      </div>

      <Table>
        <TableCaption>Active candidates across all open roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={`${applicant.name}-${applicant.role}`}>
              <TableCell className="font-medium">{applicant.name}</TableCell>
              <TableCell>{applicant.role}</TableCell>
              <TableCell>{applicant.stage}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    applicant.status === "Offer"
                      ? "default"
                      : applicant.status === "Active"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {applicant.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {applicant.updated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
