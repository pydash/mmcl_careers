import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemMedia,
  ItemContent,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Paperclip, SquareArrowOutUpRight } from "lucide-react";

type DashboardResumeProps = {
  data: {
    fileName: string;
    uploadDate: string;
  };
};

export default function DashboardResume({ data }: DashboardResumeProps) {
  return (
    <div className="flex flex-col bg-gray-200 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Your Resume</h2>
      <Item className="bg-gray-300">
        <div className="flex flex-row gap-3">
          <ItemMedia>
            <Paperclip className="size-6" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-xl font-semibold">
              {data.fileName}
            </ItemTitle>
            <ItemDescription className="text-gray-700">
              Uploaded on: {data.uploadDate}
            </ItemDescription>
          </ItemContent>
        </div>
      </Item>
      <Button className="mt-4 self-end" variant="default" size="sm">
        Open
        <SquareArrowOutUpRight className="size-4" />
      </Button>
    </div>
  );
}
