"use client";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

type PitchCardProps = {
  pitch?: string;
  onPitchChange?: (value: string) => void;
};

export default function PitchCard({
  pitch = "",
  onPitchChange,
}: PitchCardProps) {
  const [pitchValue, setPitchValue] = useState(pitch);

  useEffect(() => {
    setPitchValue(pitch);
  }, [pitch]);

  const handleChange = (value: string) => {
    setPitchValue(value);
    onPitchChange?.(value);
  };
  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-xl">
      <h1 className="font-semibold text-lg">Answer question</h1>
      <Separator className="my-2" />
      <label htmlFor="pitch" className="my-6 text-muted-foreground">
        Why should we hire you?
      </label>
      <textarea
        id="pitch"
        className="w-full p-2 border border-gray-300 rounded-md resize-y min-h-25 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write your pitch here..."
        value={pitchValue}
        onChange={(e) => handleChange(e.target.value)}
      ></textarea>
    </div>
  );
}
