'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useCallback, useMemo, useEffect } from 'react';
import { activeChain } from '@/lib/chains';

const PRIVY_CONFIGURED = !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;

/**
 * Unified wallet hook — uses Privy when configured, falls back to wagmi injected.
 * Provides login/logout, address, connection state.
 * Auto-switches embedded wallets to MegaETH chain.
 */
export function useWallet() {
  // Privy hooks (safe to call even if provider isn't mounted — they return defaults)
  const privy = usePrivySafe();
  const walletsHook = useWalletsSafe();

  // Wagmi fallback
  const wagmiAccount = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Get the active Privy wallet (prefer embedded, fall back to first available)
  const privyWallet = useMemo(() => {
    if (!PRIVY_CONFIGURED || !walletsHook.wallets.length) return null;
    return (
      walletsHook.wallets.find((w) => w.walletClientType === 'privy') ??
      walletsHook.wallets[0]
    );
  }, [walletsHook.wallets]);

  // Auto-switch to MegaETH chain
  useEffect(() => {
    if (!privyWallet) return;
    const switchChain = async () => {
      try {
        await privyWallet.switchChain(activeChain.id);
      } catch {
        // Chain switch failed — user may need to add it manually for external wallets
      }
    };
    switchChain();
  }, [privyWallet]);

  const isConnected = PRIVY_CONFIGURED
    ? privy?.authenticated ?? false
    : wagmiAccount.isConnected;

  const address = PRIVY_CONFIGURED
    ? (privyWallet?.address as `0x${string}` | undefined)
    : wagmiAccount.address;

  const login = useCallback(() => {
    if (PRIVY_CONFIGURED && privy?.login) {
      privy.login();
    } else {
      connect({ connector: injected() });
    }
  }, [privy, connect]);

  const logout = useCallback(async () => {
    if (PRIVY_CONFIGURED && privy?.logout) {
      await privy.logout();
    } else {
      disconnect();
    }
  }, [privy, disconnect]);

  const connectInjected = useCallback(() => {
    connect({ connector: injected() });
  }, [connect]);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return {
    address,
    shortAddress,
    isConnected,
    isLoading: PRIVY_CONFIGURED ? !privy?.ready : false,
    login,
    loginWithInjected: connectInjected,
    logout,
    privyWallet,
    isPrivy: PRIVY_CONFIGURED,
  };
}

/** Safe wrapper — returns defaults if Privy provider isn't mounted */
function usePrivySafe() {
  if (!PRIVY_CONFIGURED) return null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return usePrivy();
  } catch {
    return null;
  }
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
