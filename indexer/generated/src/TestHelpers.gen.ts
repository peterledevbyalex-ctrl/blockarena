/* TypeScript file generated from TestHelpers.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpersJS = require('./TestHelpers.res.js');

import type {BlockArena_ArenaCreated_event as Types_BlockArena_ArenaCreated_event} from './Types.gen';

import type {BlockArena_ArenaFinalized_event as Types_BlockArena_ArenaFinalized_event} from './Types.gen';

import type {BlockArena_ArenaReset_event as Types_BlockArena_ArenaReset_event} from './Types.gen';

import type {BlockArena_BotDetected_event as Types_BlockArena_BotDetected_event} from './Types.gen';

import type {BlockArena_EmergencyWithdraw_event as Types_BlockArena_EmergencyWithdraw_event} from './Types.gen';

import type {BlockArena_GodStreakUpdate_event as Types_BlockArena_GodStreakUpdate_event} from './Types.gen';

import type {BlockArena_Paused_event as Types_BlockArena_Paused_event} from './Types.gen';

import type {BlockArena_PlayerJoined_event as Types_BlockArena_PlayerJoined_event} from './Types.gen';

import type {BlockArena_PotDistributed_event as Types_BlockArena_PotDistributed_event} from './Types.gen';

import type {BlockArena_PredictionCommitted_event as Types_BlockArena_PredictionCommitted_event} from './Types.gen';

import type {BlockArena_PredictionRevealed_event as Types_BlockArena_PredictionRevealed_event} from './Types.gen';

import type {BlockArena_ReferralPaid_event as Types_BlockArena_ReferralPaid_event} from './Types.gen';

import type {BlockArena_ReferrerSet_event as Types_BlockArena_ReferrerSet_event} from './Types.gen';

import type {BlockArena_TournamentArenaAdded_event as Types_BlockArena_TournamentArenaAdded_event} from './Types.gen';

import type {BlockArena_TournamentCreated_event as Types_BlockArena_TournamentCreated_event} from './Types.gen';

import type {BlockArena_TournamentFinalized_event as Types_BlockArena_TournamentFinalized_event} from './Types.gen';

import type {BlockArena_TournamentPlayerQualified_event as Types_BlockArena_TournamentPlayerQualified_event} from './Types.gen';

import type {BlockArena_TreasuryWithdrawn_event as Types_BlockArena_TreasuryWithdrawn_event} from './Types.gen';

import type {BlockArena_Unpaused_event as Types_BlockArena_Unpaused_event} from './Types.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

import type {t as TestHelpers_MockDb_t} from './TestHelpers_MockDb.gen';

/** The arguements that get passed to a "processEvent" helper function */
export type EventFunctions_eventProcessorArgs<event> = {
  readonly event: event; 
  readonly mockDb: TestHelpers_MockDb_t; 
  readonly chainId?: number
};

export type EventFunctions_eventProcessor<event> = (_1:EventFunctions_eventProcessorArgs<event>) => Promise<TestHelpers_MockDb_t>;

export type EventFunctions_MockBlock_t = {
  readonly hash?: string; 
  readonly number?: number; 
  readonly timestamp?: number
};

export type EventFunctions_MockTransaction_t = {};

export type EventFunctions_mockEventData = {
  readonly chainId?: number; 
  readonly srcAddress?: Address_t; 
  readonly logIndex?: number; 
  readonly block?: EventFunctions_MockBlock_t; 
  readonly transaction?: EventFunctions_MockTransaction_t
};

