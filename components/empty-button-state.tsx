import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyButtonState({
  message,
  goToLink,
}: {
  message: string;
  goToLink: string;
}) {
  return (
    <Empty className="gap-2">
      <EmptyContent>
        <EmptyDescription>{message}</EmptyDescription>
        <Button variant="default" size="default">
          <Link href={goToLink}> Upload Resume </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
