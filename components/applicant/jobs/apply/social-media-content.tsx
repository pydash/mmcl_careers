import { SocialMediaInfo } from "@/models/user";

export default function SocialMediaContent({
  media,
}: {
  media: SocialMediaInfo[];
}) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {media.map((account, index) => (
          <div
            className="space-y-1 bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
            key={index}
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {account.platform}
            </p>
            <div className="flex items-center">
              <a
                href={account.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors break-all line-clamp-1 hover:underline"
                title={account.link}
              >
                {account.link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}