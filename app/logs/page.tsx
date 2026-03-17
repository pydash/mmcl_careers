import { getUserRole } from "@/lib/auth";
import LogsPage from "@/components/admin/logs";

export default async function Page() {
  const userRole = await getUserRole();

  if (userRole === "ADMIN") {
    return <LogsPage />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
