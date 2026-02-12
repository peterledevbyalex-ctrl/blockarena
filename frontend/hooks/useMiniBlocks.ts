'use client';

import { useEffect, useState, useRef } from 'react';

interface MiniBlock {
  number: string;
  hash: string;
  timestamp: string;
  payload_id?: string;
  index?: number;
  transactions?: unknown[];
}

/**
 * MegaETH real-time mini-block subscription hook.
 *
 * Uses `eth_subscribe("miniBlocks")` for real-time data (MegaETH-specific).
 * Falls back to `newHeads` if miniBlocks subscription fails.
 *
 * Implements WebSocket keepalive: sends eth_chainId every 30 seconds
 * to prevent disconnection (required by MegaETH WS endpoints).
 */
export function useMiniBlocks() {
  const [latestBlock, setLatestBlock] = useState<MiniBlock | null>(null);
  const [blockNumber, setBlockNumber] = useState<bigint>(0n);
  const wsRef = useRef<WebSocket | null>(null);
  const keepaliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket('wss://carrot.megaeth.com/ws');
      wsRef.current = ws;

      ws.onopen = () => {
        // Subscribe to miniBlocks (MegaETH-specific, higher resolution than newHeads)
        ws.send(
          JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_subscribe',
            params: ['miniBlocks'],
            id: 1,
          })
        );

        // MegaETH WebSocket keepalive: send eth_chainId every 30 seconds
        // Required to prevent disconnection per MegaETH WS guidelines
        keepaliveRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_chainId',
                params: [],
                id: Date.now(),
              })
            );
          }
        }, 30_000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle subscription error (miniBlocks not supported) — fall back to newHeads
          if (data.id === 1 && data.error) {
            ws.send(
              JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_subscribe',
                params: ['newHeads'],
                id: 2,
              })
            );
            return;
          }

          if (data.method === 'eth_subscription' && data.params?.result) {
            const block = data.params.result;
            setLatestBlock(block);
            if (block.number) {
              setBlockNumber(BigInt(block.number));
            } else if (block.block_number) {
              // miniBlocks schema uses block_number
              setBlockNumber(BigInt(block.block_number));
            }
          }
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        if (keepaliveRef.current) {
          clearInterval(keepaliveRef.current);
          keepaliveRef.current = null;
        }
        setTimeout(connect, 1000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();
    return () => {
      if (keepaliveRef.current) {
        clearInterval(keepaliveRef.current);
        keepaliveRef.current = null;
      }
      wsRef.current?.close();
    };
  }, []);

  return { latestBlock, blockNumber };
}
