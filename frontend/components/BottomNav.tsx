'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'ARENA' },
  { href: '/leaderboard', label: 'RANKS' },
  { href: '/history', label: 'STATS' },
  { href: '/gallery', label: 'NFTs' },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname?.startsWith('/overlay')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0a0a]/95 backdrop-blur border-t border-[#222]">
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[10px] font-bold tracking-wider py-2 px-3 transition-colors ${
                active ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              {active && <span className="block w-full h-px bg-white mb-1" />}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
