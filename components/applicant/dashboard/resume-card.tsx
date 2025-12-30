import { useState } from "react";

import {
  Item,
  ItemMedia,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemDescription,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/empty-state";

import { FileUser } from "lucide-react";
import Resume from "@/models/Resume";

export default function ResumeCard() {
  const [resume, setResume] = useState<Resume | null>(null);
  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h1 className="text-xl font-semibold mb-4">Resume</h1>
      {resume ? (
        <Item>
          <ItemMedia>
            <FileUser className="h-8 w-8 text-primary" />
          </ItemMedia>
          <ItemContent>
            <ItemHeader>
              <h2 className="font-semibold">{resume.fileName}</h2>
            </ItemHeader>
            <ItemDescription>Last updated: {resume.uploadDate}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </ItemActions>
        </Item>
      ) : (
        <EmptyState message="You have not uploaded a resume yet." />
      )}
    </div>
  );
}
