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
