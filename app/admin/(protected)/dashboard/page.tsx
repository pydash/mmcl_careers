"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOverview from "@/hooks/hr/dashboard/useOverview";

export default function DashboardPage() {
  const { overviewData, loading, error } = useOverview();

  const appliedCount =
    overviewData?.pipeline?.pipeline_health?.applied_count ?? 0;
  const interviewCount =
    overviewData?.pipeline?.pipeline_health?.interview_count ?? 0;
  const offerCount = overviewData?.pipeline?.pipeline_health?.offer_count ?? 0;
  const pipelineTotal = appliedCount + interviewCount + offerCount;

  const toPercent = (count: number) =>
    pipelineTotal > 0 ? Math.round((count / pipelineTotal) * 100) : 0;

  const pipeline = [
    { stage: "Applied", count: appliedCount, percent: toPercent(appliedCount) },
    {
      stage: "Interview",
      count: interviewCount,
      percent: toPercent(interviewCount),
    },
    { stage: "Offer", count: offerCount, percent: toPercent(offerCount) },
  ];

  const upcomingInterviews = overviewData?.interviews ?? [];
  const recentApplicants = overviewData?.recent_applicants ?? [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading dashboard data: {String(error)}</div>;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-red-500">Total jobs</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">
              {overviewData?.stats?.total_jobs ?? 0}
            </span>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-red-500">Total applications</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">
              {overviewData?.stats?.total_applications ?? 0}
            </span>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-red-500">Open jobs</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">
              {overviewData?.stats?.open_jobs ?? 0}
            </span>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-red-500">Pending applications</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">
              {overviewData?.stats?.pending_applications ?? 0}
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Pipeline Health</h3>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {pipeline.map((stage) => (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{stage.stage}</span>
                  <span className="text-muted-foreground">{stage.count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${stage.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Upcoming interviews
              </p>
              <h3 className="text-lg font-semibold">Today</h3>
            </div>
          </div>
          <Separator className="my-4" />
          <ul className="space-y-3">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview: any) => (
                <li
                  key={interview.application_id}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <span className="text-sm">
                    {new Date(interview.scheduled_at).toLocaleString()} ·{" "}
                    {interview.name}
                  </span>
                  <Button size="sm" variant="ghost">
                    Details
                  </Button>
                </li>
              ))
            ) : (
              <li className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                No upcoming interviews
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Quick actions</p>
            <h3 className="text-lg font-semibold">Shortcuts</h3>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Button asChild className="w-full bg-red-600 hover:bg-red-700">
            <Link href="/admin/jobs/post-a-job">Post New Job</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/applicants">Review Applicants</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/analytics">View Analytics</Link>
          </Button>
        </div>
      </section>

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
            {recentApplicants.map((applicant: any) => (
              <TableRow key={`${applicant.name}-${applicant.title}`}>
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{applicant.status}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(applicant.applied_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
