import { getUserRole } from "@/lib/auth";
import AdminAccounts from "@/components/admin/accounts/accounts-page";

export default async function AccountsPage() {
  const userRole = await getUserRole();

  if (userRole === "ADMIN") {
    return <AdminAccounts />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
