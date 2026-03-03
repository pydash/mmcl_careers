import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import JobDetails from "@/components/applicant/jobs/job/job-details";

export default async function JobDetailPage({
  params,
}: {
  params: { pub_id: string };
}) {
  const { pub_id } = await params;

  return (
    <>
      <main className="flex flex-col gap-4 p-2">
        <div>
          <AppBreadcrumbs />
        </div>
        <div className="">
          <JobDetails pub_id={pub_id} />
        </div>
      </main>
    </>
  );
}
