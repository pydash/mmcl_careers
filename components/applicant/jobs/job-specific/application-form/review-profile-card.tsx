import Link from "next/link";

import ReviewTabsContent from "./review-tabs-content";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ReviewProfileCard() {
  return (
    <>
      <div className="flex flex-col bg-gray-50 p-4 rounded-xl">
        <h1 className="font-semibold text-xl">Review Profile</h1>
        <div className="mt-4">
          <ReviewTabsContent />
        </div>
        <Separator className="my-2" />
        <Button variant="default" className="self-start" asChild>
          <Link href="/applicant/applications" className="flex items-center">
            Edit
          </Link>
        </Button>
      </div>
    </>
  );
}
