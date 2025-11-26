type NotificationData = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export default function NotificationItem({ data }: { data: NotificationData }) {
  return (
    <div className={data.read ? "notif-item" : "bg-gray-200 notif-item"}>
      <time className="notif-timestamp">{data.timestamp}</time>
      <h3 className="notif-title font-semibold">{data.title}</h3>
      <p className="notif-message">{data.message}</p>
    </div>
  );
}