export type BlockArena_ArenaCreated_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly tier?: bigint; 
  readonly entryFee?: bigint; 
  readonly startBlock?: bigint; 
  readonly endBlock?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_ArenaFinalized_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly winnerCount?: bigint; 
  readonly bestScore?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_ArenaReset_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly newEpoch?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_PlayerJoined_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly player?: Address_t; 
  readonly ref?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_PredictionCommitted_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly player?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_PredictionRevealed_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly player?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_PotDistributed_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly winner?: Address_t; 
  readonly amount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_ReferralPaid_createMockArgs = {
  readonly ref?: Address_t; 
  readonly player?: Address_t; 
  readonly amount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_ReferrerSet_createMockArgs = {
  readonly player?: Address_t; 
  readonly ref?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_GodStreakUpdate_createMockArgs = {
  readonly player?: Address_t; 
  readonly streak?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_BotDetected_createMockArgs = {
  readonly player?: Address_t; 
  readonly reason?: string; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_TournamentCreated_createMockArgs = {
  readonly tournamentId?: bigint; 
  readonly tier?: bigint; 
  readonly roundCount?: bigint; 
  readonly arenasPerRound?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_TournamentFinalized_createMockArgs = { readonly tournamentId?: bigint; readonly mockEventData?: EventFunctions_mockEventData };

export type BlockArena_TournamentArenaAdded_createMockArgs = {
  readonly tournamentId?: bigint; 
  readonly round?: bigint; 
  readonly arenaId?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_TournamentPlayerQualified_createMockArgs = {
  readonly tournamentId?: bigint; 
  readonly round?: bigint; 
  readonly player?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_EmergencyWithdraw_createMockArgs = {
  readonly arenaId?: bigint; 
  readonly player?: Address_t; 
  readonly amount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_TreasuryWithdrawn_createMockArgs = {
  readonly to?: Address_t; 
  readonly amount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type BlockArena_Paused_createMockArgs = { readonly mockEventData?: EventFunctions_mockEventData };

export type BlockArena_Unpaused_createMockArgs = { readonly mockEventData?: EventFunctions_mockEventData };

export const MockDb_createMockDb: () => TestHelpers_MockDb_t = TestHelpersJS.MockDb.createMockDb as any;

export const Addresses_mockAddresses: Address_t[] = TestHelpersJS.Addresses.mockAddresses as any;

export const Addresses_defaultAddress: Address_t = TestHelpersJS.Addresses.defaultAddress as any;

export const BlockArena_ArenaCreated_processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaCreated_event> = TestHelpersJS.BlockArena.ArenaCreated.processEvent as any;

export const BlockArena_ArenaCreated_createMockEvent: (args:BlockArena_ArenaCreated_createMockArgs) => Types_BlockArena_ArenaCreated_event = TestHelpersJS.BlockArena.ArenaCreated.createMockEvent as any;

export const BlockArena_ArenaFinalized_processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaFinalized_event> = TestHelpersJS.BlockArena.ArenaFinalized.processEvent as any;

export const BlockArena_ArenaFinalized_createMockEvent: (args:BlockArena_ArenaFinalized_createMockArgs) => Types_BlockArena_ArenaFinalized_event = TestHelpersJS.BlockArena.ArenaFinalized.createMockEvent as any;

export const BlockArena_ArenaReset_processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaReset_event> = TestHelpersJS.BlockArena.ArenaReset.processEvent as any;

export const BlockArena_ArenaReset_createMockEvent: (args:BlockArena_ArenaReset_createMockArgs) => Types_BlockArena_ArenaReset_event = TestHelpersJS.BlockArena.ArenaReset.createMockEvent as any;

export const BlockArena_PlayerJoined_processEvent: EventFunctions_eventProcessor<Types_BlockArena_PlayerJoined_event> = TestHelpersJS.BlockArena.PlayerJoined.processEvent as any;

export const BlockArena_PlayerJoined_createMockEvent: (args:BlockArena_PlayerJoined_createMockArgs) => Types_BlockArena_PlayerJoined_event = TestHelpersJS.BlockArena.PlayerJoined.createMockEvent as any;

export const BlockArena_PredictionCommitted_processEvent: EventFunctions_eventProcessor<Types_BlockArena_PredictionCommitted_event> = TestHelpersJS.BlockArena.PredictionCommitted.processEvent as any;

export const BlockArena_PredictionCommitted_createMockEvent: (args:BlockArena_PredictionCommitted_createMockArgs) => Types_BlockArena_PredictionCommitted_event = TestHelpersJS.BlockArena.PredictionCommitted.createMockEvent as any;

export const BlockArena_PredictionRevealed_processEvent: EventFunctions_eventProcessor<Types_BlockArena_PredictionRevealed_event> = TestHelpersJS.BlockArena.PredictionRevealed.processEvent as any;

export const BlockArena_PredictionRevealed_createMockEvent: (args:BlockArena_PredictionRevealed_createMockArgs) => Types_BlockArena_PredictionRevealed_event = TestHelpersJS.BlockArena.PredictionRevealed.createMockEvent as any;

export const BlockArena_PotDistributed_processEvent: EventFunctions_eventProcessor<Types_BlockArena_PotDistributed_event> = TestHelpersJS.BlockArena.PotDistributed.processEvent as any;

export const BlockArena_PotDistributed_createMockEvent: (args:BlockArena_PotDistributed_createMockArgs) => Types_BlockArena_PotDistributed_event = TestHelpersJS.BlockArena.PotDistributed.createMockEvent as any;

export const BlockArena_ReferralPaid_processEvent: EventFunctions_eventProcessor<Types_BlockArena_ReferralPaid_event> = TestHelpersJS.BlockArena.ReferralPaid.processEvent as any;

export const BlockArena_ReferralPaid_createMockEvent: (args:BlockArena_ReferralPaid_createMockArgs) => Types_BlockArena_ReferralPaid_event = TestHelpersJS.BlockArena.ReferralPaid.createMockEvent as any;

export const BlockArena_ReferrerSet_processEvent: EventFunctions_eventProcessor<Types_BlockArena_ReferrerSet_event> = TestHelpersJS.BlockArena.ReferrerSet.processEvent as any;

export const BlockArena_ReferrerSet_createMockEvent: (args:BlockArena_ReferrerSet_createMockArgs) => Types_BlockArena_ReferrerSet_event = TestHelpersJS.BlockArena.ReferrerSet.createMockEvent as any;

export const BlockArena_GodStreakUpdate_processEvent: EventFunctions_eventProcessor<Types_BlockArena_GodStreakUpdate_event> = TestHelpersJS.BlockArena.GodStreakUpdate.processEvent as any;

export const BlockArena_GodStreakUpdate_createMockEvent: (args:BlockArena_GodStreakUpdate_createMockArgs) => Types_BlockArena_GodStreakUpdate_event = TestHelpersJS.BlockArena.GodStreakUpdate.createMockEvent as any;

export const BlockArena_BotDetected_processEvent: EventFunctions_eventProcessor<Types_BlockArena_BotDetected_event> = TestHelpersJS.BlockArena.BotDetected.processEvent as any;

export const BlockArena_BotDetected_createMockEvent: (args:BlockArena_BotDetected_createMockArgs) => Types_BlockArena_BotDetected_event = TestHelpersJS.BlockArena.BotDetected.createMockEvent as any;

export const BlockArena_TournamentCreated_processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentCreated_event> = TestHelpersJS.BlockArena.TournamentCreated.processEvent as any;

export const BlockArena_TournamentCreated_createMockEvent: (args:BlockArena_TournamentCreated_createMockArgs) => Types_BlockArena_TournamentCreated_event = TestHelpersJS.BlockArena.TournamentCreated.createMockEvent as any;

export const BlockArena_TournamentFinalized_processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentFinalized_event> = TestHelpersJS.BlockArena.TournamentFinalized.processEvent as any;

export const BlockArena_TournamentFinalized_createMockEvent: (args:BlockArena_TournamentFinalized_createMockArgs) => Types_BlockArena_TournamentFinalized_event = TestHelpersJS.BlockArena.TournamentFinalized.createMockEvent as any;

export const BlockArena_TournamentArenaAdded_processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentArenaAdded_event> = TestHelpersJS.BlockArena.TournamentArenaAdded.processEvent as any;

export const BlockArena_TournamentArenaAdded_createMockEvent: (args:BlockArena_TournamentArenaAdded_createMockArgs) => Types_BlockArena_TournamentArenaAdded_event = TestHelpersJS.BlockArena.TournamentArenaAdded.createMockEvent as any;

export const BlockArena_TournamentPlayerQualified_processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentPlayerQualified_event> = TestHelpersJS.BlockArena.TournamentPlayerQualified.processEvent as any;

export const BlockArena_TournamentPlayerQualified_createMockEvent: (args:BlockArena_TournamentPlayerQualified_createMockArgs) => Types_BlockArena_TournamentPlayerQualified_event = TestHelpersJS.BlockArena.TournamentPlayerQualified.createMockEvent as any;

export const BlockArena_EmergencyWithdraw_processEvent: EventFunctions_eventProcessor<Types_BlockArena_EmergencyWithdraw_event> = TestHelpersJS.BlockArena.EmergencyWithdraw.processEvent as any;

export const BlockArena_EmergencyWithdraw_createMockEvent: (args:BlockArena_EmergencyWithdraw_createMockArgs) => Types_BlockArena_EmergencyWithdraw_event = TestHelpersJS.BlockArena.EmergencyWithdraw.createMockEvent as any;

export const BlockArena_TreasuryWithdrawn_processEvent: EventFunctions_eventProcessor<Types_BlockArena_TreasuryWithdrawn_event> = TestHelpersJS.BlockArena.TreasuryWithdrawn.processEvent as any;

export const BlockArena_TreasuryWithdrawn_createMockEvent: (args:BlockArena_TreasuryWithdrawn_createMockArgs) => Types_BlockArena_TreasuryWithdrawn_event = TestHelpersJS.BlockArena.TreasuryWithdrawn.createMockEvent as any;

export const BlockArena_Paused_processEvent: EventFunctions_eventProcessor<Types_BlockArena_Paused_event> = TestHelpersJS.BlockArena.Paused.processEvent as any;

export const BlockArena_Paused_createMockEvent: (args:BlockArena_Paused_createMockArgs) => Types_BlockArena_Paused_event = TestHelpersJS.BlockArena.Paused.createMockEvent as any;

export const BlockArena_Unpaused_processEvent: EventFunctions_eventProcessor<Types_BlockArena_Unpaused_event> = TestHelpersJS.BlockArena.Unpaused.processEvent as any;

export const BlockArena_Unpaused_createMockEvent: (args:BlockArena_Unpaused_createMockArgs) => Types_BlockArena_Unpaused_event = TestHelpersJS.BlockArena.Unpaused.createMockEvent as any;

export const Addresses: { mockAddresses: Address_t[]; defaultAddress: Address_t } = TestHelpersJS.Addresses as any;

export const BlockArena: {
  ReferralPaid: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_ReferralPaid_event>; 
    createMockEvent: (args:BlockArena_ReferralPaid_createMockArgs) => Types_BlockArena_ReferralPaid_event
  }; 
  TournamentPlayerQualified: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentPlayerQualified_event>; 
    createMockEvent: (args:BlockArena_TournamentPlayerQualified_createMockArgs) => Types_BlockArena_TournamentPlayerQualified_event
  }; 
  Unpaused: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_Unpaused_event>; 
    createMockEvent: (args:BlockArena_Unpaused_createMockArgs) => Types_BlockArena_Unpaused_event
  }; 
  PlayerJoined: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_PlayerJoined_event>; 
    createMockEvent: (args:BlockArena_PlayerJoined_createMockArgs) => Types_BlockArena_PlayerJoined_event
  }; 
  BotDetected: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_BotDetected_event>; 
    createMockEvent: (args:BlockArena_BotDetected_createMockArgs) => Types_BlockArena_BotDetected_event
  }; 
  TournamentCreated: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentCreated_event>; 
    createMockEvent: (args:BlockArena_TournamentCreated_createMockArgs) => Types_BlockArena_TournamentCreated_event
  }; 
  TournamentArenaAdded: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentArenaAdded_event>; 
    createMockEvent: (args:BlockArena_TournamentArenaAdded_createMockArgs) => Types_BlockArena_TournamentArenaAdded_event
  }; 
  PredictionCommitted: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_PredictionCommitted_event>; 
    createMockEvent: (args:BlockArena_PredictionCommitted_createMockArgs) => Types_BlockArena_PredictionCommitted_event
  }; 
  ArenaCreated: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaCreated_event>; 
    createMockEvent: (args:BlockArena_ArenaCreated_createMockArgs) => Types_BlockArena_ArenaCreated_event
  }; 
  ArenaFinalized: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaFinalized_event>; 
    createMockEvent: (args:BlockArena_ArenaFinalized_createMockArgs) => Types_BlockArena_ArenaFinalized_event
  }; 
  ReferrerSet: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_ReferrerSet_event>; 
    createMockEvent: (args:BlockArena_ReferrerSet_createMockArgs) => Types_BlockArena_ReferrerSet_event
  }; 
  TournamentFinalized: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_TournamentFinalized_event>; 
    createMockEvent: (args:BlockArena_TournamentFinalized_createMockArgs) => Types_BlockArena_TournamentFinalized_event
  }; 
  PredictionRevealed: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_PredictionRevealed_event>; 
    createMockEvent: (args:BlockArena_PredictionRevealed_createMockArgs) => Types_BlockArena_PredictionRevealed_event
  }; 
  ArenaReset: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_ArenaReset_event>; 
    createMockEvent: (args:BlockArena_ArenaReset_createMockArgs) => Types_BlockArena_ArenaReset_event
  }; 
  GodStreakUpdate: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_GodStreakUpdate_event>; 
    createMockEvent: (args:BlockArena_GodStreakUpdate_createMockArgs) => Types_BlockArena_GodStreakUpdate_event
  }; 
  EmergencyWithdraw: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_EmergencyWithdraw_event>; 
    createMockEvent: (args:BlockArena_EmergencyWithdraw_createMockArgs) => Types_BlockArena_EmergencyWithdraw_event
  }; 
  Paused: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_Paused_event>; 
    createMockEvent: (args:BlockArena_Paused_createMockArgs) => Types_BlockArena_Paused_event
  }; 
  TreasuryWithdrawn: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_TreasuryWithdrawn_event>; 
    createMockEvent: (args:BlockArena_TreasuryWithdrawn_createMockArgs) => Types_BlockArena_TreasuryWithdrawn_event
  }; 
  PotDistributed: {
    processEvent: EventFunctions_eventProcessor<Types_BlockArena_PotDistributed_event>; 
    createMockEvent: (args:BlockArena_PotDistributed_createMockArgs) => Types_BlockArena_PotDistributed_event
  }
} = TestHelpersJS.BlockArena as any;

export const MockDb: { createMockDb: () => TestHelpers_MockDb_t } = TestHelpersJS.MockDb as any;
