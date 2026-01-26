"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/utils/formatDate";
import { useAllInterviews } from "@/hooks/hr/applicants/useAllInterviews";

export function InterviewsTable() {
  const { interviews, loading, error } = useAllInterviews();

  return (
    <>
      {loading && (
        <div className="mt-4 text-muted-foreground">Loading interviews...</div>
      )}
      {error && <div className="mt-4 text-destructive">Error: {error}</div>}
      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No interviews found
                </TableCell>
              </TableRow>
            ) : (
              interviews.map((interview: any) => (
                <TableRow key={interview.id}>
                  <TableCell>{interview.id}</TableCell>
                  <TableCell>
                    {interview.first_name} {interview.last_name}
                  </TableCell>
                  <TableCell>{interview.title.trim()}</TableCell>
                  <TableCell>{getDate(interview.scheduled_at)}</TableCell>
                  <TableCell>{interview.email}</TableCell>
                  {/* <TableCell><JobViewButton jobId={job.id} /></TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
