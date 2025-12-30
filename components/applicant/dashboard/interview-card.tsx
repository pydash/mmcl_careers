import { useState } from "react";
import IntextEmpty from "@/components/intext-empty";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import Interview from "@/models/Interview";

export default function InterviewCard() {
  const [interviews, setInterviews] = useState<Interview[]>([]); // Placeholder for fetched interviews data
  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <IntextEmpty message="You have no upcoming interviews." />
        </div>
      ) : (
        interviews.map((interview) => (
          <Item key={interview.id} className="mb-4 last:mb-0">
            <ItemContent>
              <ItemTitle>{interview.position}</ItemTitle>
              <ItemDescription>
                {interview.date} at {interview.time} with{" "}
                {interview.interviewer}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))
      )}
    </div>
  );
}
