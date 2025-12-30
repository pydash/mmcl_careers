export default function IntextEmpty({ message }: { message: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
