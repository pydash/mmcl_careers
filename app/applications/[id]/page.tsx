import AdminApplicationPage from "@/components/admin/applications/application-page";
import ApplicantApplicationPage from "@/components/applicant/applications/application-page";
import HRApplicationPage from "@/components/hr/applications/application-page";
import NotPermittedPage from "@/components/not-permitted-page";
import { getUserRole } from "@/lib/auth";

export default async function ApplicationPage() {
  const role = await getUserRole();

  if (!role) {
    return <NotPermittedPage />;
  }

  if (role === "APPLICANT") {
    return <ApplicantApplicationPage />;
  }

  if (role === "HR") {
    return <HRApplicationPage />;
  }

  if (role === "ADMIN") {
    return <AdminApplicationPage />;
  }
}
