import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  { label: "Open roles", value: "18", delta: "+2 vs last week" },
  { label: "Active applicants", value: "126", delta: "+14 this week" },
  { label: "Interviews scheduled", value: "24", delta: "8 today" },
  { label: "Offers out", value: "9", delta: "4 awaiting response" },
];

const pipeline = [
  { stage: "Applied", count: 340, percent: 72 },
  { stage: "Screen", count: 190, percent: 54 },
  { stage: "Interview", count: 88, percent: 28 },
  { stage: "Offer", count: 22, percent: 12 },
];

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
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{item.value}</span>
              <Badge variant="secondary">{item.delta}</Badge>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pipeline health</p>
              <h3 className="text-lg font-semibold">This week</h3>
            </div>
            <Button size="sm" variant="outline">
              Export
            </Button>
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
            <Button size="sm" variant="default">
              Schedule
            </Button>
          </div>
          <Separator className="my-4" />
          <ul className="space-y-3">
            {[
              "10:00 AM · Product Designer",
              "1:00 PM · Backend Engineer",
              "3:30 PM · Data Analyst",
            ].map((slot) => (
              <li
                key={slot}
                className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
              >
                <span className="text-sm">{slot}</span>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </li>
            ))}
          </ul>
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
