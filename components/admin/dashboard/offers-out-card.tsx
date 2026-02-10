export default function OffersOutCard({ count }: { count?: number }) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">Offers out</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold">{count ?? 0}</span>
      </div>
    </div>
  );
}
