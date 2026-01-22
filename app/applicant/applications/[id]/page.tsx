import ApplicationBreadcrumbs from "@/components/applicant/applications/breadcrumb";
import ApplicationDetails from "@/components/applicant/applications/application-details";

export default async function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <main className="flex flex-col gap-4 p-2">
        <div>
          <ApplicationBreadcrumbs />
        </div>
        <div className="">
          <ApplicationDetails id={id} />
        </div>
      </main>
    </>
  );
}
