export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-300 rounded-lg h-64"></div>
        ))}
      </div>
    </div>
  );
}