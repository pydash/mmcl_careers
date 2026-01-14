import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Ellipsis } from "lucide-react";

export default function RecentApplicationsButtonGroup() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="default" className="justify-start ">
            <Link href="/applicant/applications">View Application</Link>
          </Button>
          <Button
            variant="ghost"
            size="default"
            className="justify-start border border-red-500 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Withdraw Application
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
