'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { keccak256, encodePacked, encodeAbiParameters, parseAbiParameters, toHex } from 'viem';
import { ARENA_ENGINE_ADDRESS, ARENA_ENGINE_ABI } from '@/lib/contract';
import { encodePredictions } from '@/lib/predictions';
import { useMegaTransaction } from './useMegaTransaction';
import { useWallet } from './useWallet';
import { useCallback } from 'react';

/**
 * MegaETH Gas Constants
 * - Base fee: fixed 0.001 gwei (10^6 wei). DO NOT use eth_gasPrice (adds 20% buffer).
 * - Intrinsic gas: 60,000 (not 21K like Ethereum).
 * - Use eth_sendRawTransactionSync (EIP-7966) for instant receipts — no polling needed.
 */
const MEGAETH_GAS_PRICE = 1_000_000n; // 0.001 gwei — hardcoded per MegaETH docs

export function useArenaCount() {
  return useReadContract({
    address: ARENA_ENGINE_ADDRESS,
    abi: ARENA_ENGINE_ABI,
    functionName: 'nextArenaId',
  });
}

export function useArena(arenaId: bigint) {
  return useReadContract({
    address: ARENA_ENGINE_ADDRESS,
    abi: ARENA_ENGINE_ABI,
    functionName: 'getArena',
    args: [arenaId],
  });
}

export function usePlayerState(arenaId: bigint, player?: `0x${string}`) {
  return useReadContract({
    address: ARENA_ENGINE_ADDRESS,
    abi: ARENA_ENGINE_ABI,
    functionName: 'getPlayerState',
    args: player ? [arenaId, player] : undefined,
    query: { enabled: !!player },
  });
}

export function useGodStreak(player?: `0x${string}`) {
  return useReadContract({
    address: ARENA_ENGINE_ADDRESS,
    abi: ARENA_ENGINE_ABI,
    functionName: 'godStreak',
    args: player ? [player] : undefined,
    query: { enabled: !!player },
  });
}

export function useEntryFee(tier: number) {
  return useReadContract({
    address: ARENA_ENGINE_ADDRESS,
    abi: ARENA_ENGINE_ABI,
    functionName: 'getEntryFee',
    args: [tier],
  });
}

/**
 * Join an arena. Uses Privy headless signing + eth_sendRawTransactionSync when available,
 * falls back to wagmi writeContract otherwise.
 */
export function useJoinArena() {
  const { sendTransaction, isPrivy, isReady } = useMegaTransaction();
  const { writeContract } = useWriteContract();

  return useCallback(
    async (arenaId: bigint, entryFee: bigint) => {
      if (isPrivy && isReady) {
        return sendTransaction({
          functionName: 'joinArena',
          args: [arenaId],
          value: entryFee,
          gas: 200_000n,
        });
      }
      // Fallback to wagmi
      writeContract({
        address: ARENA_ENGINE_ADDRESS,
        abi: ARENA_ENGINE_ABI,
        functionName: 'joinArena',
        args: [arenaId],
        value: entryFee,
        gas: 200_000n,
        maxFeePerGas: MEGAETH_GAS_PRICE,
        maxPriorityFeePerGas: 0n,
      });
    },
    [sendTransaction, isPrivy, isReady, writeContract],
  );
}

/**
 * Commit a prediction. Uses headless signing for speed — no wallet popup during gameplay.
 */
export function useCommitPrediction() {
  const { sendTransaction, isPrivy, isReady } = useMegaTransaction();
  const { writeContract } = useWriteContract();
  const { address } = useWallet();

  return useCallback(
    async (arenaId: bigint, predictions: boolean[], salt: `0x${string}`) => {
      if (!address) return;

      const predWords = encodePredictions(predictions);

      // commitHash = keccak256(abi.encodePacked(arenaId, player, salt, keccak256(abi.encode(predWords))))
      const predHash = keccak256(
        encodeAbiParameters(parseAbiParameters('uint256[]'), [predWords]),
      );
      const commitHash = keccak256(
        encodePacked(
          ['uint256', 'address', 'bytes32', 'bytes32'],
          [arenaId, address as `0x${string}`, salt, predHash],
        ),
      );

      // Store predictions + salt locally for reveal
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `arena-${arenaId}-prediction`,
          JSON.stringify({
            predWords: predWords.map((w) => w.toString()),
            salt,
          }),
        );
      }

      if (isPrivy && isReady) {
        return sendTransaction({
          functionName: 'commitPrediction',
          args: [arenaId, commitHash],
          gas: 100_000n,
        });
      }
      // Fallback
      writeContract({
        address: ARENA_ENGINE_ADDRESS,
        abi: ARENA_ENGINE_ABI,
        functionName: 'commitPrediction',
        args: [arenaId, commitHash],
        gas: 100_000n,
        maxFeePerGas: MEGAETH_GAS_PRICE,
        maxPriorityFeePerGas: 0n,
      });
    },
    [address, sendTransaction, isPrivy, isReady, writeContract],
  );
}

/**
 * Reveal a prediction. Uses headless signing for instant reveal.
 */
export function useRevealPrediction() {
  const { sendTransaction, isPrivy, isReady } = useMegaTransaction();
  const { writeContract } = useWriteContract();

  return useCallback(
    async (arenaId: bigint) => {
      const stored = localStorage.getItem(`arena-${arenaId}-prediction`);
      if (!stored) throw new Error('No stored prediction found');
      const { predWords, salt } = JSON.parse(stored);

      const args = [
        arenaId,
        (predWords as string[]).map((w: string) => BigInt(w)),
        salt as `0x${string}`,
      ] as const;

      if (isPrivy && isReady) {
        return sendTransaction({
          functionName: 'revealPrediction',
          args,
          gas: 200_000n,
        });
      }
      // Fallback
      writeContract({
        address: ARENA_ENGINE_ADDRESS,
        abi: ARENA_ENGINE_ABI,
        functionName: 'revealPrediction',
        args: [...args],
        gas: 200_000n,
        maxFeePerGas: MEGAETH_GAS_PRICE,
        maxPriorityFeePerGas: 0n,
      });
    },
    [sendTransaction, isPrivy, isReady, writeContract],
  );
}

/** Generate a random salt for commitment */
export function generateSalt(): `0x${string}` {
  return keccak256(toHex(crypto.getRandomValues(new Uint8Array(32))));
}
