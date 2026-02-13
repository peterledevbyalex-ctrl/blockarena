'use client';

import { useArena, useEntryFee, useJoinArena, usePlayerState } from '@/hooks/useArena';
import { useWallet } from '@/hooks/useWallet';
import { formatEther } from 'viem';
import { TIER_CONFIG, TIER_FROM_INDEX, type ArenaTier } from '@/types';
import { useRouter } from 'next/navigation';

interface ArenaCardProps {
  arenaId: bigint;
  currentBlock: bigint;
}

export function getTierFromIndex(tierIndex: number): ArenaTier {
  return TIER_FROM_INDEX[tierIndex] ?? 'low';
}

function StatusBadge({ label, variant }: { label: string; variant: 'open' | 'live' | 'reveal' | 'done' }) {
  const styles = {
    open: 'text-green-500 border-green-500/30',
    live: 'text-red-400 border-red-400/30',
    reveal: 'text-yellow-500 border-yellow-500/30',
    done: 'text-neutral-500 border-neutral-500/30',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded ${styles[variant]} uppercase tracking-wider`}>
      {variant === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1 align-middle" />}
      {label}
    </span>
  );
}

export function ArenaCard({ arenaId, currentBlock }: ArenaCardProps) {
  const router = useRouter();
  const { data: arena } = useArena(arenaId);
  const { address, isConnected } = useWallet();
  const tierIndex = arena ? Number(arena.tier) : 0;
  const { data: entryFee } = useEntryFee(tierIndex);
  const { data: playerState } = usePlayerState(arenaId, address as `0x${string}` | undefined);
  const joinArena = useJoinArena();

  const hasJoined = playerState && playerState.commitHash !== '0x0000000000000000000000000000000000000000000000000000000000000000';

  if (!arena) {
    return <div className="h-16 rounded border border-[#222] bg-[#111] animate-pulse" />;
  }

  const startBlock = BigInt(arena.startBlock);
  const endBlock = BigInt(arena.endBlock);
  const isJoinable = currentBlock < startBlock;
  const isActive = currentBlock >= startBlock && currentBlock <= endBlock;
  const isEnded = currentBlock > endBlock;
  const tier = getTierFromIndex(tierIndex);
  const cfg = TIER_CONFIG[tier];
  const fee = entryFee ?? 0n;
  const totalBlocks = Number(endBlock - startBlock);
  const blocksRemaining = isActive ? Number(endBlock - currentBlock) : 0;

  const statusVariant = arena.finalized ? 'done' : isEnded ? 'reveal' : isActive ? 'live' : 'open';
  const statusLabel = arena.finalized ? 'DONE' : isEnded ? 'REVEAL' : isActive ? 'LIVE' : 'OPEN';

  return (
    <div
      onClick={() => router.push(`/arena/${arenaId.toString()}`)}
      className="border border-[#222] rounded-lg p-4 bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">#{arenaId.toString()}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} uppercase tracking-wider`}>
            {cfg.label}
          </span>
        </div>
        <StatusBadge label={statusLabel} variant={statusVariant} />
      </div>

      <div className="grid grid-cols-4 gap-3 text-xs mb-3">
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

      {/* Progress bar for active arenas */}
      {isActive && (
        <div className="mb-3">
          <div className="h-1 bg-[#222] rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30 rounded-full transition-all"
              style={{ width: `${((totalBlocks - blocksRemaining) / totalBlocks * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {/* Action area */}
      <div onClick={(e) => e.stopPropagation()}>
        {isJoinable && !hasJoined && isConnected && (
          <button
            onClick={() => joinArena(arenaId, fee)}
            className="w-full py-2 rounded text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            JOIN — {fee > 0n ? formatEther(fee) : cfg.fee} ETH
          </button>
        )}
        {hasJoined && isJoinable && (
          <div className="w-full py-2 rounded text-sm text-center text-green-500 border border-green-500/20">
            JOINED — Waiting for start
          </div>
        )}
        {hasJoined && isActive && (
          <button
            onClick={() => router.push(`/arena/${arenaId.toString()}`)}
            className="w-full py-2 rounded text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            PREDICT NOW →
          </button>
        )}
      </div>
    </div>
  );
}

export { getTierFromIndex as getTier };
