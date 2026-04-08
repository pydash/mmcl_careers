"use client";

// React
import { useEffect, useState } from "react";

// UI components
import { Separator } from "@/components/ui/separator";

// Props contract for controlled/uncontrolled pitch input behavior
type PitchCardProps = {
  pitch?: string;
  onPitchChange?: (value: string) => void;
};

export default function PitchCard({
  pitch = "",
  onPitchChange,
}: PitchCardProps) {
  // Local draft state mirrors external `pitch` prop
  const [draftPitch, setDraftPitch] = useState(pitch);

  // Keep local draft in sync when parent updates `pitch`
  useEffect(() => {
    setDraftPitch(pitch);
  }, [pitch]);

  // Single change handler updates local state and notifies parent
  const handlePitchChange = (value: string) => {
    setDraftPitch(value);
    onPitchChange?.(value);
  };

  return (
    // Main card container
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 border border-slate-200">
      <h1 className="font-bold text-lg text-slate-900">Answer question</h1>
      <Separator className="my-3" />

      {/* Prompt and guidance */}
      <label
        htmlFor="pitch"
        className="mt-4 mb-3 text-sm font-semibold text-slate-700"
      >
        Why should we hire you?
      </label>
      <p className="mb-6 text-sm text-slate-500 leading-relaxed">
        Briefly explain what makes you the right fit for this position and the
        organization.
      </p>

      {/* Pitch input */}
      <textarea
        id="pitch"
        className="w-full p-3 text-sm border border-slate-300 min-h-30 bg-white placeholder:text-slate-400 focus:border-red-500 focus:outline-none resize-none"
        placeholder="Write your pitch here..."
        value={draftPitch}
        onChange={(e) => handlePitchChange(e.target.value)}
      ></textarea>

      {/* Live character count */}
      <div className="mt-2 flex justify-end">
        <p className="text-[10px] text-slate-400 font-medium">
          Character count: {draftPitch.length}
        </p>
      </div>
    </div>
  );
}
