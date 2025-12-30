import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchX } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <Empty>
      <EmptyMedia variant={"icon"}>
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </EmptyMedia>
      <EmptyContent>
        <EmptyHeader>
          <EmptyTitle>No Data</EmptyTitle>
        </EmptyHeader>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
