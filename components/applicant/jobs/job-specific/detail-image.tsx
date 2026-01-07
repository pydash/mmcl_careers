import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function JobDetailImage() {
  return (
    <AspectRatio ratio={21 / 4} className="rounded-xl bg-muted">
      <Image
        src="https://placehold.co/2100x400.png"
        alt={`Job detail background image`}
        fill
        className="object-cover rounded-xl"
      />
    </AspectRatio>
  );
}
