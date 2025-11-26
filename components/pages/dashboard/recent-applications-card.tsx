import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type RecentApplicationProps = {
  jobTitle: string;
  status: string;
  dateApplied: string;
}[];

export default function RecentApplicationsCard({
  data,
}: {
  data: RecentApplicationProps;
}) {
  return (
    <>
      <div className="flex flex-col bg-gray-200 rounded-xl p-4">
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <Separator className="mb-4 bg-gray-400" />
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Job Title</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Date Applied</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((application, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {application.jobTitle}
                </TableCell>

                <TableCell className="text-center">
                  {application.status}
                </TableCell>

                <TableCell className="text-center">
                  {application.dateApplied}
                </TableCell>

                {/* FIX: Wrap button in TableCell */}
                <TableCell className="text-center">
                  <Button className="mx-auto" variant="secondary" size="sm">
                    View Details
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
