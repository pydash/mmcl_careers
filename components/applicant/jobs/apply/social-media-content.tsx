import { SocialMediaInfo } from "@/models/user";

export default function SocialMediaContent({
  media,
}: {
  media: SocialMediaInfo[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {media.map((account, index) => (
          <div
            className="space-y-1 bg-white border border-slate-200 rounded-lg p-4"
            key={index}
          >
            <p className="text-sm font-semibold text-slate-900">
              {account.platform}
            </p>
            <a
              href={account.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {account.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
