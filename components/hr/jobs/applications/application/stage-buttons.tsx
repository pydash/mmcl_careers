import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function PendingMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          More Actions
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 lg:w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>Shortlist</DropdownMenuItem>
          <DropdownMenuItem>Defer</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InterviewMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          More Actions
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 lg:w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-blue-800">
            Schedule Interview
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Defer</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function StageButton({ status }: { status: string }) {
  const currentStatus = status.toLowerCase();

  const ActionWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-2 w-full sm:flex-row lg:flex-col">
      {children}
    </div>
  );

  if (currentStatus === "pending") {
    return (
      <ActionWrapper>
        <Button className="w-full font-medium capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors shadow-none border-none">
          Schedule Interview
        </Button>
        <PendingMoreActions />
      </ActionWrapper>
    );
  }

  if (currentStatus === "shortlisted") {
    return (
      <ActionWrapper>
        <Button className="w-full font-medium capitalize bg-green-100 text-green-800 hover:bg-green-200 transition-colors shadow-none border-none">
          Schedule Interview
        </Button>
        <InterviewMoreActions />
      </ActionWrapper>
    );
  }

  if (currentStatus === "interview") {
    return (
      <ActionWrapper>
        <Button className="w-full font-medium capitalize bg-green-100 text-green-800 hover:bg-green-200 transition-colors shadow-none border-none">
          Propose Offer
        </Button>
        <InterviewMoreActions />
      </ActionWrapper>
    );
  }

  const badgeStyles: Record<string, string> = {
    deferred: "bg-purple-100 text-purple-800",
    rejected: "bg-red-100 text-red-800",
    hired: "bg-green-100 text-green-800",
  };

  const currentStyle = badgeStyles[currentStatus] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${currentStyle}`}
    >
      {status}
    </span>
  );
}