import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import { Separator } from "../../ui/separator";

export default function JobsSort() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Sort
            <ChevronRight className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>A to Z</DropdownMenuItem>
          <DropdownMenuItem>Z to A</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>Most Recent</DropdownMenuItem>
          <DropdownMenuItem>Oldest</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
