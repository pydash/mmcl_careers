type NotificationData = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

function UnreadIndicator({ read }: { read: boolean }) {
  if (read) return null;

  return <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />;
}

export default function NotificationItem({ data }: { data: NotificationData }) {
  return (
    <div
      className={
        data.read
          ? "notif-item p-4 hover:bg-gray-100"
          : "notif-item p-4 hover:bg-gray-100"
      }
    >
      <div className="flex gap-4 items-center mb-2">
        <time className="notif-timestamp">{data.timestamp}</time>
        <UnreadIndicator read={data.read} />
      </div>
      <h3 className="notif-title font-semibold">{data.title}</h3>
      <p className="notif-message">{data.message}</p>
    </div>
  );
}
