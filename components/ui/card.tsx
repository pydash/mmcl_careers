export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gray-100 rounded-lg border border-gray-200 w-full p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}