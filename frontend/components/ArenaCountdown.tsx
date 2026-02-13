'use client';

interface ArenaCountdownProps {
  blocksRemaining: number;
  label?: string;
}

export function ArenaCountdown({ blocksRemaining, label = 'NEXT ARENA' }: ArenaCountdownProps) {
  if (blocksRemaining === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-green-500">GO</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-neutral-500">{label} IN</span>
      <span className="text-white font-bold">{blocksRemaining}</span>
      <span className="text-neutral-600">blocks</span>
    </div>
  );
}
