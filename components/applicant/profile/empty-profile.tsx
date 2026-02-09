import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";

export default function EmptyProfile() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BrushCleaning className="h-24 w-24 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Setup your Profile</EmptyTitle>
        <EmptyDescription>
          You haven't created a profile yet. Get started by adding your details.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/applicant/profile/create-profile">Create Profile</a>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
