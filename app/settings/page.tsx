import { getUserRole } from "@/lib/auth";
import ApplicantSettings from "@/components/applicant/settings";
import HRSettings from "@/components/hr/settings/settings-page";
import AdminSettings from "@/components/admin/settings/settings-page";

export default async function SettingsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantSettings />;
  }

  if (userRole === "HR") {
    return <HRSettings />;
  }

  if (userRole === "ADMIN") {
    return <AdminSettings />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
