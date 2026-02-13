'use client';

import { useWallet } from '@/hooks/useWallet';
import { usePlayerStats } from '@/hooks/useStats';
import { ConnectWallet } from '@/components/ConnectWallet';
import { TIER_CONFIG } from '@/types';
import { useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const { address, isConnected } = useWallet();
  const { stats, history } = usePlayerStats(address);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">← BACK</Link>
            <span className="text-sm font-bold text-white">STATS</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {!isConnected && (
          <div className="text-center py-20 text-neutral-600 text-sm">
            Connect wallet to see stats
          </div>
        )}

        {isConnected && stats && (
          <>
            {/* Address */}
            <div className="mb-6 text-xs text-neutral-500">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'ARENAS', value: stats.arenasPlayed.toString() },
                { label: 'P&L', value: `${stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(4)}`, color: stats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500' },
                { label: 'BEST STREAK', value: `${stats.bestStreak}x` },
                { label: 'WIN RATE', value: `${((stats.wins / Math.max(stats.wins + stats.losses, 1)) * 100).toFixed(0)}%` },
              ].map((stat) => (
                <div key={stat.label} className="border border-[#222] rounded-lg p-3 bg-[#111]">
                  <div className={`text-lg font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* History */}
            <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">ARENA HISTORY</div>

            {/* Table header */}
            <div className="flex items-center justify-between px-3 py-2 text-[10px] text-neutral-600 uppercase tracking-wider border-b border-[#222]">
              <span>ARENA</span>
              <span>RESULT</span>
            </div>

            {history.map((entry) => {
              const tier = TIER_CONFIG[entry.tier];
              const isExpanded = expandedId === entry.arenaId;
              return (
                <div key={entry.arenaId} className="border-b border-[#161616]">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : entry.arenaId)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-[#111] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${tier.color} text-[10px]`}>{tier.label.toUpperCase()}</span>
                      <span className="text-neutral-600">#{entry.arenaId}</span>
                    </div>
                    <span className={`font-bold ${entry.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                      {entry.pnl} ETH
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 text-[10px] text-neutral-500 grid grid-cols-2 gap-2 border-t border-[#161616] pt-2">
                      <div>Entry: {entry.entryFee} ETH</div>
                      <div>Score: {entry.score}</div>
                      <div>Players: {entry.totalPlayers}</div>
                      <div>Result: <span className={entry.result === 'win' ? 'text-green-500' : 'text-red-500'}>{entry.result.toUpperCase()}</span></div>
                      <div className="col-span-2 text-neutral-600">{new Date(entry.timestamp).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}
