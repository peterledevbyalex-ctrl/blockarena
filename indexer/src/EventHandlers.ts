import {
  BlockArena,
  Arena,
  Player,
  ArenaEntry,
  ReferralPayment,
  Tournament,
  TournamentArena,
  TournamentQualification,
  EmergencyEvent,
  TreasuryWithdrawal,
  ProtocolStats,
} from "generated";

// ─── Helpers ───

function getOrDefaultPlayer(existing: Player | undefined, id: string): Player {
  return existing ?? {
    id,
    totalArenas: 0,
    totalWins: 0,
    totalEarnings: 0n,
    godStreak: 0,
    referrer_id: undefined,
    referralEarnings: 0n,
    isFlagged: false,
  };
}

function getOrDefaultStats(existing: ProtocolStats | undefined): ProtocolStats {
  return existing ?? {
    id: "singleton",
    totalArenas: 0,
    totalPlayers: 0,
    totalVolume: 0n,
    totalTournaments: 0,
    isPaused: false,
  };
}

// ─── Arena Events ───

BlockArena.ArenaCreated.handler(async ({ event, context }) => {
  const arena: Arena = {
    id: event.params.arenaId.toString(),
    tier: Number(event.params.tier),
    entryFee: event.params.entryFee,
    startBlock: Number(event.params.startBlock),
    endBlock: Number(event.params.endBlock),
    epoch: 0,
    playerCount: 0,
    isFinalized: false,
    winnerCount: 0,
    bestScore: 0,
    totalPot: 0n,
    createdAt: event.block.number,
    finalizedAt: undefined,
    tournament_id: undefined,
  };
  context.Arena.set(arena);

  const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
  context.ProtocolStats.set({ ...stats, totalArenas: stats.totalArenas + 1 });
});

BlockArena.ArenaFinalized.handler(async ({ event, context }) => {
  const id = event.params.arenaId.toString();
  const arena = await context.Arena.get(id);
  if (arena) {
    context.Arena.set({
      ...arena,
      isFinalized: true,
      winnerCount: Number(event.params.winnerCount),
      bestScore: Number(event.params.bestScore),
      finalizedAt: event.block.number,
    });
  }
});

BlockArena.ArenaReset.handler(async ({ event, context }) => {
  const id = event.params.arenaId.toString();
  const arena = await context.Arena.get(id);
  if (arena) {
    context.Arena.set({
      ...arena,
      epoch: Number(event.params.newEpoch),
      isFinalized: false,
      playerCount: 0,
      winnerCount: 0,
      bestScore: 0,
      totalPot: 0n,
    });
  }
});

// ─── Player Events ───

BlockArena.PlayerJoined.handler(async ({ event, context }) => {
  const arenaId = event.params.arenaId.toString();
  const playerAddr = event.params.player.toLowerCase();
  const refAddr = event.params.ref.toLowerCase();

  // Update player
  const player = getOrDefaultPlayer(await context.Player.get(playerAddr), playerAddr);
  const isNew = player.totalArenas === 0;
  context.Player.set({ ...player, totalArenas: player.totalArenas + 1 });

  // Set referrer if non-zero
  if (refAddr !== "0x0000000000000000000000000000000000000000" && !player.referrer_id) {
    const ref = getOrDefaultPlayer(await context.Player.get(refAddr), refAddr);
    context.Player.set({ ...ref }); // ensure referrer exists
    context.Player.set({ ...player, totalArenas: player.totalArenas + 1, referrer_id: refAddr });
  }

  // Create arena entry
  const entryId = `${arenaId}-${playerAddr}`;
  context.ArenaEntry.set({
    id: entryId,
    arena_id: arenaId,
    player_id: playerAddr,
    committed: false,
    revealed: false,
    wonAmount: 0n,
  });

  // Update arena player count
  const arena = await context.Arena.get(arenaId);
  if (arena) {
    context.Arena.set({
      ...arena,
      playerCount: arena.playerCount + 1,
      totalPot: arena.totalPot + arena.entryFee,
    });
  }

  // Update protocol stats
  if (isNew) {
    const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
    context.ProtocolStats.set({ ...stats, totalPlayers: stats.totalPlayers + 1 });
  }
});

BlockArena.PredictionCommitted.handler(async ({ event, context }) => {
  const entryId = `${event.params.arenaId.toString()}-${event.params.player.toLowerCase()}`;
  const entry = await context.ArenaEntry.get(entryId);
  if (entry) {
    context.ArenaEntry.set({ ...entry, committed: true });
  }
});

BlockArena.PredictionRevealed.handler(async ({ event, context }) => {
  const entryId = `${event.params.arenaId.toString()}-${event.params.player.toLowerCase()}`;
  const entry = await context.ArenaEntry.get(entryId);
  if (entry) {
    context.ArenaEntry.set({ ...entry, revealed: true });
  }
});

BlockArena.PotDistributed.handler(async ({ event, context }) => {
  const arenaId = event.params.arenaId.toString();
  const playerAddr = event.params.winner.toLowerCase();
  const amount = event.params.amount;

  // Update entry
  const entryId = `${arenaId}-${playerAddr}`;
  const entry = await context.ArenaEntry.get(entryId);
  if (entry) {
    context.ArenaEntry.set({ ...entry, wonAmount: entry.wonAmount + amount });
  }

  // Update player
  const player = getOrDefaultPlayer(await context.Player.get(playerAddr), playerAddr);
  context.Player.set({
    ...player,
    totalWins: player.totalWins + 1,
    totalEarnings: player.totalEarnings + amount,
  });

  // Update protocol volume
  const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
  context.ProtocolStats.set({ ...stats, totalVolume: stats.totalVolume + amount });
});

