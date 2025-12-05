import { Separator } from "@/components/ui/separator";
import { userData } from "@/app/sample-data";
import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import {
  Mail,
  Phone,
  Home,
  Calendar,
  VenusAndMars,
  Heart,
  BadgeInfo,
  Info,
  Badge,
} from "lucide-react";
import Link from "next/link";

const infoItems = [
  { label: "Email", value: userData.basic.email },
  { label: "Phone", value: userData.basic.phone },
  { label: "Address", value: userData.basic.address },
  { label: "Date of Birth", value: userData.basic.dateOfBirth },
  { label: "Gender", value: userData.basic.gender },
  { label: "Civil Status", value: userData.basic.civilStatus },
];

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Item className="border p-4" variant="outline">
      <ItemMedia className="border-0">
        <div className="p-3 rounded-md border flex items-center justify-center">
          {label === "Email" && <Mail className="size-5" />}
          {label === "Phone" && <Phone className="size-5" />}
          {label === "Address" && <Home className="size-5" />}
          {label === "Date of Birth" && <Calendar className="size-5" />}
          {label === "Gender" && <VenusAndMars className="size-5" />}
          {label === "Civil Status" && <Heart className="size-5" />}
        </div>
      </ItemMedia>

      <div className="flex flex-col">
        <ItemTitle>{value}</ItemTitle>
        <ItemDescription>{label}</ItemDescription>
      </div>
    </Item>
  );
}

function SocialMediaItem({ platform, url }: { platform: string; url: string }) {
  return (
    <Link
      href={url}
      key={platform}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className=" border p-4 rounded-md hover:bg-primary/2 flex gap-4">
        <div className="p-3 rounded-md border flex items-center justify-center">
          <BadgeInfo className="size-5" />
        </div>
        <div className="">
          <h1 className="text-sm font-medium">{platform}</h1>
          <p className="line-clamp-1 text-sm text-muted-foreground">{url}</p>
        </div>
      </div>
    </Link>
  );
}

export default function PersonalTab() {
  return (
    <>
      <div className="about-info mb-6">
        <div className="font-semibold">About</div>
        <Separator className="my-4" />
        <p className="text-md mb-4">{userData.basic.about}</p>
        <div className="grid grid-cols-4 gap-6">
          {infoItems.map((item) => (
            <InfoItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold">Social Media</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6">
          {userData.basic.socialMedia.map((social) => (
            <SocialMediaItem
              key={social.platform}
              platform={social.platform}
              url={social.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
