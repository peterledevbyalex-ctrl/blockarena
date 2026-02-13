'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { ArenaCard } from '@/components/ArenaCard';
import { TierSelector } from '@/components/TierSelector';
import { useMiniBlocks } from '@/hooks/useMiniBlocks';
import { useArenaCount, useArena } from '@/hooks/useArena';
import { useWallet } from '@/hooks/useWallet';
import { useState, useMemo } from 'react';
import type { ArenaTier } from '@/types';
import Link from 'next/link';

export default function Home() {
  const { blockNumber } = useMiniBlocks();
  const { data: arenaCount } = useArenaCount();
  const { isConnected } = useWallet();
  const [tierFilter, setTierFilter] = useState<ArenaTier | 'all'>('all');

  const count = arenaCount ? Number(arenaCount) : 0;
  const arenaIds = useMemo(
    () => Array.from({ length: count }, (_, i) => BigInt(count - 1 - i)),
    [count],
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold tracking-wider text-white">BLOCKARENA</span>
            <nav className="hidden md:flex gap-4">
              {[
                { href: '/', label: 'ARENA' },
                { href: '/leaderboard', label: 'LEADERBOARD' },
                { href: '/history', label: 'STATS' },
                { href: '/gallery', label: 'GALLERY' },
                { href: '/tournament', label: 'TOURNAMENT' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-neutral-500 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Block counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-neutral-500">
          <span>BLOCK <span className="text-white font-bold">#{blockNumber.toString()}</span></span>
          <span>{count} arena{count !== 1 ? 's' : ''}</span>
        </div>

        {/* Tier Filter */}
        <div className="mb-6">
          <TierSelector selected={tierFilter} onSelect={setTierFilter} />
        </div>

        {/* Arena List */}
        <div className="space-y-2">
          {count === 0 && (
            <div className="text-center py-16 text-neutral-600 text-sm">
              No arenas yet. Deploy the contract and create one.
            </div>
          )}
          {arenaIds.map((id) => (
            <FilteredArenaCard
              key={id.toString()}
              arenaId={id}
              currentBlock={blockNumber}
              tierFilter={tierFilter}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function FilteredArenaCard({
  arenaId, currentBlock, tierFilter,
}: {
  arenaId: bigint; currentBlock: bigint; tierFilter: ArenaTier | 'all';
}) {
  const { data: arena } = useArena(arenaId);
  if (!arena) return null;
  const tierIndex = Number(arena.tier);
  const tierMap: ArenaTier[] = ['low', 'mid', 'high', 'vip'];
  const tier = tierMap[tierIndex] ?? 'low';
  if (tierFilter !== 'all' && tier !== tierFilter) return null;
  return <ArenaCard arenaId={arenaId} currentBlock={currentBlock} />;
}
