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

      {/* Main content: Added lg:ml-64 for sidebar spacing and mt-12 for mobile header clearance */}
      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link
            href="/profile"
            className="mt-12 lg:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
              Edit Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Update your HR account information and contact details.
            </p>

            <form className="mt-8 space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</Label>
                  <Input id="firstName" defaultValue={hrProfile.firstName} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</Label>
                  <Input id="lastName" defaultValue={hrProfile.lastName} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={hrProfile.email}
                    className="border-slate-200 focus-visible:ring-red-600/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</Label>
                  <Input id="phone" defaultValue={hrProfile.phone} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-xs font-bold uppercase tracking-widest text-slate-500">Employee ID</Label>
                  <Input id="employeeId" defaultValue={hrProfile.employeeId} className="bg-slate-50 border-slate-200 font-mono text-xs" readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-xs font-bold uppercase tracking-widest text-slate-500">Department</Label>
                  <Input id="department" defaultValue={hrProfile.department} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-xs font-bold uppercase tracking-widest text-slate-500">Job Position</Label>
                  <Input id="position" defaultValue={hrProfile.position} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-slate-500">Work Location</Label>
                  <Input id="location" defaultValue={hrProfile.location} className="border-slate-200 focus-visible:ring-red-600/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinedDate" className="text-xs font-bold uppercase tracking-widest text-slate-500">Joined Date</Label>
                  <Input
                    id="joinedDate"
                    type="date"
                    defaultValue={hrProfile.joinedDate}
                    className="border-slate-200 focus-visible:ring-red-600/20"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-slate-500">Professional Summary</Label>
                  <textarea
                    id="bio"
                    defaultValue={hrProfile.bio}
                    className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600/10 min-h-[120px] resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-100 pt-6">
                <Button asChild variant="ghost" className="w-full sm:w-auto text-slate-500">
                  <Link href="/profile">Cancel</Link>
                </Button>
                <Button type="submit" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 font-bold px-8">
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