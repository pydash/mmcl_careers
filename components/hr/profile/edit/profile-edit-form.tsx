import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HRNavbar from "@/components/hr/ui/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const hrProfile = {
  firstName: "Maria",
  lastName: "Santos",
  email: "maria.santos@mmcl.edu.ph",
  phone: "+63 917 000 4455",
  department: "Human Resources",
  position: "HR Recruitment Officer",
  location: "Makati Campus",
  employeeId: "HR-2021-014",
  joinedDate: "2021-03-12",
  bio: "Handles end-to-end recruitment, candidate screening, and interview coordination for academic and non-academic roles.",
};

export default function HrProfileEdit() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Edit Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Update your HR account information and contact details.
            </p>

            <form className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={hrProfile.firstName} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={hrProfile.lastName} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={hrProfile.email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={hrProfile.phone} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" defaultValue={hrProfile.employeeId} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue={hrProfile.department} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue={hrProfile.position} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={hrProfile.location} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinedDate">Joined Date</Label>
                  <Input
                    id="joinedDate"
                    type="date"
                    defaultValue={hrProfile.joinedDate}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Professional Summary</Label>
                  <textarea
                    id="bio"
                    defaultValue={hrProfile.bio}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
                <Button asChild variant="outline">
                  <Link href="/profile">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
