// Next.js
import Link from "next/link";

// Local components
import ReviewTabsContent from "./review-tabs-content";

// UI components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ReviewProfileCard() {
  return (
    // Main container for profile review before job application submission
    <div className="flex flex-col border border-slate-200 bg-gray-50 p-4 md:p-6">
      {/* Header: title + quick navigation to edit profile */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Review Profile
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-none border-slate-300 text-slate-700 shadow-none sm:w-auto"
          asChild
        >
          <Link href="/applicant/profile/edit">Edit Profile</Link>
        </Button>
      </div>

      {/* Main content: tabbed preview of applicant profile sections */}
      <div className="mt-6 overflow-hidden">
        <ReviewTabsContent />
      </div>

      {/* Visual divider between content and reminder */}
      <Separator className="my-6" />

      {/* Footer reminder */}
      <p className="text-xs font-medium text-slate-500">
        Verify all sections before submission
      </p>
    </div>
  );
}
