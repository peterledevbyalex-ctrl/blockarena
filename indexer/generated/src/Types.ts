// This file is to dynamically generate TS types
// which we can't get using GenType
// Use @genType.import to link the types back to ReScript code

import type { Logger, EffectCaller } from "envio";
import type * as Entities from "./db/Entities.gen.ts";

export type LoaderContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  /**
   * True when the handlers run in preload mode - in parallel for the whole batch.
   * Handlers run twice per batch of events, and the first time is the "preload" run
   * During preload entities aren't set, logs are ignored and exceptions are silently swallowed.
   * Preload mode is the best time to populate data to in-memory cache.
   * After preload the handler will run for the second time in sequential order of events.
   */
  readonly isPreload: boolean;
  /**
   * Per-chain state information accessible in event handlers and block handlers.
   * Each chain ID maps to an object containing chain-specific state:
   * - isReady: true when the chain has completed initial sync and is processing live events,
   *            false during historical synchronization
   */
  readonly chains: {
    [chainId: string]: {
      readonly isReady: boolean;
    };
  };
  readonly Arena: {
    /**
     * Load the entity Arena from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Arena_t | undefined>,
    /**
     * Load the entity Arena from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Arena_t>,
    readonly getWhere: Entities.Arena_indexedFieldOperations,
    /**
     * Returns the entity Arena from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Arena_t) => Promise<Entities.Arena_t>,
    /**
     * Set the entity Arena in the storage.
     */
    readonly set: (entity: Entities.Arena_t) => void,
    /**
     * Delete the entity Arena from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ArenaEntry: {
    /**
     * Load the entity ArenaEntry from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ArenaEntry_t | undefined>,
    /**
     * Load the entity ArenaEntry from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ArenaEntry_t>,
    readonly getWhere: Entities.ArenaEntry_indexedFieldOperations,
    /**
     * Returns the entity ArenaEntry from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ArenaEntry_t) => Promise<Entities.ArenaEntry_t>,
    /**
     * Set the entity ArenaEntry in the storage.
     */
    readonly set: (entity: Entities.ArenaEntry_t) => void,
    /**
     * Delete the entity ArenaEntry from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly EmergencyEvent: {
    /**
     * Load the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.EmergencyEvent_t | undefined>,
    /**
     * Load the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.EmergencyEvent_t>,
    readonly getWhere: Entities.EmergencyEvent_indexedFieldOperations,
    /**
     * Returns the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.EmergencyEvent_t) => Promise<Entities.EmergencyEvent_t>,
    /**
     * Set the entity EmergencyEvent in the storage.
     */
    readonly set: (entity: Entities.EmergencyEvent_t) => void,
    /**
     * Delete the entity EmergencyEvent from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Player: {
    /**
     * Load the entity Player from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Player_t | undefined>,
    /**
     * Load the entity Player from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Player_t>,
    readonly getWhere: Entities.Player_indexedFieldOperations,
    /**
     * Returns the entity Player from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Player_t) => Promise<Entities.Player_t>,
    /**
     * Set the entity Player in the storage.
     */
    readonly set: (entity: Entities.Player_t) => void,
    /**
     * Delete the entity Player from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ProtocolStats: {
    /**
     * Load the entity ProtocolStats from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ProtocolStats_t | undefined>,
    /**
     * Load the entity ProtocolStats from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ProtocolStats_t>,
    readonly getWhere: Entities.ProtocolStats_indexedFieldOperations,
    /**
     * Returns the entity ProtocolStats from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ProtocolStats_t) => Promise<Entities.ProtocolStats_t>,
    /**
     * Set the entity ProtocolStats in the storage.
     */
    readonly set: (entity: Entities.ProtocolStats_t) => void,
    /**
     * Delete the entity ProtocolStats from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ReferralPayment: {
    /**
     * Load the entity ReferralPayment from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ReferralPayment_t | undefined>,
    /**
     * Load the entity ReferralPayment from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ReferralPayment_t>,
    readonly getWhere: Entities.ReferralPayment_indexedFieldOperations,
    /**
     * Returns the entity ReferralPayment from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ReferralPayment_t) => Promise<Entities.ReferralPayment_t>,
    /**
     * Set the entity ReferralPayment in the storage.
     */
    readonly set: (entity: Entities.ReferralPayment_t) => void,
    /**
     * Delete the entity ReferralPayment from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Tournament: {
    /**
     * Load the entity Tournament from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Tournament_t | undefined>,
    /**
     * Load the entity Tournament from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Tournament_t>,
    readonly getWhere: Entities.Tournament_indexedFieldOperations,
    /**
     * Returns the entity Tournament from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Tournament_t) => Promise<Entities.Tournament_t>,
    /**
     * Set the entity Tournament in the storage.
     */
    readonly set: (entity: Entities.Tournament_t) => void,
    /**
     * Delete the entity Tournament from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TournamentArena: {
    /**
     * Load the entity TournamentArena from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TournamentArena_t | undefined>,
    /**
     * Load the entity TournamentArena from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TournamentArena_t>,
    readonly getWhere: Entities.TournamentArena_indexedFieldOperations,
    /**
     * Returns the entity TournamentArena from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TournamentArena_t) => Promise<Entities.TournamentArena_t>,
    /**
     * Set the entity TournamentArena in the storage.
     */
    readonly set: (entity: Entities.TournamentArena_t) => void,
    /**
     * Delete the entity TournamentArena from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TournamentQualification: {
    /**
     * Load the entity TournamentQualification from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TournamentQualification_t | undefined>,
    /**
     * Load the entity TournamentQualification from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TournamentQualification_t>,
    readonly getWhere: Entities.TournamentQualification_indexedFieldOperations,
    /**
     * Returns the entity TournamentQualification from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TournamentQualification_t) => Promise<Entities.TournamentQualification_t>,
    /**
     * Set the entity TournamentQualification in the storage.
     */
    readonly set: (entity: Entities.TournamentQualification_t) => void,
    /**
     * Delete the entity TournamentQualification from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TreasuryWithdrawal: {
    /**
     * Load the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TreasuryWithdrawal_t | undefined>,
    /**
     * Load the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TreasuryWithdrawal_t>,
    readonly getWhere: Entities.TreasuryWithdrawal_indexedFieldOperations,
    /**
     * Returns the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TreasuryWithdrawal_t) => Promise<Entities.TreasuryWithdrawal_t>,
    /**
     * Set the entity TreasuryWithdrawal in the storage.
     */
    readonly set: (entity: Entities.TreasuryWithdrawal_t) => void,
    /**
     * Delete the entity TreasuryWithdrawal from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};

export type HandlerContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  /**
   * Per-chain state information accessible in event handlers and block handlers.
   * Each chain ID maps to an object containing chain-specific state:
   * - isReady: true when the chain has completed initial sync and is processing live events,
   *            false during historical synchronization
   */
  readonly chains: {
    [chainId: string]: {
      readonly isReady: boolean;
    };
  };
  readonly Arena: {
    /**
     * Load the entity Arena from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Arena_t | undefined>,
    /**
     * Load the entity Arena from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Arena_t>,
    /**
     * Returns the entity Arena from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Arena_t) => Promise<Entities.Arena_t>,
    /**
     * Set the entity Arena in the storage.
     */
    readonly set: (entity: Entities.Arena_t) => void,
    /**
     * Delete the entity Arena from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ArenaEntry: {
    /**
     * Load the entity ArenaEntry from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ArenaEntry_t | undefined>,
    /**
     * Load the entity ArenaEntry from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ArenaEntry_t>,
    /**
     * Returns the entity ArenaEntry from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ArenaEntry_t) => Promise<Entities.ArenaEntry_t>,
    /**
     * Set the entity ArenaEntry in the storage.
     */
    readonly set: (entity: Entities.ArenaEntry_t) => void,
    /**
     * Delete the entity ArenaEntry from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly EmergencyEvent: {
    /**
     * Load the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.EmergencyEvent_t | undefined>,
    /**
     * Load the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.EmergencyEvent_t>,
    /**
     * Returns the entity EmergencyEvent from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.EmergencyEvent_t) => Promise<Entities.EmergencyEvent_t>,
    /**
     * Set the entity EmergencyEvent in the storage.
     */
    readonly set: (entity: Entities.EmergencyEvent_t) => void,
    /**
     * Delete the entity EmergencyEvent from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Player: {
    /**
     * Load the entity Player from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Player_t | undefined>,
    /**
     * Load the entity Player from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Player_t>,
    /**
     * Returns the entity Player from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Player_t) => Promise<Entities.Player_t>,
    /**
     * Set the entity Player in the storage.
     */
    readonly set: (entity: Entities.Player_t) => void,
    /**
     * Delete the entity Player from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ProtocolStats: {
    /**
     * Load the entity ProtocolStats from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ProtocolStats_t | undefined>,
    /**
     * Load the entity ProtocolStats from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ProtocolStats_t>,
    /**
     * Returns the entity ProtocolStats from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ProtocolStats_t) => Promise<Entities.ProtocolStats_t>,
    /**
     * Set the entity ProtocolStats in the storage.
     */
    readonly set: (entity: Entities.ProtocolStats_t) => void,
    /**
     * Delete the entity ProtocolStats from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly ReferralPayment: {
    /**
     * Load the entity ReferralPayment from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.ReferralPayment_t | undefined>,
    /**
     * Load the entity ReferralPayment from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.ReferralPayment_t>,
    /**
     * Returns the entity ReferralPayment from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.ReferralPayment_t) => Promise<Entities.ReferralPayment_t>,
    /**
     * Set the entity ReferralPayment in the storage.
     */
    readonly set: (entity: Entities.ReferralPayment_t) => void,
    /**
     * Delete the entity ReferralPayment from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Tournament: {
    /**
     * Load the entity Tournament from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Tournament_t | undefined>,
    /**
     * Load the entity Tournament from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Tournament_t>,
    /**
     * Returns the entity Tournament from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Tournament_t) => Promise<Entities.Tournament_t>,
    /**
     * Set the entity Tournament in the storage.
     */
    readonly set: (entity: Entities.Tournament_t) => void,
    /**
     * Delete the entity Tournament from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TournamentArena: {
    /**
     * Load the entity TournamentArena from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TournamentArena_t | undefined>,
    /**
     * Load the entity TournamentArena from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TournamentArena_t>,
    /**
     * Returns the entity TournamentArena from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TournamentArena_t) => Promise<Entities.TournamentArena_t>,
    /**
     * Set the entity TournamentArena in the storage.
     */
    readonly set: (entity: Entities.TournamentArena_t) => void,
    /**
     * Delete the entity TournamentArena from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TournamentQualification: {
    /**
     * Load the entity TournamentQualification from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TournamentQualification_t | undefined>,
    /**
     * Load the entity TournamentQualification from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TournamentQualification_t>,
    /**
     * Returns the entity TournamentQualification from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TournamentQualification_t) => Promise<Entities.TournamentQualification_t>,
    /**
     * Set the entity TournamentQualification in the storage.
     */
    readonly set: (entity: Entities.TournamentQualification_t) => void,
    /**
     * Delete the entity TournamentQualification from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly TreasuryWithdrawal: {
    /**
     * Load the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.TreasuryWithdrawal_t | undefined>,
    /**
     * Load the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.TreasuryWithdrawal_t>,
    /**
     * Returns the entity TreasuryWithdrawal from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.TreasuryWithdrawal_t) => Promise<Entities.TreasuryWithdrawal_t>,
    /**
     * Set the entity TreasuryWithdrawal in the storage.
     */
    readonly set: (entity: Entities.TreasuryWithdrawal_t) => void,
    /**
     * Delete the entity TreasuryWithdrawal from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};
