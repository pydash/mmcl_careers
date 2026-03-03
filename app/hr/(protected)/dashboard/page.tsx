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
import Stats from "@/components/hr/dashboard/stats";
import PipelineHealth from "@/components/hr/dashboard/pipeline-health";
import UpcomingInterviews from "@/components/hr/dashboard/upcoming-interviews";

const recentApplicants = [
  {
    name: "Alex Turner",
    role: "Product Designer",
    stage: "Interview",
    submitted: "Today",
  },
  {
    name: "Maria Chen",
    role: "Data Analyst",
    stage: "Screen",
    submitted: "1d ago",
  },
  {
    name: "Samir Patel",
    role: "Backend Engineer",
    stage: "Offer",
    submitted: "2d ago",
  },
  {
    name: "Grace Hill",
    role: "HR Coordinator",
    stage: "Applied",
    submitted: "3d ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Stats />

      <section className="grid gap-6 lg:grid-cols-2">
        <PipelineHealth />
        <UpcomingInterviews />
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
            {recentApplicants.map((applicant) => (
              <TableRow key={`${applicant.name}-${applicant.role}`}>
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.role}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{applicant.stage}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {applicant.submitted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
