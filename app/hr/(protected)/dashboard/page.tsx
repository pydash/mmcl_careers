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
import RecentApplicants from "@/components/hr/dashboard/recent-applicants";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Stats />

      <section className="grid gap-6 lg:grid-cols-2">
        <PipelineHealth />
        <UpcomingInterviews />
      </section>

      <RecentApplicants />
    </div>
  );
}
