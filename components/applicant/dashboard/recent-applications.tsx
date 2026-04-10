// Next.js
import Link from "next/link";

// UI components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Shared components
import IntextEmpty from "@/components/intext-empty";

// Hooks
import { useRecentApplications } from "@/hooks/applicant/dashboard/useRecentApplications";

// Utilities
import { toTitleCase } from "@/lib/text.helpers";
import { getDate } from "@/lib/datetime.helpers";

export default function RecentApplications() {
  const { applications, loading, error } = useRecentApplications();
  const hasApplications = applications.length > 0;
  const visibleApplications = applications.slice(0, 5);

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="text-red-600 animate-pulse">Error: {error}</p>
      </div>
    );
  }

  return (
    // Main recent applications panel
    <div className="p-4 md:p-6 bg-gray-50 border border-slate-200 overflow-hidden">
      <h1 className="text-xl font-bold text-slate-900 mb-6">
        Recent Applications
      </h1>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <Table className="min-w-150 md:min-w-full">
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="py-3 font-bold text-slate-700">
                Job Title
              </TableHead>
              <TableHead className="py-3 font-bold text-slate-700">
                Status
              </TableHead>
              <TableHead className="py-3 font-bold text-slate-700">
                Date Applied
              </TableHead>
              <TableHead className="py-3 text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!hasApplications ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <IntextEmpty message="You have not submitted any applications yet." />
                </TableCell>
              </TableRow>
            ) : (
              visibleApplications.map((application) => {
                const app = application as any;

                return (
                  <TableRow
                    key={app.id}
                    className="border-slate-100 hover:bg-slate-100/50 transition-colors"
                  >
                    <TableCell className="py-4 font-semibold text-slate-900">
                      {app.position}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-blue-100 text-blue-700">
                        {toTitleCase(app.status)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-slate-600 text-sm font-medium">
                      {getDate(app.applied_at)}
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-none"
                        asChild
                      >
                        <Link
                          href={`/applicant/applications/${app.id}`}
                          className="w-full sm:w-auto"
                        >
                          View Application
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Secondary action when there are more records than preview rows */}
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