// ─── Referral Events ───

BlockArena.ReferralPaid.handler(async ({ event, context }) => {
  const refAddr = event.params.ref.toLowerCase();
  const playerAddr = event.params.player.toLowerCase();

  context.ReferralPayment.set({
    id: `${event.block.hash}-${event.logIndex}`,
    referrer_id: refAddr,
    player_id: playerAddr,
    amount: event.params.amount,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });

  // Update referrer earnings
  const ref = getOrDefaultPlayer(await context.Player.get(refAddr), refAddr);
  context.Player.set({ ...ref, referralEarnings: ref.referralEarnings + event.params.amount });
});

BlockArena.ReferrerSet.handler(async ({ event, context }) => {
  const playerAddr = event.params.player.toLowerCase();
  const refAddr = event.params.ref.toLowerCase();

  const player = getOrDefaultPlayer(await context.Player.get(playerAddr), playerAddr);
  const ref = getOrDefaultPlayer(await context.Player.get(refAddr), refAddr);
  context.Player.set({ ...ref }); // ensure exists
  context.Player.set({ ...player, referrer_id: refAddr });
});

// ─── Streak Events ───

BlockArena.GodStreakUpdate.handler(async ({ event, context }) => {
  const playerAddr = event.params.player.toLowerCase();
  const player = getOrDefaultPlayer(await context.Player.get(playerAddr), playerAddr);
  context.Player.set({ ...player, godStreak: Number(event.params.streak) });
});

BlockArena.BotDetected.handler(async ({ event, context }) => {
  const playerAddr = event.params.player.toLowerCase();
  const player = getOrDefaultPlayer(await context.Player.get(playerAddr), playerAddr);
  context.Player.set({ ...player, isFlagged: true });
});

// ─── Tournament Events ───

BlockArena.TournamentCreated.handler(async ({ event, context }) => {
  const id = event.params.tournamentId.toString();
  context.Tournament.set({
    id,
    tier: Number(event.params.tier),
    roundCount: Number(event.params.roundCount),
    arenasPerRound: Number(event.params.arenasPerRound),
    isFinalized: false,
  });

  const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
  context.ProtocolStats.set({ ...stats, totalTournaments: stats.totalTournaments + 1 });
});

BlockArena.TournamentFinalized.handler(async ({ event, context }) => {
  const id = event.params.tournamentId.toString();
  const tournament = await context.Tournament.get(id);
  if (tournament) {
    context.Tournament.set({ ...tournament, isFinalized: true });
  }
});

BlockArena.TournamentArenaAdded.handler(async ({ event, context }) => {
  const tournamentId = event.params.tournamentId.toString();
  const arenaId = event.params.arenaId.toString();
  const round = Number(event.params.round);

  context.TournamentArena.set({
    id: `${tournamentId}-${round}-${arenaId}`,
    tournament_id: tournamentId,
    round,
    arena_id: arenaId,
  });

  // Link arena to tournament
  const arena = await context.Arena.get(arenaId);
  if (arena) {
    context.Arena.set({ ...arena, tournament_id: tournamentId });
  }
});

BlockArena.TournamentPlayerQualified.handler(async ({ event, context }) => {
  const tournamentId = event.params.tournamentId.toString();
  const playerAddr = event.params.player.toLowerCase();
  const round = Number(event.params.round);

  context.TournamentQualification.set({
    id: `${tournamentId}-${round}-${playerAddr}`,
    tournament_id: tournamentId,
    round,
    player_id: playerAddr,
  });
});

// ─── Emergency & Admin Events ───

BlockArena.EmergencyWithdraw.handler(async ({ event, context }) => {
  context.EmergencyEvent.set({
    id: `${event.block.hash}-${event.logIndex}`,
    arenaId: event.params.arenaId,
    player_id: event.params.player.toLowerCase(),
    amount: event.params.amount,
    eventType: "withdraw",
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });
});

BlockArena.Paused.handler(async ({ event, context }) => {
  context.EmergencyEvent.set({
    id: `${event.block.hash}-${event.logIndex}`,
    arenaId: undefined,
    player_id: undefined,
    amount: undefined,
    eventType: "paused",
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });

  const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
  context.ProtocolStats.set({ ...stats, isPaused: true });
});

BlockArena.Unpaused.handler(async ({ event, context }) => {
  context.EmergencyEvent.set({
    id: `${event.block.hash}-${event.logIndex}`,
    arenaId: undefined,
    player_id: undefined,
    amount: undefined,
    eventType: "unpaused",
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });

  const stats = getOrDefaultStats(await context.ProtocolStats.get("singleton"));
  context.ProtocolStats.set({ ...stats, isPaused: false });
});

BlockArena.TreasuryWithdrawn.handler(async ({ event, context }) => {
  context.TreasuryWithdrawal.set({
    id: `${event.block.hash}-${event.logIndex}`,
    to: event.params.to.toLowerCase(),
    amount: event.params.amount,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });
});
