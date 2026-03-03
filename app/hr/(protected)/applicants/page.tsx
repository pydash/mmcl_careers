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
import { toTitleCase } from "@/utils/formatText";

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

  const appsFilterLabels = [
    "all",
    "pending",
    "for_interview",
    "deferred",
    "offered",
  ];
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
              <TableCell>
                {application.first_name} {application.last_name}
              </TableCell>
              <TableCell>{application.title?.trim() ?? "—"}</TableCell>
              <TableCell>{getDate(application.applied_at)}</TableCell>
              <TableCell>{toTitleCase(application.status)}</TableCell>
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
    <div className="space-y-6">
      <Tabs defaultValue="applications" className="w-full">
        <div className="bg-white rounded-lg border p-2 mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger
              value="interviews"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Interviews
            </TabsTrigger>
            <TabsTrigger
              value="hire_offers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Offers
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="applications" className="mt-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="bg-white rounded-lg border p-2 mb-6">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="for_interview"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  For Interview
                </TabsTrigger>
                <TabsTrigger
                  value="deferred"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Deferred
                </TabsTrigger>
                <TabsTrigger
                  value="offered"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Offered
                </TabsTrigger>
              </TabsList>
            </div>

            {appsFilterLabels.map((label, i) => {
              return (
                <TabsContent value={label} key={i} className="mt-0">
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

        <TabsContent value="interviews" className="mt-0">
          <InterviewsTable />
        </TabsContent>

        <TabsContent value="hire_offers" className="mt-0">
          <OffersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
