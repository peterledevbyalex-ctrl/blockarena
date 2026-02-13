'use client';

import { TIER_CONFIG, type ArenaTier } from '@/types';

interface TierSelectorProps {
  selected: ArenaTier | 'all';
  onSelect: (tier: ArenaTier | 'all') => void;
}

export function TierSelector({ selected, onSelect }: TierSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      <FilterButton active={selected === 'all'} onClick={() => onSelect('all')} label="ALL" />
      {(Object.entries(TIER_CONFIG) as [ArenaTier, (typeof TIER_CONFIG)[ArenaTier]][]).map(
        ([tier, cfg]) => (
          <FilterButton
            key={tier}
            active={selected === tier}
            onClick={() => onSelect(tier)}
            label={cfg.label.toUpperCase()}
          />
        ),
      )}
    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider transition-colors ${
        active
          ? 'bg-white text-black'
          : 'text-neutral-600 hover:text-neutral-400 border border-[#222]'
      }`}
    >
      {label}
    </button>
  );
}
