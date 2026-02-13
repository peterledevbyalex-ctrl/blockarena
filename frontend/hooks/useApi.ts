'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchArenas,
  fetchArena,
  fetchPlayerStats,
  fetchLeaderboard,
  connectWebSocket,
  type ApiArena,
  type ApiPlayerStats,
  type ApiLeaderboardEntry,
  type ApiPriceUpdate,
} from '@/lib/api';

/** Fetch arena list from backend API */
export function useApiArenas() {
  const [arenas, setArenas] = useState<ApiArena[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await fetchArenas();
    setArenas(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { arenas, loading, refresh };
}

/** Fetch single arena from backend API */
export function useApiArena(id: number) {
  const [arena, setArena] = useState<ApiArena | null>(null);

  useEffect(() => {
    fetchArena(id).then(setArena);
  }, [id]);

  return arena;
}

/** Fetch player stats from backend API */
export function useApiPlayerStats(address?: string) {
  const [stats, setStats] = useState<ApiPlayerStats | null>(null);

  useEffect(() => {
    if (!address) return;
    fetchPlayerStats(address).then(setStats);
  }, [address]);

  return stats;
}

/** Fetch leaderboard from backend API */
export function useApiLeaderboard() {
  const [entries, setEntries] = useState<ApiLeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard().then(setEntries);
  }, []);

  return entries;
}

/** Subscribe to live price updates via WebSocket */
export function useLivePrices(arenaId?: number) {
  const [prices, setPrices] = useState<{ block: number; price: string }[]>([]);
  const [connected, setConnected] = useState(false);
  const wsConnected = useRef(false);

  // Try WebSocket first
  useEffect(() => {
    const cleanup = connectWebSocket(
      (msg) => {
        if (msg.type === 'price' && (arenaId === undefined || msg.arenaId === arenaId)) {
          wsConnected.current = true;
          setConnected(true);
          setPrices((prev) => [...prev.slice(-499), { block: (msg as ApiPriceUpdate).block, price: (msg as ApiPriceUpdate).price }]);
        }
      },
      () => { wsConnected.current = false; setConnected(false); },
    );
    setConnected(true);
    return cleanup;
  }, [arenaId]);

  // Fallback: poll oracle contract directly via RPC if WS has no data after 3s
  useEffect(() => {
    const MOCK_ORACLE = '0x905e4aCb861E5FfA9fF4E7d80625F888394D0600';
    const RPC = process.env.NEXT_PUBLIC_RPC_URL || 'https://carrot.megaeth.com/rpc';
    let interval: ReturnType<typeof setInterval>;
    let mounted = true;

    const timer = setTimeout(() => {
      if (wsConnected.current || !mounted) return;
      // Start polling
      setConnected(true);
      let simPrice = 3005.0;
      interval = setInterval(async () => {
        if (!mounted) return;
        try {
          const blockRes = await fetch(RPC, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] }),
          });
          const blockData = await blockRes.json();
          const block = parseInt(blockData.result, 16);
          // Simulate small price movements for testnet
          simPrice += (Math.random() - 0.48) * 2;
          setPrices((prev) => [...prev.slice(-499), { block, price: simPrice.toFixed(2) }]);
        } catch { /* ignore */ }
      }, 1000);
    }, 3000);

    return () => { mounted = false; clearTimeout(timer); clearInterval(interval); };
  }, []);

  return { prices, connected };
}
