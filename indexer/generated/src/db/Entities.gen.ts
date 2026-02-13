/* TypeScript file generated from Entities.res by genType. */

/* eslint-disable */
/* tslint:disable */

export type id = string;

export type whereOperations<entity,fieldType> = {
  readonly eq: (_1:fieldType) => Promise<entity[]>; 
  readonly gt: (_1:fieldType) => Promise<entity[]>; 
  readonly lt: (_1:fieldType) => Promise<entity[]>
};

export type Arena_t = {
  readonly bestScore: number; 
  readonly createdAt: number; 
  readonly endBlock: number; 
  readonly entryFee: bigint; 
  readonly epoch: number; 
  readonly finalizedAt: (undefined | number); 
  readonly id: id; 
  readonly isFinalized: boolean; 
  readonly playerCount: number; 
  readonly startBlock: number; 
  readonly tier: number; 
  readonly totalPot: bigint; 
  readonly tournament_id: (undefined | id); 
  readonly winnerCount: number
};

export type Arena_indexedFieldOperations = {};

export type ArenaEntry_t = {
  readonly arena_id: id; 
  readonly committed: boolean; 
  readonly id: id; 
  readonly player_id: id; 
  readonly revealed: boolean; 
  readonly wonAmount: bigint
};

export type ArenaEntry_indexedFieldOperations = {};

export type EmergencyEvent_t = {
  readonly amount: (undefined | bigint); 
  readonly arenaId: (undefined | bigint); 
  readonly blockNumber: number; 
  readonly eventType: string; 
  readonly id: id; 
  readonly player_id: (undefined | id); 
  readonly timestamp: number
};

export type EmergencyEvent_indexedFieldOperations = {};

export type Player_t = {
  readonly godStreak: number; 
  readonly id: id; 
  readonly isFlagged: boolean; 
  readonly referralEarnings: bigint; 
  readonly referrer_id: (undefined | id); 
  readonly totalArenas: number; 
  readonly totalEarnings: bigint; 
  readonly totalWins: number
};

export type Player_indexedFieldOperations = {};

export type ProtocolStats_t = {
  readonly id: id; 
  readonly isPaused: boolean; 
  readonly totalArenas: number; 
  readonly totalPlayers: number; 
  readonly totalTournaments: number; 
  readonly totalVolume: bigint
};

export type ProtocolStats_indexedFieldOperations = {};

export type ReferralPayment_t = {
  readonly amount: bigint; 
  readonly blockNumber: number; 
  readonly id: id; 
  readonly player_id: id; 
  readonly referrer_id: id; 
  readonly timestamp: number
};

export type ReferralPayment_indexedFieldOperations = {};

export type Tournament_t = {
  readonly arenasPerRound: number; 
  readonly id: id; 
  readonly isFinalized: boolean; 
  readonly roundCount: number; 
  readonly tier: number
};

export type Tournament_indexedFieldOperations = {};

export type TournamentArena_t = {
  readonly arena_id: id; 
  readonly id: id; 
  readonly round: number; 
  readonly tournament_id: id
};

export type TournamentArena_indexedFieldOperations = { readonly tournament_id: whereOperations<TournamentArena_t,id> };

export type TournamentQualification_t = {
  readonly id: id; 
  readonly player_id: id; 
  readonly round: number; 
  readonly tournament_id: id
};

export type TournamentQualification_indexedFieldOperations = { readonly tournament_id: whereOperations<TournamentQualification_t,id> };

export type TreasuryWithdrawal_t = {
  readonly amount: bigint; 
  readonly blockNumber: number; 
  readonly id: id; 
  readonly timestamp: number; 
  readonly to: string
};

export type TreasuryWithdrawal_indexedFieldOperations = {};
