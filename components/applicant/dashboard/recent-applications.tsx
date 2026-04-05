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

  if (loading) return <p className="p-4 animate-pulse text-slate-500">Loading recent applications...</p>;
  if (error) return <p className="p-4 text-red-600 font-medium">Error loading applications: {error}</p>;

  return (
    <div className="p-4 md:p-6 rounded-xl bg-gray-50 border border-slate-200 shadow-sm overflow-hidden">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Recent Applications</h1>

      <div className="overflow-x-auto">
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="py-3 font-bold text-slate-700">Job Title</TableHead>
              <TableHead className="py-3 font-bold text-slate-700">Status</TableHead>
              <TableHead className="py-3 font-bold text-slate-700">Date Applied</TableHead>
              <TableHead className="py-3 text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <IntextEmpty message="You have not submitted any applications yet." />
                </TableCell>
              </TableRow>
            ) : (
              applications.slice(0, 5).map((application, index) => (
                <TableRow key={index} className="border-slate-100 hover:bg-slate-100/50 transition-colors">
                  <TableCell className="py-4 font-semibold text-slate-900">
                    {application.position}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-700">
                      {toTitleCase(application.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600 text-sm font-medium">
                    {getDate(application.dateapplied)}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <RecentApplicationsButtonGroup applicationId={application.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {applications.length > 5 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-end items-center border-t border-slate-100 pt-4">
          <Link href="/applicant/applications" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-all font-bold px-6"
            >
              View All Applications →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}