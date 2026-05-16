'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Bookmarks' },
  { href: '/favorites', label: 'Favorites' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-6">
      <span className="font-semibold text-gray-900 mr-4">Bookmark Manager</span>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
            pathname === href
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
