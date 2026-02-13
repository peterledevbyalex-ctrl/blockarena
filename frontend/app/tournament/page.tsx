'use client';

import { useState } from 'react';
import { ConnectWallet } from '@/components/ConnectWallet';
import Link from 'next/link';
import type { Tournament, TournamentMatch } from '@/types';

function generateMockTournament(): Tournament {
  const matches: TournamentMatch[] = [];
  for (let i = 0; i < 4; i++) {
    matches.push({
      id: `r1-${i}`, round: 1, position: i,
      player1: `0x${(i * 2 + 1).toString(16).padStart(40, 'a')}`,
      player2: `0x${(i * 2 + 2).toString(16).padStart(40, 'b')}`,
      winner: i < 3 ? `0x${(i * 2 + 1).toString(16).padStart(40, 'a')}` : null,
      score1: i < 3 ? 180 + i * 5 : undefined,
      score2: i < 3 ? 160 + i * 3 : undefined,
    });
  }
  for (let i = 0; i < 2; i++) {
    matches.push({
      id: `r2-${i}`, round: 2, position: i,
      player1: i < 1 ? `0x${(1).toString(16).padStart(40, 'a')}` : null,
      player2: i < 1 ? `0x${(3).toString(16).padStart(40, 'a')}` : null,
      winner: null,
    });
  }
  matches.push({ id: 'r3-0', round: 3, position: 0, player1: null, player2: null, winner: null });
  return {
    id: 'tournament-1', name: 'MegaETH Championship #1', status: 'active',
    rounds: 3, matches, prizePool: '10', participants: 8, maxParticipants: 8,
  };
}

export default function TournamentPage() {
  const [tournament] = useState<Tournament>(generateMockTournament);

  const rounds: TournamentMatch[][] = [];
  for (let r = 1; r <= tournament.rounds; r++) {
    rounds.push(tournament.matches.filter((m) => m.round === r));
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">← BACK</Link>
            <span className="text-sm font-bold text-white">TOURNAMENT</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'PLAYERS', value: tournament.participants.toString() },
            { label: 'PRIZE', value: `${tournament.prizePool} ETH` },
            { label: 'ROUNDS', value: tournament.rounds.toString() },
            { label: 'STATUS', value: tournament.status.toUpperCase() },
          ].map((stat) => (
            <div key={stat.label} className="border border-[#222] rounded-lg p-3 bg-[#111]">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-neutral-600 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bracket */}
        <div className="border border-[#222] rounded-lg p-5 bg-[#111] overflow-x-auto">
          <div className="flex gap-8 min-w-max items-center py-4">
            {rounds.map((roundMatches, ri) => (
              <div key={ri} className="flex flex-col gap-4">
                <div className="text-[10px] text-neutral-600 text-center uppercase tracking-wider mb-1">
                  {ri === rounds.length - 1 ? 'FINAL' : `ROUND ${ri + 1}`}
                </div>
                {roundMatches.map((match) => (
                  <div key={match.id} className="border border-[#222] rounded p-2 w-48 bg-[#0a0a0a]">
                    <div className={`flex justify-between items-center p-1.5 text-xs ${
                      match.winner === match.player1 ? 'text-green-500' : 'text-neutral-500'
                    }`}>
                      <span className="truncate max-w-[120px]">
                        {match.player1 ? `${match.player1.slice(0, 6)}...` : 'TBD'}
                      </span>
                      <span className="font-bold">{match.score1 ?? '-'}</span>
                    </div>
                    <div className="h-px bg-[#222] my-0.5" />
                    <div className={`flex justify-between items-center p-1.5 text-xs ${
                      match.winner === match.player2 ? 'text-green-500' : 'text-neutral-500'
                    }`}>
                      <span className="truncate max-w-[120px]">
                        {match.player2 ? `${match.player2.slice(0, 6)}...` : 'TBD'}
                      </span>
                      <span className="font-bold">{match.score2 ?? '-'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
