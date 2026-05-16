import Link from 'next/link';

export default function EmptyState() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-gray-300 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
      <p className="text-gray-500 mb-6">
        Bookmarks you favorite will appear here.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-700 font-medium underline"
      >
        Browse your bookmarks
      </Link>
    </div>
  );
}
