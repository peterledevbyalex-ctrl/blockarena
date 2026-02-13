'use client';

import { useEffect, useState } from 'react';
import type { OverlayData } from '@/types';

const MOCK_DATA: OverlayData = {
  currentArena: { id: 42, tier: 'high', pot: '2.5', blocksLeft: 150 },
  leaderboard: [
    { address: '0xABCD...1234', score: 185, streak: 7 },
    { address: '0xDEAD...BEEF', score: 172, streak: 3 },
    { address: '0x1234...5678', score: 160, streak: 1 },
    { address: '0xFACE...CAFE', score: 145, streak: 0 },
    { address: '0xBABE...BABE', score: 130, streak: 5 },
  ],
  predictions: [
    { address: '0xABCD', direction: 'up' },
    { address: '0xDEAD', direction: 'down' },
  ],
  streaks: [
    { address: '0xABCD...1234', streak: 7 },
    { address: '0xBABE...BABE', streak: 5 },
    { address: '0xDEAD...BEEF', streak: 3 },
  ],
};

export default function OverlayPage() {
  const [data, setData] = useState<OverlayData>(MOCK_DATA);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(`${wsUrl}/overlay`);
      ws.onmessage = (e) => { try { setData(JSON.parse(e.data)); } catch {} };
      ws.onerror = () => ws?.close();
    } catch {}
    return () => ws?.close();
  }, []);

  return (
    <div className="w-[1920px] h-[1080px] relative overflow-hidden font-mono" style={{ background: 'transparent' }}>
      {/* Current Arena */}
      {data.currentArena && (
        <div className="absolute top-6 left-6 rounded-lg p-5 border border-[#222] w-80" style={{ background: 'rgba(10,10,10,0.9)' }}>
          <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">LIVE ARENA</div>
          <div className="text-3xl font-bold text-white">#{data.currentArena.id}</div>
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-neutral-500 uppercase tracking-wider">{data.currentArena.tier}</span>
            <span className="text-white font-bold">{data.currentArena.pot} ETH</span>
          </div>
          <div className="mt-3">
            <div className="h-1 bg-[#222] rounded-full overflow-hidden">
              <div className="h-full bg-white/30 rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="text-xs text-neutral-500 mt-1">{data.currentArena.blocksLeft} blocks left</div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="absolute top-6 right-6 rounded-lg p-5 border border-[#222] w-96" style={{ background: 'rgba(10,10,10,0.9)' }}>
        <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">LEADERBOARD</div>
        {data.leaderboard.map((entry, i) => (
          <div key={i} className="flex justify-between items-center py-1.5 text-xs">
            <div className="flex items-center gap-3">
              <span className={`font-bold w-6 text-center ${i < 3 ? 'text-white' : 'text-neutral-600'}`}>
                {i + 1}
              </span>
              <span className="text-neutral-400">{entry.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-white">{entry.score}</span>
              {entry.streak >= 3 && (
                <span className="text-xs text-neutral-500">{entry.streak}x</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live Predictions */}
      <div className="absolute bottom-6 left-6 rounded-lg p-5 border border-[#222]" style={{ background: 'rgba(10,10,10,0.9)' }}>
        <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">LIVE PREDICTIONS</div>
        <div className="flex gap-2">
          {data.predictions.map((p, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded text-xs font-bold border ${
                p.direction === 'up'
                  ? 'text-green-500 border-green-500/30'
                  : 'text-red-500 border-red-500/30'
              }`}
            >
              {p.address.slice(0, 6)} {p.direction === 'up' ? '↑' : '↓'}
            </span>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-xs text-neutral-700 tracking-wider">BLOCKARENA</span>
      </div>
    </div>
  );
}
