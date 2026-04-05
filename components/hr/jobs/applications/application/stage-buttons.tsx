import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function PendingMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
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
        <Button variant="outline">More Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-blue-800">
            Schedule Interview
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Defer</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function StageButton({ status }: { status: string }) {
  const currentStatus = status.toLowerCase();

  if (currentStatus === "pending") {
    return (
      <div className="flex flex-col gap-2">
        <Button className="font-medium capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
          Schedule Interview
        </Button>
        <PendingMoreActions />
      </div>
    );
  }

  if (currentStatus === "shortlisted") {
    return (
      <div className="flex flex-col gap-2">
        <Button className="font-medium capitalize bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
          Schedule Interview
        </Button>
        <InterviewMoreActions />
      </div>
    );
  }

  if (currentStatus === "interview") {
    return (
      <div className="flex flex-col gap-2">
        <Button className="font-medium capitalize bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
          Propose Offer
        </Button>
        <InterviewMoreActions />
      </div>
    );
  }

  if (currentStatus === "deferred") {
    return (
      <span className="inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize bg-purple-100 text-purple-800">
        Deferred
      </span>
    );
  }

  if (currentStatus === "rejected") {
    return (
      <span className="inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize bg-red-100 text-red-800">
        Rejected
      </span>
    );
  }

  if (currentStatus === "hired") {
    return (
      <span className="inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize bg-green-100 text-green-800">
        Hired
      </span>
    );
  }

  return (
    <span className="inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium capitalize bg-gray-100 text-gray-800">
      {status}
    </span>
  );
}
