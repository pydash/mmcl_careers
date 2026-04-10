// Local components
import ApplicationBreadcrumbs from "@/components/applicant/applications/breadcrumb";
import ApplicationDetails from "@/components/applicant/applications/application-details";

type ApplicationPageProps = {
  // In this app setup, params is awaited before usage
  params: Promise<{ id: string }>;
};

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  // Resolve dynamic route parameter
  const { id } = await params;

  return (
    // Page layout wrapper for breadcrumbs + details
    <main className="flex flex-col gap-4 p-2">
      <ApplicationBreadcrumbs />
      <ApplicationDetails id={id} />
    </main>
  );
}
