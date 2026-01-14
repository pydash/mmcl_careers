import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RecentApplicationsButtonGroup from "./recent-app-btn-group";

import { Ellipsis } from "lucide-react";
import IntextEmpty from "@/components/intext-empty";
import { useRecentApplications } from "@/hooks/applicant/dashboard/useRecentApplications";
import { toTitleCase } from "@/utils/formatText";
import { getDate } from "@/utils/formatDate";

export default function RecentApplications() {
  const { applications, loading, error } = useRecentApplications();
  if (loading) return <p className="p-4">Loading recent applications...</p>;
  if (error) return <p className="p-4">Error loading applications: {error}</p>;
  return (
    <>
      <div className="p-4 rounded-xl bg-gray-50">
        <h1 className="text-xl font-semibold mb-4">Recent Applications</h1>
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:py-3">
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
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
            {applications.map((application, index) => (
              <TableRow key={index} className="[&>td]:py-3">
                <TableCell>{application.position}</TableCell>
                <TableCell>{toTitleCase(application.status)}</TableCell>
                <TableCell>{getDate(application.dateapplied)}</TableCell>
                <TableCell className="flex items-center">
                  <RecentApplicationsButtonGroup />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
