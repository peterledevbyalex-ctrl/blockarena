'use client';

interface CountdownTimerProps {
  blocksRemaining: number;
  totalBlocks: number;
  label?: string;
}

export function CountdownTimer({ blocksRemaining, totalBlocks, label }: CountdownTimerProps) {
  const progress = totalBlocks > 0 ? ((totalBlocks - blocksRemaining) / totalBlocks) * 100 : 0;

  return (
    <div className="w-full">
      {label && <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">{label}</div>}
      <div className="h-1 bg-[#222] rounded-full overflow-hidden">
        <div
          className="h-full bg-white/30 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] mt-1">
        <span className="text-neutral-500">{blocksRemaining} blocks</span>
        <span className="text-neutral-600">{progress.toFixed(0)}%</span>
      </div>
    </div>
  );
}
