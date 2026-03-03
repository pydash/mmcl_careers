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
import { getDateTime, getTimeAgo } from "@/utils/formatDate";
import { toTitleCase } from "@/utils/formatText";
import { getTime } from "date-fns";
import { useEffect, useState } from "react";

interface ApplicantStats {
  name: string;
  role: string;
  status: string;
  submitted: string;
}

export default function RecentApplicants() {
  const [applicants, setApplicants] = useState<ApplicantStats[] | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/hr/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setApplicants(data?.recent_applicants?.recent_applicants || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="h-8 w-48 bg-muted rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border bg-red-50 p-4">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  const applicantsList = applicants || [];

  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Recent applicants</p>
          <h3 className="text-lg font-semibold">New this week</h3>
        </div>
        <Button size="sm" variant="outline">
          View all
        </Button>
      </div>
      <Table className="mt-4">
        <TableCaption>Latest submissions across all open roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantsList.map((applicant) => (
            <TableRow key={`${applicant.name}-${applicant.role}`}>
              <TableCell className="font-medium">{applicant.name}</TableCell>
              <TableCell>{applicant.role}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {toTitleCase(applicant.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {getDateTime(applicant.submitted)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
