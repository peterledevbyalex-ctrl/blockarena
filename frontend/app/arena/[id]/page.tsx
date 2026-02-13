'use client';

import { use } from 'react';
import { useArena, usePlayerState, useEntryFee, useJoinArena } from '@/hooks/useArena';
import { useWallet } from '@/hooks/useWallet';
import { useMiniBlocks } from '@/hooks/useMiniBlocks';
import { PriceChart } from '@/components/PriceChart';
import { PredictionPanel } from '@/components/PredictionPanel';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ConnectWallet } from '@/components/ConnectWallet';
import { TIER_CONFIG, TIER_FROM_INDEX, type ArenaTier } from '@/types';
import { formatEther } from 'viem';
import Link from 'next/link';

function getTier(tierIndex: number): ArenaTier {
  return TIER_FROM_INDEX[tierIndex] ?? 'low';
}

export default function ArenaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const arenaId = BigInt(id);
  const { blockNumber } = useMiniBlocks();
  const { data: arena } = useArena(arenaId);
  const { isConnected, address } = useWallet();
  const { data: playerState } = usePlayerState(arenaId, address as `0x${string}` | undefined);
  const tierIndex = arena ? Number(arena.tier) : 0;
  const { data: entryFee } = useEntryFee(tierIndex);
  const joinArena = useJoinArena();

  if (!arena) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-neutral-600">Loading arena...</div>
      </div>
    );
  }

  const startBlock = BigInt(arena.startBlock);
  const endBlock = BigInt(arena.endBlock);
  const isJoinable = blockNumber < startBlock;
  const isActive = blockNumber >= startBlock && blockNumber <= endBlock;
  const isEnded = blockNumber > endBlock;
  const tier = getTier(tierIndex);
  const cfg = TIER_CONFIG[tier];
  const fee = entryFee ?? 0n;
  const totalBlocks = Number(endBlock - startBlock);
  const blocksRemaining = isActive ? Number(endBlock - blockNumber) : 0;
  const numTicks = totalBlocks;

  const hasJoined = playerState && playerState.commitHash !== '0x0000000000000000000000000000000000000000000000000000000000000000';
  const hasRevealed = playerState?.revealed ?? false;
  const score = playerState ? Number(playerState.score) : 0;

  const statusLabel = arena.finalized ? 'DONE' : isEnded ? 'REVEAL' : isActive ? 'LIVE' : 'OPEN';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">
              ← BACK
            </Link>
            <span className="text-sm font-bold text-white">ARENA #{id}</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Arena Info */}
        <div className="border border-[#222] rounded-lg p-5 bg-[#111]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} uppercase tracking-wider`}>
                {cfg.label}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                isActive ? 'text-red-400 border-red-400/30' :
                isEnded && !arena.finalized ? 'text-yellow-500 border-yellow-500/30' :
                arena.finalized ? 'text-neutral-500 border-neutral-500/30' :
                'text-green-500 border-green-500/30'
              }`}>
                {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1 align-middle" />}
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-neutral-600 mb-0.5">ENTRY</div>
              <div className="text-white">{fee > 0n ? formatEther(fee) : cfg.fee} ETH</div>
            </div>
            <div>
              <div className="text-neutral-600 mb-0.5">POT</div>
              <div className="text-white">{formatEther(arena.pot)} ETH</div>
            </div>
            <div>
              <div className="text-neutral-600 mb-0.5">PLAYERS</div>
              <div className="text-white">{arena.playerCount.toString()}</div>
            </div>
            <div>
              <div className="text-neutral-600 mb-0.5">{isActive ? 'REMAINING' : 'DURATION'}</div>
              <div className="text-white">{isActive ? blocksRemaining : totalBlocks} blk</div>
            </div>
          </div>

          {isActive && (
            <div className="mt-4">
              <CountdownTimer blocksRemaining={blocksRemaining} totalBlocks={totalBlocks} />
            </div>
          )}
        </div>

        {/* Player Status */}
        {isConnected && address && (
          <div className="border border-[#222] rounded-lg p-4 bg-[#111]">
            <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">YOUR STATUS</div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { label: 'Joined', done: !!hasJoined },
                { label: 'Committed', done: !!hasJoined },
                { label: 'Revealed', done: hasRevealed },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  {i > 0 && <div className={`w-4 h-px ${step.done ? 'bg-green-500' : 'bg-[#333]'}`} />}
                  <span className={step.done ? 'text-green-500' : 'text-neutral-600'}>
                    {step.done ? '✓' : '○'} {step.label}
                  </span>
                </div>
              ))}
              {hasRevealed && score > 0 && (
                <span className="ml-auto text-white font-bold">Score: {score}</span>
              )}
            </div>
          </div>
        )}

        {/* Price Chart */}
        <PriceChart arenaId={Number(arenaId)} height={250} />

        {/* Join Button */}
        {isConnected && isJoinable && !hasJoined && (
          <button
            onClick={() => joinArena(arenaId, fee)}
            className="w-full py-3 rounded text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            JOIN ARENA — {fee > 0n ? formatEther(fee) : cfg.fee} ETH
          </button>
        )}

        {/* Waiting for start */}
        {hasJoined && isJoinable && (
          <div className="w-full py-3 rounded text-sm text-center text-green-500 border border-green-500/20">
            JOINED — Waiting for start
          </div>
        )}

        {/* Not connected */}
        {!isConnected && (
          <div className="border border-[#222] rounded-lg p-8 text-center bg-[#111]">
            <p className="text-neutral-500 text-sm mb-4">Connect wallet to play</p>
            <ConnectWallet />
          </div>
        )}

        {/* Prediction Panel */}
        {isConnected && (isActive || isEnded) && hasJoined && (
          <PredictionPanel
            arenaId={arenaId}
            numTicks={numTicks}
            isActive={isActive}
            isEnded={isEnded && !arena.finalized}
          />
        )}

        {/* Finalized */}
        {arena.finalized && (
          <div className="border border-[#222] rounded-lg p-6 text-center bg-[#111]">
            <div className="text-sm font-bold text-white mb-2">ARENA FINALIZED</div>
            {hasRevealed && score > 0 && (
              <div className="text-xs text-neutral-500">
                Score: <span className="text-white font-bold">{score}/{totalBlocks}</span>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
