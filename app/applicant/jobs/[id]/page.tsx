import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import JobDetails from "@/components/applicant/jobs/job/job-details";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <main className="flex flex-col gap-4 p-2">
        <div>
          <AppBreadcrumbs />
        </div>
        <div className="">
          <JobDetails job_pub_id={id} />
        </div>
      </main>
    </>
  );
}
