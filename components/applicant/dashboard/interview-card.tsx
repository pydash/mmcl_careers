import { useState } from "react";
import IntextEmpty from "@/components/intext-empty";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";
import Interview from "@/models/Interview";
import { getDateTime } from "@/utils/formatDate";
import { useInterviews } from "@/hooks/applicant/dashboard/useInterviews";

export default function InterviewCard() {
  const { interviews, loading, error } = useInterviews();
  if (loading) return <p className="p-4">Loading upcoming interviews...</p>;
  if (error) return <p className="p-4">Error loading interviews: {error}</p>;
  return (
    <div className="p-4 rounded-xl bg-gray-50 self-start">
      <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <IntextEmpty message="You have no upcoming interviews." />
        </div>
      ) : (
        interviews.map((interview, index) => (
          <Item key={index} className="mb-4 last:mb-0 hover:bg-gray-100">
            <ItemContent>
              <ItemTitle>{interview.title}</ItemTitle>
              <ItemDescription>
                {getDateTime(interview.schedule)} | {interview.mode}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))
      )}
    </div>
  );
}
