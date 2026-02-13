'use client';

import { useApiLeaderboard } from '@/hooks/useApi';
import { useWallet } from '@/hooks/useWallet';
import { ConnectWallet } from '@/components/ConnectWallet';
import Link from 'next/link';

const MOCK_LEADERBOARD = Array.from({ length: 20 }, (_, i) => ({
  address: `0x${(i + 1).toString(16).padStart(40, 'a')}`,
  wins: 50 - i * 2,
  streak: Math.max(0, 15 - i),
  totalPnL: `${(5 - i * 0.3).toFixed(2)}`,
}));

export default function LeaderboardPage() {
  const entries = useApiLeaderboard();
  const { address } = useWallet();
  const data = entries.length > 0 ? entries : MOCK_LEADERBOARD;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">← BACK</Link>
            <span className="text-sm font-bold text-white">LEADERBOARD</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Table header */}
        <div className="flex items-center justify-between px-3 py-2 text-[10px] text-neutral-600 uppercase tracking-wider border-b border-[#222]">
          <div className="flex items-center gap-3">
            <span className="w-8">#</span>
            <span>ADDRESS</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="w-12 text-right">STREAK</span>
            <span className="w-12 text-right">WINS</span>
            <span className="w-20 text-right">P&L</span>
          </div>
        </div>

        {/* Rows */}
        {data.map((entry, i) => {
          const isYou = address?.toLowerCase() === entry.address.toLowerCase();
          return (
            <div
              key={i}
              className={`flex items-center justify-between px-3 py-2.5 text-xs border-b border-[#161616] ${
                isYou ? 'bg-[#161616]' : 'hover:bg-[#111]'
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 font-bold ${i < 3 ? 'text-white' : 'text-neutral-600'}`}>
                  {i + 1}
                </span>
                <span className="text-neutral-400">
                  {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                  {isYou && <span className="ml-2 text-white text-[10px]">(YOU)</span>}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-12 text-right text-neutral-500">
                  {entry.streak > 0 ? `${entry.streak}x` : '-'}
                </span>
                <span className="w-12 text-right text-white font-bold">{entry.wins}</span>
                <span className={`w-20 text-right font-bold ${
                  parseFloat(entry.totalPnL) >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {parseFloat(entry.totalPnL) >= 0 ? '+' : ''}{entry.totalPnL}
                </span>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
