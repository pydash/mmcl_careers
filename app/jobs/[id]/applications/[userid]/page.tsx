import HRApplicationDetailsPage from "@/components/hr/jobs/applications/application-details-page";
import AdminApplicationDetailsPage from "@/components/admin/jobs/applications/application-details-page";
import { getUserRole } from "@/lib/auth";

export default async function Page() {
  const userRole = await getUserRole();

  if (userRole === "HR") {
    return <HRApplicationDetailsPage />;
  }

  if (userRole === "ADMIN") {
    return <AdminApplicationDetailsPage />;
  }

  return <div>Unauthorized</div>;
}
