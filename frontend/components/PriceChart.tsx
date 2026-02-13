'use client';

import { useLivePrices } from '@/hooks/useApi';

interface PriceChartProps {
  arenaId?: number;
  height?: number;
}

export function PriceChart({ arenaId, height = 200 }: PriceChartProps) {
  const { prices, connected } = useLivePrices(arenaId);

  if (prices.length < 2) {
    return (
      <div className="border border-[#222] rounded-lg p-6 text-center bg-[#111]">
        <div className="text-xs text-neutral-600">
          {connected ? 'Waiting for price data...' : 'Connecting to price feed...'}
        </div>
      </div>
    );
  }

  const values = prices.map((p) => parseFloat(p.price));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 600;
  const h = height;
  const pad = 30;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - 2 * pad);
    const y = pad + (1 - (v - min) / range) * (h - 2 * pad);
    return `${x},${y}`;
  });

  const lastPrice = values[values.length - 1];
  const firstPrice = values[0];
  const change = lastPrice - firstPrice;
  const isUp = change >= 0;
  const color = isUp ? '#22c55e' : '#ef4444';

  return (
    <div className="border border-[#222] rounded-lg p-4 bg-[#111]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-600 uppercase tracking-wider">PRICE</span>
          {connected && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">${lastPrice.toFixed(2)}</span>
          <span className={`text-sm font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '+' : ''}{change.toFixed(2)}
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={pad} x2={w - pad}
            y1={pad + pct * (h - 2 * pad)}
            y2={pad + pct * (h - 2 * pad)}
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"
          />
        ))}
        <polygon
          fill="url(#chartGrad)"
          points={`${pad},${h - pad} ${points.join(' ')} ${w - pad},${h - pad}`}
        />
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={points.join(' ')} />
        <circle
          cx={parseFloat(points[points.length - 1].split(',')[0])}
          cy={parseFloat(points[points.length - 1].split(',')[1])}
          r="3" fill={color}
        />
      </svg>
      <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
        <span>#{prices[0].block}</span>
        <span>{prices.length} pts</span>
        <span>#{prices[prices.length - 1].block}</span>
      </div>
    </div>
  );
}
