"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SavedButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="hover:bg-muted rounded-full p-2"
    >
      <Star
        className={`h-5 w-5 transition ${
          isFavorited ? "fill-yellow-400 text-yellow-500" : "text-gray-400"
        }`}
      />
    </Button>
  );
}
