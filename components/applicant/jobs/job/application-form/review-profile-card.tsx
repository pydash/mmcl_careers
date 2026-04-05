import Link from "next/link";

import ReviewTabsContent from "./review-tabs-content";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ReviewProfileCard() {
  return (
    <>
      <div className="flex flex-col bg-gray-50 p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-bold text-xl text-slate-900 tracking-tight">Review Profile</h1>
          <Button variant="outline" size="sm" className="w-full sm:w-auto border-slate-300 text-slate-700 font-semibold" asChild>
            <Link href="/applicant/profile/edit">
              Edit Profile
            </Link>
          </Button>
        </div>
        
        <div className="mt-6 overflow-hidden">
          <ReviewTabsContent />
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-500 font-medium italic">
            Verify all sections above before final submission.
          </p>
        </div>
      </div>
    </>
  );
}