import ApplicantNavbar from "@/components/applicant/navbar";
import PublicJobsPage from "@/components/public/jobs-page";
import { getUserRole } from "@/lib/auth";

export default async function ApplicantJobsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const role = await getUserRole();

  if (!role) {
    return <>{children}</>;
  }

  if (role === "APPLICANT") {
    return (
      <>
        <div className="flex">
          <ApplicantNavbar />
          <main className="flex-1 mt-16 md:mt-0 md:ml-64 p-4">{children}</main>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
