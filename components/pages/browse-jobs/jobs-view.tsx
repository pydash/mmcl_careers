"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Rows } from "lucide-react";

type Props = {
  view: "grid" | "row";
  setView: (v: "grid" | "row") => void;
};

export default function JobsView({ view, setView }: Props) {
  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant={view === "grid" ? "default" : "outline"}
        onClick={() => setView("grid")}
      >
        <LayoutGrid className="size-4" />
      </Button>

      <Button
        size="icon"
        variant={view === "row" ? "default" : "outline"}
        onClick={() => setView("row")}
      >
        <Rows className="size-4" />
      </Button>
    </div>
  );
}
