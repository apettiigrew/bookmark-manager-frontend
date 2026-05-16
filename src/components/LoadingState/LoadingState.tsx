interface LoadingStateProps {
  count?: number;
}

export default function LoadingState({ count = 6 }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label="Loading favorites..."
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-lg border border-gray-200 p-4 flex gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
