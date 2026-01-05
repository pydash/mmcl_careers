import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import JobDetailImage from "@/components/applicant/jobs/job-specific/detail-image";
import JobDetailsContainer from "@/components/applicant/jobs/job-specific/job-details-container";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <main className="flex flex-col gap-4 p-4">
        <div>
          <AppBreadcrumbs />
        </div>
        <div>
          <JobDetailImage />
        </div>
        <div>
          <JobDetailsContainer jobId={id} />
        </div>
      </main>
    </>
  );
}
