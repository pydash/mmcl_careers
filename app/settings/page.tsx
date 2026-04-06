import { getUserRole } from "@/lib/auth";
import ApplicantSettings from "@/components/applicant/settings";

export default async function SettingsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantSettings />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
