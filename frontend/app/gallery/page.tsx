'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { TIER_CONFIG, type ArenaTier, type HighlightNFT } from '@/types';
import Link from 'next/link';

const MOCK_NFTS: HighlightNFT[] = Array.from({ length: 12 }, (_, i) => ({
  tokenId: i + 1,
  arenaId: 100 - i,
  owner: `0x${(i + 1).toString(16).padStart(40, 'a')}`,
  score: 150 + Math.floor(Math.random() * 100),
  godStreak: Math.floor(Math.random() * 15) + 3,
  timestamp: Date.now() - i * 86400_000,
  imageUrl: '',
  tier: (['low', 'mid', 'high', 'vip'] as ArenaTier[])[i % 4],
}));

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">← BACK</Link>
            <span className="text-sm font-bold text-white">GALLERY</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {MOCK_NFTS.map((nft) => {
            const tier = TIER_CONFIG[nft.tier];
            return (
              <div key={nft.tokenId} className="border border-[#222] rounded-lg p-3 bg-[#111] hover:bg-[#161616] transition-colors">
                <div className="aspect-square bg-[#0a0a0a] rounded mb-2 flex items-center justify-center text-2xl border border-[#222]">
                  🏆
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-bold ${tier.color}`}>#{nft.tokenId}</span>
                  <span className="text-neutral-600">Arena #{nft.arenaId}</span>
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  {nft.score}pts · {nft.godStreak}x streak
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
