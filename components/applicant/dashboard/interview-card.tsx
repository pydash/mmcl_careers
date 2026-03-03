import { useState } from "react";
import IntextEmpty from "@/components/intext-empty";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";
import { getDateTime } from "@/utils/formatDate";
import { useInterviews } from "@/hooks/applicant/dashboard/useInterviews";
import { toTitleCase } from "@/utils/formatText";
import Link from "next/link";

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
          <Link
            key={index}
            href={`/applicant/applications/${interview.application_id}`}
            className="block mb-4 last:mb-0 hover:bg-gray-100 rounded-lg"
          >
            <Item>
              <ItemContent>
                <ItemTitle>
                  Interview for {toTitleCase(interview.position)}
                </ItemTitle>
                <ItemDescription>
                  {getDateTime(interview.scheduled_at.toString())} |{" "}
                  {toTitleCase(interview.mode)}
                </ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        ))
      )}
    </div>
  );
}
