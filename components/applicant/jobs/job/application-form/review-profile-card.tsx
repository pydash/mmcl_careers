import Link from "next/link";

import ReviewTabsContent from "./review-tabs-content";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ReviewProfileCard() {
  return (
    <div className="border rounded-lg bg-white">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Review Your Profile
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Verify your information is accurate and up-to-date
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-lg border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          asChild
        >
          <Link href="/applicant/profile">Edit Profile</Link>
        </Button>
      </div>
      <div className="p-6">
        <ReviewTabsContent />
      </div>
    </div>
  );
}
