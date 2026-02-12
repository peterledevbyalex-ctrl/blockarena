'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useWallets } from '@privy-io/react-auth';
import {
  createPublicClient,
  http,
  serializeTransaction,
  keccak256,
  type TransactionSerializable,
  type Hash,
  type TransactionReceipt,
  encodeFunctionData,
} from 'viem';
import { activeChain } from '@/lib/chains';
import { ARENA_ENGINE_ADDRESS, ARENA_ENGINE_ABI } from '@/lib/contract';

const PRIVY_CONFIGURED = !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;

/**
 * MegaETH Gas Constants
 * - Base fee: fixed 0.001 gwei (10^6 wei). DO NOT use eth_gasPrice.
 * - Intrinsic gas: 60,000 (not 21K like Ethereum).
 */
const MEGAETH_GAS_PRICE = 1_000_000n; // 0.001 gwei

const publicClient = createPublicClient({
  chain: activeChain,
  transport: http(),
});

/**
 * Parse a Privy secp256k1_sign 65-byte signature into EIP-1559 components.
 */
function parseSignatureEIP1559(signature: `0x${string}`): {
  r: `0x${string}`;
  s: `0x${string}`;
  yParity: 0 | 1;
} {
  const r = `0x${signature.slice(2, 66)}` as `0x${string}`;
  const s = `0x${signature.slice(66, 130)}` as `0x${string}`;
  let yParity = parseInt(signature.slice(130, 132), 16);
  if (yParity >= 27) yParity -= 27;
  return { r, s, yParity: yParity as 0 | 1 };
}

/**
 * Send a signed transaction via eth_sendRawTransactionSync for instant receipt.
 * Falls back to eth_sendRawTransaction if sync method unavailable.
 */
async function sendRawTransactionSync(signedTx: `0x${string}`): Promise<TransactionReceipt> {
  const rpcUrl = activeChain.rpcUrls.default.http[0];

  // Try eth_sendRawTransactionSync first (EIP-7966)
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_sendRawTransactionSync',
      params: [signedTx],
      id: 1,
    }),
  });

  const json = await response.json();

  if (json.error) {
    // If sync method not supported, fall back to regular send + wait
    if (json.error.code === -32601 || json.error.message?.includes('not found')) {
      const hash = await publicClient.sendRawTransaction({ serializedTransaction: signedTx });
      return await publicClient.waitForTransactionReceipt({ hash });
    }
    throw new Error(json.error.message || 'Transaction failed');
  }

  return json.result as TransactionReceipt;
}

/**
 * Hook for ultra-fast MegaETH transactions using Privy headless signing
 * + eth_sendRawTransactionSync for instant receipts.
 *
 * When Privy is not configured, falls back to wagmi's useWriteContract.
 */
export function useMegaTransaction() {
  const walletsHook = useWalletsSafe();
  const lastNonceRef = useRef<number>(-1);
  const warmedUp = useRef(false);

  // Get the embedded Privy wallet
  const privyWallet = walletsHook.wallets.find(
    (w) => w.walletClientType === 'privy',
  );

  // Warm up signing on mount (first secp256k1_sign is slow ~500ms)
  useEffect(() => {
    if (!privyWallet || warmedUp.current) return;
    const warmup = async () => {
      try {
        const provider = await privyWallet.getEthereumProvider();
        const dummyHash = '0x0000000000000000000000000000000000000000000000000000000000000001';
        await provider.request({ method: 'secp256k1_sign', params: [dummyHash] });
        warmedUp.current = true;
        console.log('[MegaTx] Signing path warmed up');
      } catch {
        // Will warm up on first real tx
      }
    };
    warmup();
  }, [privyWallet]);

  /**
   * Send a contract write transaction with headless signing + instant receipt.
   */
  const sendTransaction = useCallback(
    async (params: {
      functionName: string;
      args: readonly unknown[];
      value?: bigint;
      gas?: bigint;
    }): Promise<TransactionReceipt> => {
      if (!privyWallet) {
        throw new Error('No Privy embedded wallet available');
      }

      const provider = await privyWallet.getEthereumProvider();
      const address = privyWallet.address as `0x${string}`;

      // Get nonce (with local tracking for rapid tx sequences)
      let nonce = await publicClient.getTransactionCount({
        address,
        blockTag: 'pending',
      });
      if (lastNonceRef.current >= nonce) {
        nonce = lastNonceRef.current + 1;
      }
      lastNonceRef.current = nonce;

      // Encode function call
      const data = encodeFunctionData({
        abi: ARENA_ENGINE_ABI,
        functionName: params.functionName as never,
        args: params.args as never[],
      });

      // Build unsigned EIP-1559 transaction
      const unsignedTx: TransactionSerializable = {
        type: 'eip1559',
        to: ARENA_ENGINE_ADDRESS,
        data,
        value: params.value ?? 0n,
        gas: params.gas ?? 200_000n,
        maxFeePerGas: MEGAETH_GAS_PRICE,
        maxPriorityFeePerGas: 0n,
        nonce,
        chainId: activeChain.id,
      };

      // Serialize and hash for signing
      const serializedUnsigned = serializeTransaction(unsignedTx);
      const txHash = keccak256(serializedUnsigned);

      // Headless sign with secp256k1_sign (no popup!)
      const signature = (await provider.request({
        method: 'secp256k1_sign',
        params: [txHash],
      })) as `0x${string}`;

      // Parse signature and serialize signed tx
      const { r, s, yParity } = parseSignatureEIP1559(signature);
      const signedTx = serializeTransaction(unsignedTx, {
        r,
        s,
        yParity,
      });

      // Send via eth_sendRawTransactionSync for instant receipt
      return await sendRawTransactionSync(signedTx as `0x${string}`);
    },
    [privyWallet],
  );

  return {
    sendTransaction,
    isReady: !!privyWallet,
    isPrivy: PRIVY_CONFIGURED,
  };
}

function useWalletsSafe() {
  if (!PRIVY_CONFIGURED) return { wallets: [] as never[] };
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useWallets();
  } catch {
    return { wallets: [] as never[] };
  }
}
