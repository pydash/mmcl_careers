import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function EmptyState({ message }: { message: string }) {
  return (
    <Empty className="gap-2">
      <EmptyContent>
        <EmptyDescription>{message}</EmptyDescription>
        <Button variant="default" size="default">
          Upload Resume
        </Button>
      </EmptyContent>
    </Empty>
  );
}
