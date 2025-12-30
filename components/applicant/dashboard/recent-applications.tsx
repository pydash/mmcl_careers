import { useState } from "react";
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

import { Ellipsis } from "lucide-react";
import Application from "@/models/Application";
import IntextEmpty from "@/components/intext-empty";

export default function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>([]); // Placeholder for fetched applications data

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
            {applications.map((application) => (
              <TableRow key={application.id} className="[&>td]:py-3">
                <TableCell>{application.position}</TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell>{application.dateApplied}</TableCell>
                <TableCell className="flex justify-center">
                  <Button variant="link" size="sm">
                    <Ellipsis />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
