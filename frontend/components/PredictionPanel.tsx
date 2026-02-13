'use client';

import { useState, useCallback } from 'react';
import { useCommitPrediction, useRevealPrediction, generateSalt } from '@/hooks/useArena';

interface PredictionPanelProps {
  arenaId: bigint;
  numTicks: number;
  isActive: boolean;
  isEnded: boolean;
  onWin?: () => void;
  onStreak?: () => void;
  onShare?: () => void;
}

export function PredictionPanel({ arenaId, numTicks, isActive, isEnded, onWin, onStreak, onShare }: PredictionPanelProps) {
  const [predictions, setPredictions] = useState<boolean[]>(new Array(numTicks).fill(false));
  const [committed, setCommitted] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const commitPrediction = useCommitPrediction();
  const revealPrediction = useRevealPrediction();

  const togglePrediction = useCallback((index: number) => {
    setPredictions(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const setAllUp = () => setPredictions(new Array(numTicks).fill(true));
  const setAllDown = () => setPredictions(new Array(numTicks).fill(false));
  const randomize = () => setPredictions(Array.from({ length: numTicks }, () => Math.random() > 0.5));

  const handleCommit = async () => {
    setCommitting(true);
    try {
      const salt = generateSalt();
      await commitPrediction(arenaId, predictions, salt);
      setCommitted(true);
    } catch (err) {
      console.error('Commit failed:', err);
    } finally {
      setCommitting(false);
    }
  };

  const handleReveal = async () => {
    setRevealing(true);
    try {
      await revealPrediction(arenaId);
      onShare?.();
    } catch (err) {
      console.error('Reveal failed:', err);
    } finally {
      setRevealing(false);
    }
  };

  const upCount = predictions.filter(Boolean).length;
  const isLargeTape = numTicks > 256;

  return (
    <div className="border border-[#222] rounded-lg p-5 bg-[#111]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">PREDICTIONS</h3>
        <span className="text-xs text-neutral-600">{numTicks} TICKS</span>
      </div>

      {isActive && !committed && (
        <>
          {/* Quick actions */}
          <div className="flex gap-2 mb-4">
            <button onClick={setAllUp} className="flex-1 py-2 text-xs font-bold rounded border border-green-500/20 text-green-500 hover:bg-green-500/10 transition-colors">
              ALL UP
            </button>
            <button onClick={setAllDown} className="flex-1 py-2 text-xs font-bold rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors">
              ALL DOWN
            </button>
            <button onClick={randomize} className="flex-1 py-2 text-xs font-bold rounded border border-[#222] text-neutral-400 hover:bg-[#161616] transition-colors">
              RANDOM
            </button>
          </div>

          {/* Summary */}
          <div className="flex justify-between text-xs text-neutral-500 mb-3">
            <span className="text-green-500">{upCount} UP</span>
            <span className="text-red-500">{numTicks - upCount} DOWN</span>
          </div>

          {isLargeTape ? (
            <div className="mb-4">
              <div className="flex h-16 rounded overflow-hidden border border-[#222]">
                {Array.from({ length: Math.min(numTicks, 300) }).map((_, i) => {
                  const idx = Math.floor((i / 300) * numTicks);
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        const next = [...predictions];
                        const chunkSize = Math.ceil(numTicks / 300);
                        const start = Math.floor((i / 300) * numTicks);
                        const val = !next[start];
                        for (let j = start; j < Math.min(start + chunkSize, numTicks); j++) next[j] = val;
                        setPredictions(next);
                      }}
                      className={`flex-1 cursor-pointer transition-colors ${
                        predictions[idx] ? 'bg-green-500/60' : 'bg-red-500/60'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-[10px] text-neutral-600 mt-1">Tap to toggle · Each bar ≈ {Math.ceil(numTicks / 300)} ticks</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1 mb-4 max-h-64 overflow-y-auto">
              {predictions.map((pred, i) => (
                <button
                  key={i}
                  onClick={() => togglePrediction(i)}
                  className={`w-10 h-10 rounded text-xs font-bold transition-colors ${
                    pred
                      ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                      : 'bg-red-500/20 text-red-500 border border-red-500/30'
                  }`}
                >
                  {pred ? '↑' : '↓'}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleCommit}
            disabled={committing}
            className="w-full py-3 rounded text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {committing ? 'COMMITTING...' : 'COMMIT PREDICTIONS'}
          </button>
        </>
      )}

      {committed && isActive && (
        <div className="text-center py-8">
          <div className="text-sm font-bold text-green-500 mb-1">COMMITTED</div>
          <div className="text-xs text-neutral-500">Waiting for arena to end...</div>
        </div>
      )}

      {isEnded && (
        <div className="space-y-3">
          <button
            onClick={handleReveal}
            disabled={revealing}
            className="w-full py-3 rounded text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {revealing ? 'REVEALING...' : 'REVEAL & CLAIM'}
          </button>
        </div>
      )}
    </div>
  );
}
