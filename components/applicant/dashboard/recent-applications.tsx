import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RecentApplicationsButtonGroup from "./recent-app-btn-group";
import IntextEmpty from "@/components/intext-empty";
import { useRecentApplications } from "@/hooks/applicant/dashboard/useRecentApplications";
import { toTitleCase } from "@/utils/formatText";
import { getDate } from "@/utils/formatDate";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RecentApplications() {
  const { applications, loading, error } = useRecentApplications();

  if (loading) return <p className="p-4">Loading recent applications...</p>;
  if (error) return <p className="p-4">Error loading applications: {error}</p>;

  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h1 className="text-xl font-semibold mb-4">Recent Applications</h1>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:py-3">
            <TableHead>Job Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                <IntextEmpty message="You have not submitted any applications yet." />
              </TableCell>
            </TableRow>
          )}

          {applications.slice(0, 1).map((application, index) => (
            <TableRow key={index} className="[&>td]:py-3">
              <TableCell>{application.position}</TableCell>
              <TableCell>{toTitleCase(application.status)}</TableCell>
              <TableCell>{getDate(application.dateapplied)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <RecentApplicationsButtonGroup applicationId={application.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {applications.length > 1 && (
        <div className="mt-4 flex justify-end">
          <Link href="/applicant/applications">
            <Button
              variant="ghost"
              size="sm"
              className="border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white transition"
            >
              View All Applications →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
