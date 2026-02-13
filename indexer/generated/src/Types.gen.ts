/* TypeScript file generated from Types.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {ArenaEntry_t as Entities_ArenaEntry_t} from '../src/db/Entities.gen';

import type {Arena_t as Entities_Arena_t} from '../src/db/Entities.gen';

import type {EmergencyEvent_t as Entities_EmergencyEvent_t} from '../src/db/Entities.gen';

import type {HandlerContext as $$handlerContext} from './Types.ts';

import type {HandlerWithOptions as $$fnWithEventConfig} from './bindings/OpaqueTypes.ts';

import type {LoaderContext as $$loaderContext} from './Types.ts';

import type {Player_t as Entities_Player_t} from '../src/db/Entities.gen';

import type {ProtocolStats_t as Entities_ProtocolStats_t} from '../src/db/Entities.gen';

import type {ReferralPayment_t as Entities_ReferralPayment_t} from '../src/db/Entities.gen';

import type {SingleOrMultiple as $$SingleOrMultiple_t} from './bindings/OpaqueTypes';

import type {TournamentArena_t as Entities_TournamentArena_t} from '../src/db/Entities.gen';

import type {TournamentQualification_t as Entities_TournamentQualification_t} from '../src/db/Entities.gen';

import type {Tournament_t as Entities_Tournament_t} from '../src/db/Entities.gen';

import type {TreasuryWithdrawal_t as Entities_TreasuryWithdrawal_t} from '../src/db/Entities.gen';

import type {entityHandlerContext as Internal_entityHandlerContext} from 'envio/src/Internal.gen';

import type {eventOptions as Internal_eventOptions} from 'envio/src/Internal.gen';

import type {genericContractRegisterArgs as Internal_genericContractRegisterArgs} from 'envio/src/Internal.gen';

import type {genericContractRegister as Internal_genericContractRegister} from 'envio/src/Internal.gen';

import type {genericEvent as Internal_genericEvent} from 'envio/src/Internal.gen';

import type {genericHandlerArgs as Internal_genericHandlerArgs} from 'envio/src/Internal.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

import type {genericHandler as Internal_genericHandler} from 'envio/src/Internal.gen';

import type {genericLoaderArgs as Internal_genericLoaderArgs} from 'envio/src/Internal.gen';

import type {genericLoader as Internal_genericLoader} from 'envio/src/Internal.gen';

import type {logger as Envio_logger} from 'envio/src/Envio.gen';

import type {noEventFilters as Internal_noEventFilters} from 'envio/src/Internal.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

export type id = string;
export type Id = id;

export type contractRegistrations = { readonly log: Envio_logger; readonly addBlockArena: (_1:Address_t) => void };

export type entityLoaderContext<entity,indexedFieldOperations> = {
  readonly get: (_1:id) => Promise<(undefined | entity)>; 
  readonly getOrThrow: (_1:id, message:(undefined | string)) => Promise<entity>; 
  readonly getWhere: indexedFieldOperations; 
  readonly getOrCreate: (_1:entity) => Promise<entity>; 
  readonly set: (_1:entity) => void; 
  readonly deleteUnsafe: (_1:id) => void
};

export type loaderContext = $$loaderContext;

export type entityHandlerContext<entity> = Internal_entityHandlerContext<entity>;

export type handlerContext = $$handlerContext;

export type arena = Entities_Arena_t;
export type Arena = arena;

export type arenaEntry = Entities_ArenaEntry_t;
export type ArenaEntry = arenaEntry;

export type emergencyEvent = Entities_EmergencyEvent_t;
export type EmergencyEvent = emergencyEvent;

export type player = Entities_Player_t;
export type Player = player;

export type protocolStats = Entities_ProtocolStats_t;
export type ProtocolStats = protocolStats;

export type referralPayment = Entities_ReferralPayment_t;
export type ReferralPayment = referralPayment;

export type tournament = Entities_Tournament_t;
export type Tournament = tournament;

export type tournamentArena = Entities_TournamentArena_t;
export type TournamentArena = tournamentArena;

export type tournamentQualification = Entities_TournamentQualification_t;
export type TournamentQualification = tournamentQualification;

export type treasuryWithdrawal = Entities_TreasuryWithdrawal_t;
export type TreasuryWithdrawal = treasuryWithdrawal;

export type Transaction_t = {};

export type Block_t = {
  readonly number: number; 
  readonly timestamp: number; 
  readonly hash: string
};

export type AggregatedBlock_t = {
  readonly hash: string; 
  readonly number: number; 
  readonly timestamp: number
};

export type AggregatedTransaction_t = {};

export type eventLog<params> = Internal_genericEvent<params,Block_t,Transaction_t>;
export type EventLog<params> = eventLog<params>;

export type SingleOrMultiple_t<a> = $$SingleOrMultiple_t<a>;

export type HandlerTypes_args<eventArgs,context> = { readonly event: eventLog<eventArgs>; readonly context: context };

export type HandlerTypes_contractRegisterArgs<eventArgs> = Internal_genericContractRegisterArgs<eventLog<eventArgs>,contractRegistrations>;

export type HandlerTypes_contractRegister<eventArgs> = Internal_genericContractRegister<HandlerTypes_contractRegisterArgs<eventArgs>>;

export type HandlerTypes_loaderArgs<eventArgs> = Internal_genericLoaderArgs<eventLog<eventArgs>,loaderContext>;

export type HandlerTypes_loader<eventArgs,loaderReturn> = Internal_genericLoader<HandlerTypes_loaderArgs<eventArgs>,loaderReturn>;

export type HandlerTypes_handlerArgs<eventArgs,loaderReturn> = Internal_genericHandlerArgs<eventLog<eventArgs>,handlerContext,loaderReturn>;

export type HandlerTypes_handler<eventArgs,loaderReturn> = Internal_genericHandler<HandlerTypes_handlerArgs<eventArgs,loaderReturn>>;

export type HandlerTypes_loaderHandler<eventArgs,loaderReturn,eventFilters> = Internal_genericHandlerWithLoader<HandlerTypes_loader<eventArgs,loaderReturn>,HandlerTypes_handler<eventArgs,loaderReturn>,eventFilters>;

export type HandlerTypes_eventConfig<eventFilters> = Internal_eventOptions<eventFilters>;

export type fnWithEventConfig<fn,eventConfig> = $$fnWithEventConfig<fn,eventConfig>;

export type handlerWithOptions<eventArgs,loaderReturn,eventFilters> = fnWithEventConfig<HandlerTypes_handler<eventArgs,loaderReturn>,HandlerTypes_eventConfig<eventFilters>>;

export type contractRegisterWithOptions<eventArgs,eventFilters> = fnWithEventConfig<HandlerTypes_contractRegister<eventArgs>,HandlerTypes_eventConfig<eventFilters>>;

export type BlockArena_chainId = 6343;

export type BlockArena_ArenaCreated_eventArgs = {
  readonly arenaId: bigint; 
  readonly tier: bigint; 
  readonly entryFee: bigint; 
  readonly startBlock: bigint; 
  readonly endBlock: bigint
};

export type BlockArena_ArenaCreated_block = Block_t;

export type BlockArena_ArenaCreated_transaction = Transaction_t;

export type BlockArena_ArenaCreated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_ArenaCreated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_ArenaCreated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_ArenaCreated_block
};

export type BlockArena_ArenaCreated_loaderArgs = Internal_genericLoaderArgs<BlockArena_ArenaCreated_event,loaderContext>;

export type BlockArena_ArenaCreated_loader<loaderReturn> = Internal_genericLoader<BlockArena_ArenaCreated_loaderArgs,loaderReturn>;

export type BlockArena_ArenaCreated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_ArenaCreated_event,handlerContext,loaderReturn>;

export type BlockArena_ArenaCreated_handler<loaderReturn> = Internal_genericHandler<BlockArena_ArenaCreated_handlerArgs<loaderReturn>>;

export type BlockArena_ArenaCreated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_ArenaCreated_event,contractRegistrations>>;

export type BlockArena_ArenaCreated_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint> };

export type BlockArena_ArenaCreated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_ArenaCreated_eventFiltersDefinition = 
    BlockArena_ArenaCreated_eventFilter
  | BlockArena_ArenaCreated_eventFilter[];

export type BlockArena_ArenaCreated_eventFilters = 
    BlockArena_ArenaCreated_eventFilter
  | BlockArena_ArenaCreated_eventFilter[]
  | ((_1:BlockArena_ArenaCreated_eventFiltersArgs) => BlockArena_ArenaCreated_eventFiltersDefinition);

export type BlockArena_ArenaFinalized_eventArgs = {
  readonly arenaId: bigint; 
  readonly winnerCount: bigint; 
  readonly bestScore: bigint
};

export type BlockArena_ArenaFinalized_block = Block_t;

export type BlockArena_ArenaFinalized_transaction = Transaction_t;

export type BlockArena_ArenaFinalized_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_ArenaFinalized_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_ArenaFinalized_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_ArenaFinalized_block
};

export type BlockArena_ArenaFinalized_loaderArgs = Internal_genericLoaderArgs<BlockArena_ArenaFinalized_event,loaderContext>;

export type BlockArena_ArenaFinalized_loader<loaderReturn> = Internal_genericLoader<BlockArena_ArenaFinalized_loaderArgs,loaderReturn>;

export type BlockArena_ArenaFinalized_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_ArenaFinalized_event,handlerContext,loaderReturn>;

export type BlockArena_ArenaFinalized_handler<loaderReturn> = Internal_genericHandler<BlockArena_ArenaFinalized_handlerArgs<loaderReturn>>;

export type BlockArena_ArenaFinalized_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_ArenaFinalized_event,contractRegistrations>>;

export type BlockArena_ArenaFinalized_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint> };

export type BlockArena_ArenaFinalized_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_ArenaFinalized_eventFiltersDefinition = 
    BlockArena_ArenaFinalized_eventFilter
  | BlockArena_ArenaFinalized_eventFilter[];

export type BlockArena_ArenaFinalized_eventFilters = 
    BlockArena_ArenaFinalized_eventFilter
  | BlockArena_ArenaFinalized_eventFilter[]
  | ((_1:BlockArena_ArenaFinalized_eventFiltersArgs) => BlockArena_ArenaFinalized_eventFiltersDefinition);

export type BlockArena_ArenaReset_eventArgs = { readonly arenaId: bigint; readonly newEpoch: bigint };

export type BlockArena_ArenaReset_block = Block_t;

export type BlockArena_ArenaReset_transaction = Transaction_t;

export type BlockArena_ArenaReset_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_ArenaReset_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_ArenaReset_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_ArenaReset_block
};

export type BlockArena_ArenaReset_loaderArgs = Internal_genericLoaderArgs<BlockArena_ArenaReset_event,loaderContext>;

export type BlockArena_ArenaReset_loader<loaderReturn> = Internal_genericLoader<BlockArena_ArenaReset_loaderArgs,loaderReturn>;

export type BlockArena_ArenaReset_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_ArenaReset_event,handlerContext,loaderReturn>;

export type BlockArena_ArenaReset_handler<loaderReturn> = Internal_genericHandler<BlockArena_ArenaReset_handlerArgs<loaderReturn>>;

export type BlockArena_ArenaReset_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_ArenaReset_event,contractRegistrations>>;

export type BlockArena_ArenaReset_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint> };

export type BlockArena_ArenaReset_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_ArenaReset_eventFiltersDefinition = 
    BlockArena_ArenaReset_eventFilter
  | BlockArena_ArenaReset_eventFilter[];

export type BlockArena_ArenaReset_eventFilters = 
    BlockArena_ArenaReset_eventFilter
  | BlockArena_ArenaReset_eventFilter[]
  | ((_1:BlockArena_ArenaReset_eventFiltersArgs) => BlockArena_ArenaReset_eventFiltersDefinition);

export type BlockArena_PlayerJoined_eventArgs = {
  readonly arenaId: bigint; 
  readonly player: Address_t; 
  readonly ref: Address_t
};

export type BlockArena_PlayerJoined_block = Block_t;

export type BlockArena_PlayerJoined_transaction = Transaction_t;

export type BlockArena_PlayerJoined_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_PlayerJoined_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_PlayerJoined_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_PlayerJoined_block
};

export type BlockArena_PlayerJoined_loaderArgs = Internal_genericLoaderArgs<BlockArena_PlayerJoined_event,loaderContext>;

export type BlockArena_PlayerJoined_loader<loaderReturn> = Internal_genericLoader<BlockArena_PlayerJoined_loaderArgs,loaderReturn>;

export type BlockArena_PlayerJoined_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_PlayerJoined_event,handlerContext,loaderReturn>;

export type BlockArena_PlayerJoined_handler<loaderReturn> = Internal_genericHandler<BlockArena_PlayerJoined_handlerArgs<loaderReturn>>;

export type BlockArena_PlayerJoined_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_PlayerJoined_event,contractRegistrations>>;

export type BlockArena_PlayerJoined_eventFilter = {
  readonly arenaId?: SingleOrMultiple_t<bigint>; 
  readonly player?: SingleOrMultiple_t<Address_t>; 
  readonly ref?: SingleOrMultiple_t<Address_t>
};

export type BlockArena_PlayerJoined_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_PlayerJoined_eventFiltersDefinition = 
    BlockArena_PlayerJoined_eventFilter
  | BlockArena_PlayerJoined_eventFilter[];

export type BlockArena_PlayerJoined_eventFilters = 
    BlockArena_PlayerJoined_eventFilter
  | BlockArena_PlayerJoined_eventFilter[]
  | ((_1:BlockArena_PlayerJoined_eventFiltersArgs) => BlockArena_PlayerJoined_eventFiltersDefinition);

export type BlockArena_PredictionCommitted_eventArgs = { readonly arenaId: bigint; readonly player: Address_t };

export type BlockArena_PredictionCommitted_block = Block_t;

export type BlockArena_PredictionCommitted_transaction = Transaction_t;

export type BlockArena_PredictionCommitted_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_PredictionCommitted_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_PredictionCommitted_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_PredictionCommitted_block
};

export type BlockArena_PredictionCommitted_loaderArgs = Internal_genericLoaderArgs<BlockArena_PredictionCommitted_event,loaderContext>;

export type BlockArena_PredictionCommitted_loader<loaderReturn> = Internal_genericLoader<BlockArena_PredictionCommitted_loaderArgs,loaderReturn>;

export type BlockArena_PredictionCommitted_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_PredictionCommitted_event,handlerContext,loaderReturn>;

export type BlockArena_PredictionCommitted_handler<loaderReturn> = Internal_genericHandler<BlockArena_PredictionCommitted_handlerArgs<loaderReturn>>;

export type BlockArena_PredictionCommitted_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_PredictionCommitted_event,contractRegistrations>>;

export type BlockArena_PredictionCommitted_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint>; readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_PredictionCommitted_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_PredictionCommitted_eventFiltersDefinition = 
    BlockArena_PredictionCommitted_eventFilter
  | BlockArena_PredictionCommitted_eventFilter[];

export type BlockArena_PredictionCommitted_eventFilters = 
    BlockArena_PredictionCommitted_eventFilter
  | BlockArena_PredictionCommitted_eventFilter[]
  | ((_1:BlockArena_PredictionCommitted_eventFiltersArgs) => BlockArena_PredictionCommitted_eventFiltersDefinition);

export type BlockArena_PredictionRevealed_eventArgs = { readonly arenaId: bigint; readonly player: Address_t };

export type BlockArena_PredictionRevealed_block = Block_t;

export type BlockArena_PredictionRevealed_transaction = Transaction_t;

export type BlockArena_PredictionRevealed_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_PredictionRevealed_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_PredictionRevealed_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_PredictionRevealed_block
};

export type BlockArena_PredictionRevealed_loaderArgs = Internal_genericLoaderArgs<BlockArena_PredictionRevealed_event,loaderContext>;

export type BlockArena_PredictionRevealed_loader<loaderReturn> = Internal_genericLoader<BlockArena_PredictionRevealed_loaderArgs,loaderReturn>;

export type BlockArena_PredictionRevealed_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_PredictionRevealed_event,handlerContext,loaderReturn>;

export type BlockArena_PredictionRevealed_handler<loaderReturn> = Internal_genericHandler<BlockArena_PredictionRevealed_handlerArgs<loaderReturn>>;

export type BlockArena_PredictionRevealed_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_PredictionRevealed_event,contractRegistrations>>;

export type BlockArena_PredictionRevealed_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint>; readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_PredictionRevealed_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_PredictionRevealed_eventFiltersDefinition = 
    BlockArena_PredictionRevealed_eventFilter
  | BlockArena_PredictionRevealed_eventFilter[];

export type BlockArena_PredictionRevealed_eventFilters = 
    BlockArena_PredictionRevealed_eventFilter
  | BlockArena_PredictionRevealed_eventFilter[]
  | ((_1:BlockArena_PredictionRevealed_eventFiltersArgs) => BlockArena_PredictionRevealed_eventFiltersDefinition);

export type BlockArena_PotDistributed_eventArgs = {
  readonly arenaId: bigint; 
  readonly winner: Address_t; 
  readonly amount: bigint
};

export type BlockArena_PotDistributed_block = Block_t;

export type BlockArena_PotDistributed_transaction = Transaction_t;

export type BlockArena_PotDistributed_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_PotDistributed_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_PotDistributed_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_PotDistributed_block
};

export type BlockArena_PotDistributed_loaderArgs = Internal_genericLoaderArgs<BlockArena_PotDistributed_event,loaderContext>;

export type BlockArena_PotDistributed_loader<loaderReturn> = Internal_genericLoader<BlockArena_PotDistributed_loaderArgs,loaderReturn>;

export type BlockArena_PotDistributed_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_PotDistributed_event,handlerContext,loaderReturn>;

export type BlockArena_PotDistributed_handler<loaderReturn> = Internal_genericHandler<BlockArena_PotDistributed_handlerArgs<loaderReturn>>;

export type BlockArena_PotDistributed_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_PotDistributed_event,contractRegistrations>>;

export type BlockArena_PotDistributed_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint>; readonly winner?: SingleOrMultiple_t<Address_t> };

export type BlockArena_PotDistributed_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_PotDistributed_eventFiltersDefinition = 
    BlockArena_PotDistributed_eventFilter
  | BlockArena_PotDistributed_eventFilter[];

export type BlockArena_PotDistributed_eventFilters = 
    BlockArena_PotDistributed_eventFilter
  | BlockArena_PotDistributed_eventFilter[]
  | ((_1:BlockArena_PotDistributed_eventFiltersArgs) => BlockArena_PotDistributed_eventFiltersDefinition);

export type BlockArena_ReferralPaid_eventArgs = {
  readonly ref: Address_t; 
  readonly player: Address_t; 
  readonly amount: bigint
};

export type BlockArena_ReferralPaid_block = Block_t;

export type BlockArena_ReferralPaid_transaction = Transaction_t;

export type BlockArena_ReferralPaid_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_ReferralPaid_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_ReferralPaid_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_ReferralPaid_block
};

export type BlockArena_ReferralPaid_loaderArgs = Internal_genericLoaderArgs<BlockArena_ReferralPaid_event,loaderContext>;

export type BlockArena_ReferralPaid_loader<loaderReturn> = Internal_genericLoader<BlockArena_ReferralPaid_loaderArgs,loaderReturn>;

export type BlockArena_ReferralPaid_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_ReferralPaid_event,handlerContext,loaderReturn>;

export type BlockArena_ReferralPaid_handler<loaderReturn> = Internal_genericHandler<BlockArena_ReferralPaid_handlerArgs<loaderReturn>>;

export type BlockArena_ReferralPaid_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_ReferralPaid_event,contractRegistrations>>;

export type BlockArena_ReferralPaid_eventFilter = { readonly ref?: SingleOrMultiple_t<Address_t>; readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_ReferralPaid_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_ReferralPaid_eventFiltersDefinition = 
    BlockArena_ReferralPaid_eventFilter
  | BlockArena_ReferralPaid_eventFilter[];

export type BlockArena_ReferralPaid_eventFilters = 
    BlockArena_ReferralPaid_eventFilter
  | BlockArena_ReferralPaid_eventFilter[]
  | ((_1:BlockArena_ReferralPaid_eventFiltersArgs) => BlockArena_ReferralPaid_eventFiltersDefinition);

export type BlockArena_ReferrerSet_eventArgs = { readonly player: Address_t; readonly ref: Address_t };

export type BlockArena_ReferrerSet_block = Block_t;

export type BlockArena_ReferrerSet_transaction = Transaction_t;

export type BlockArena_ReferrerSet_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_ReferrerSet_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_ReferrerSet_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_ReferrerSet_block
};

export type BlockArena_ReferrerSet_loaderArgs = Internal_genericLoaderArgs<BlockArena_ReferrerSet_event,loaderContext>;

export type BlockArena_ReferrerSet_loader<loaderReturn> = Internal_genericLoader<BlockArena_ReferrerSet_loaderArgs,loaderReturn>;

export type BlockArena_ReferrerSet_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_ReferrerSet_event,handlerContext,loaderReturn>;

export type BlockArena_ReferrerSet_handler<loaderReturn> = Internal_genericHandler<BlockArena_ReferrerSet_handlerArgs<loaderReturn>>;

export type BlockArena_ReferrerSet_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_ReferrerSet_event,contractRegistrations>>;

export type BlockArena_ReferrerSet_eventFilter = { readonly player?: SingleOrMultiple_t<Address_t>; readonly ref?: SingleOrMultiple_t<Address_t> };

export type BlockArena_ReferrerSet_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_ReferrerSet_eventFiltersDefinition = 
    BlockArena_ReferrerSet_eventFilter
  | BlockArena_ReferrerSet_eventFilter[];

export type BlockArena_ReferrerSet_eventFilters = 
    BlockArena_ReferrerSet_eventFilter
  | BlockArena_ReferrerSet_eventFilter[]
  | ((_1:BlockArena_ReferrerSet_eventFiltersArgs) => BlockArena_ReferrerSet_eventFiltersDefinition);

export type BlockArena_GodStreakUpdate_eventArgs = { readonly player: Address_t; readonly streak: bigint };

export type BlockArena_GodStreakUpdate_block = Block_t;

export type BlockArena_GodStreakUpdate_transaction = Transaction_t;

export type BlockArena_GodStreakUpdate_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_GodStreakUpdate_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_GodStreakUpdate_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_GodStreakUpdate_block
};

export type BlockArena_GodStreakUpdate_loaderArgs = Internal_genericLoaderArgs<BlockArena_GodStreakUpdate_event,loaderContext>;

export type BlockArena_GodStreakUpdate_loader<loaderReturn> = Internal_genericLoader<BlockArena_GodStreakUpdate_loaderArgs,loaderReturn>;

export type BlockArena_GodStreakUpdate_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_GodStreakUpdate_event,handlerContext,loaderReturn>;

export type BlockArena_GodStreakUpdate_handler<loaderReturn> = Internal_genericHandler<BlockArena_GodStreakUpdate_handlerArgs<loaderReturn>>;

export type BlockArena_GodStreakUpdate_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_GodStreakUpdate_event,contractRegistrations>>;

export type BlockArena_GodStreakUpdate_eventFilter = { readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_GodStreakUpdate_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_GodStreakUpdate_eventFiltersDefinition = 
    BlockArena_GodStreakUpdate_eventFilter
  | BlockArena_GodStreakUpdate_eventFilter[];

export type BlockArena_GodStreakUpdate_eventFilters = 
    BlockArena_GodStreakUpdate_eventFilter
  | BlockArena_GodStreakUpdate_eventFilter[]
  | ((_1:BlockArena_GodStreakUpdate_eventFiltersArgs) => BlockArena_GodStreakUpdate_eventFiltersDefinition);

export type BlockArena_BotDetected_eventArgs = { readonly player: Address_t; readonly reason: string };

export type BlockArena_BotDetected_block = Block_t;

export type BlockArena_BotDetected_transaction = Transaction_t;

export type BlockArena_BotDetected_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_BotDetected_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_BotDetected_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_BotDetected_block
};

export type BlockArena_BotDetected_loaderArgs = Internal_genericLoaderArgs<BlockArena_BotDetected_event,loaderContext>;

export type BlockArena_BotDetected_loader<loaderReturn> = Internal_genericLoader<BlockArena_BotDetected_loaderArgs,loaderReturn>;

export type BlockArena_BotDetected_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_BotDetected_event,handlerContext,loaderReturn>;

export type BlockArena_BotDetected_handler<loaderReturn> = Internal_genericHandler<BlockArena_BotDetected_handlerArgs<loaderReturn>>;

export type BlockArena_BotDetected_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_BotDetected_event,contractRegistrations>>;

export type BlockArena_BotDetected_eventFilter = {};

export type BlockArena_BotDetected_eventFilters = Internal_noEventFilters;

export type BlockArena_TournamentCreated_eventArgs = {
  readonly tournamentId: bigint; 
  readonly tier: bigint; 
  readonly roundCount: bigint; 
  readonly arenasPerRound: bigint
};

export type BlockArena_TournamentCreated_block = Block_t;

export type BlockArena_TournamentCreated_transaction = Transaction_t;

export type BlockArena_TournamentCreated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_TournamentCreated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_TournamentCreated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_TournamentCreated_block
};

export type BlockArena_TournamentCreated_loaderArgs = Internal_genericLoaderArgs<BlockArena_TournamentCreated_event,loaderContext>;

export type BlockArena_TournamentCreated_loader<loaderReturn> = Internal_genericLoader<BlockArena_TournamentCreated_loaderArgs,loaderReturn>;

export type BlockArena_TournamentCreated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_TournamentCreated_event,handlerContext,loaderReturn>;

export type BlockArena_TournamentCreated_handler<loaderReturn> = Internal_genericHandler<BlockArena_TournamentCreated_handlerArgs<loaderReturn>>;

export type BlockArena_TournamentCreated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_TournamentCreated_event,contractRegistrations>>;

export type BlockArena_TournamentCreated_eventFilter = { readonly tournamentId?: SingleOrMultiple_t<bigint> };

export type BlockArena_TournamentCreated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_TournamentCreated_eventFiltersDefinition = 
    BlockArena_TournamentCreated_eventFilter
  | BlockArena_TournamentCreated_eventFilter[];

export type BlockArena_TournamentCreated_eventFilters = 
    BlockArena_TournamentCreated_eventFilter
  | BlockArena_TournamentCreated_eventFilter[]
  | ((_1:BlockArena_TournamentCreated_eventFiltersArgs) => BlockArena_TournamentCreated_eventFiltersDefinition);

export type BlockArena_TournamentFinalized_eventArgs = { readonly tournamentId: bigint };

export type BlockArena_TournamentFinalized_block = Block_t;

export type BlockArena_TournamentFinalized_transaction = Transaction_t;

export type BlockArena_TournamentFinalized_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_TournamentFinalized_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_TournamentFinalized_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_TournamentFinalized_block
};

export type BlockArena_TournamentFinalized_loaderArgs = Internal_genericLoaderArgs<BlockArena_TournamentFinalized_event,loaderContext>;

export type BlockArena_TournamentFinalized_loader<loaderReturn> = Internal_genericLoader<BlockArena_TournamentFinalized_loaderArgs,loaderReturn>;

export type BlockArena_TournamentFinalized_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_TournamentFinalized_event,handlerContext,loaderReturn>;

export type BlockArena_TournamentFinalized_handler<loaderReturn> = Internal_genericHandler<BlockArena_TournamentFinalized_handlerArgs<loaderReturn>>;

export type BlockArena_TournamentFinalized_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_TournamentFinalized_event,contractRegistrations>>;

export type BlockArena_TournamentFinalized_eventFilter = { readonly tournamentId?: SingleOrMultiple_t<bigint> };

export type BlockArena_TournamentFinalized_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_TournamentFinalized_eventFiltersDefinition = 
    BlockArena_TournamentFinalized_eventFilter
  | BlockArena_TournamentFinalized_eventFilter[];

export type BlockArena_TournamentFinalized_eventFilters = 
    BlockArena_TournamentFinalized_eventFilter
  | BlockArena_TournamentFinalized_eventFilter[]
  | ((_1:BlockArena_TournamentFinalized_eventFiltersArgs) => BlockArena_TournamentFinalized_eventFiltersDefinition);

export type BlockArena_TournamentArenaAdded_eventArgs = {
  readonly tournamentId: bigint; 
  readonly round: bigint; 
  readonly arenaId: bigint
};

export type BlockArena_TournamentArenaAdded_block = Block_t;

export type BlockArena_TournamentArenaAdded_transaction = Transaction_t;

export type BlockArena_TournamentArenaAdded_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_TournamentArenaAdded_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_TournamentArenaAdded_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_TournamentArenaAdded_block
};

export type BlockArena_TournamentArenaAdded_loaderArgs = Internal_genericLoaderArgs<BlockArena_TournamentArenaAdded_event,loaderContext>;

export type BlockArena_TournamentArenaAdded_loader<loaderReturn> = Internal_genericLoader<BlockArena_TournamentArenaAdded_loaderArgs,loaderReturn>;

export type BlockArena_TournamentArenaAdded_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_TournamentArenaAdded_event,handlerContext,loaderReturn>;

export type BlockArena_TournamentArenaAdded_handler<loaderReturn> = Internal_genericHandler<BlockArena_TournamentArenaAdded_handlerArgs<loaderReturn>>;

export type BlockArena_TournamentArenaAdded_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_TournamentArenaAdded_event,contractRegistrations>>;

export type BlockArena_TournamentArenaAdded_eventFilter = { readonly tournamentId?: SingleOrMultiple_t<bigint> };

export type BlockArena_TournamentArenaAdded_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_TournamentArenaAdded_eventFiltersDefinition = 
    BlockArena_TournamentArenaAdded_eventFilter
  | BlockArena_TournamentArenaAdded_eventFilter[];

export type BlockArena_TournamentArenaAdded_eventFilters = 
    BlockArena_TournamentArenaAdded_eventFilter
  | BlockArena_TournamentArenaAdded_eventFilter[]
  | ((_1:BlockArena_TournamentArenaAdded_eventFiltersArgs) => BlockArena_TournamentArenaAdded_eventFiltersDefinition);

export type BlockArena_TournamentPlayerQualified_eventArgs = {
  readonly tournamentId: bigint; 
  readonly round: bigint; 
  readonly player: Address_t
};

export type BlockArena_TournamentPlayerQualified_block = Block_t;

export type BlockArena_TournamentPlayerQualified_transaction = Transaction_t;

export type BlockArena_TournamentPlayerQualified_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_TournamentPlayerQualified_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_TournamentPlayerQualified_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_TournamentPlayerQualified_block
};

export type BlockArena_TournamentPlayerQualified_loaderArgs = Internal_genericLoaderArgs<BlockArena_TournamentPlayerQualified_event,loaderContext>;

export type BlockArena_TournamentPlayerQualified_loader<loaderReturn> = Internal_genericLoader<BlockArena_TournamentPlayerQualified_loaderArgs,loaderReturn>;

export type BlockArena_TournamentPlayerQualified_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_TournamentPlayerQualified_event,handlerContext,loaderReturn>;

export type BlockArena_TournamentPlayerQualified_handler<loaderReturn> = Internal_genericHandler<BlockArena_TournamentPlayerQualified_handlerArgs<loaderReturn>>;

export type BlockArena_TournamentPlayerQualified_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_TournamentPlayerQualified_event,contractRegistrations>>;

export type BlockArena_TournamentPlayerQualified_eventFilter = { readonly tournamentId?: SingleOrMultiple_t<bigint>; readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_TournamentPlayerQualified_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_TournamentPlayerQualified_eventFiltersDefinition = 
    BlockArena_TournamentPlayerQualified_eventFilter
  | BlockArena_TournamentPlayerQualified_eventFilter[];

export type BlockArena_TournamentPlayerQualified_eventFilters = 
    BlockArena_TournamentPlayerQualified_eventFilter
  | BlockArena_TournamentPlayerQualified_eventFilter[]
  | ((_1:BlockArena_TournamentPlayerQualified_eventFiltersArgs) => BlockArena_TournamentPlayerQualified_eventFiltersDefinition);

export type BlockArena_EmergencyWithdraw_eventArgs = {
  readonly arenaId: bigint; 
  readonly player: Address_t; 
  readonly amount: bigint
};

export type BlockArena_EmergencyWithdraw_block = Block_t;

export type BlockArena_EmergencyWithdraw_transaction = Transaction_t;

export type BlockArena_EmergencyWithdraw_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_EmergencyWithdraw_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_EmergencyWithdraw_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_EmergencyWithdraw_block
};

export type BlockArena_EmergencyWithdraw_loaderArgs = Internal_genericLoaderArgs<BlockArena_EmergencyWithdraw_event,loaderContext>;

export type BlockArena_EmergencyWithdraw_loader<loaderReturn> = Internal_genericLoader<BlockArena_EmergencyWithdraw_loaderArgs,loaderReturn>;

export type BlockArena_EmergencyWithdraw_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_EmergencyWithdraw_event,handlerContext,loaderReturn>;

export type BlockArena_EmergencyWithdraw_handler<loaderReturn> = Internal_genericHandler<BlockArena_EmergencyWithdraw_handlerArgs<loaderReturn>>;

export type BlockArena_EmergencyWithdraw_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_EmergencyWithdraw_event,contractRegistrations>>;

export type BlockArena_EmergencyWithdraw_eventFilter = { readonly arenaId?: SingleOrMultiple_t<bigint>; readonly player?: SingleOrMultiple_t<Address_t> };

export type BlockArena_EmergencyWithdraw_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_EmergencyWithdraw_eventFiltersDefinition = 
    BlockArena_EmergencyWithdraw_eventFilter
  | BlockArena_EmergencyWithdraw_eventFilter[];

export type BlockArena_EmergencyWithdraw_eventFilters = 
    BlockArena_EmergencyWithdraw_eventFilter
  | BlockArena_EmergencyWithdraw_eventFilter[]
  | ((_1:BlockArena_EmergencyWithdraw_eventFiltersArgs) => BlockArena_EmergencyWithdraw_eventFiltersDefinition);

export type BlockArena_TreasuryWithdrawn_eventArgs = { readonly to: Address_t; readonly amount: bigint };

export type BlockArena_TreasuryWithdrawn_block = Block_t;

export type BlockArena_TreasuryWithdrawn_transaction = Transaction_t;

export type BlockArena_TreasuryWithdrawn_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_TreasuryWithdrawn_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_TreasuryWithdrawn_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_TreasuryWithdrawn_block
};

export type BlockArena_TreasuryWithdrawn_loaderArgs = Internal_genericLoaderArgs<BlockArena_TreasuryWithdrawn_event,loaderContext>;

export type BlockArena_TreasuryWithdrawn_loader<loaderReturn> = Internal_genericLoader<BlockArena_TreasuryWithdrawn_loaderArgs,loaderReturn>;

export type BlockArena_TreasuryWithdrawn_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_TreasuryWithdrawn_event,handlerContext,loaderReturn>;

export type BlockArena_TreasuryWithdrawn_handler<loaderReturn> = Internal_genericHandler<BlockArena_TreasuryWithdrawn_handlerArgs<loaderReturn>>;

export type BlockArena_TreasuryWithdrawn_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_TreasuryWithdrawn_event,contractRegistrations>>;

export type BlockArena_TreasuryWithdrawn_eventFilter = { readonly to?: SingleOrMultiple_t<Address_t> };

export type BlockArena_TreasuryWithdrawn_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: BlockArena_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type BlockArena_TreasuryWithdrawn_eventFiltersDefinition = 
    BlockArena_TreasuryWithdrawn_eventFilter
  | BlockArena_TreasuryWithdrawn_eventFilter[];

export type BlockArena_TreasuryWithdrawn_eventFilters = 
    BlockArena_TreasuryWithdrawn_eventFilter
  | BlockArena_TreasuryWithdrawn_eventFilter[]
  | ((_1:BlockArena_TreasuryWithdrawn_eventFiltersArgs) => BlockArena_TreasuryWithdrawn_eventFiltersDefinition);

export type BlockArena_Paused_eventArgs = void;

export type BlockArena_Paused_block = Block_t;

export type BlockArena_Paused_transaction = Transaction_t;

export type BlockArena_Paused_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_Paused_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_Paused_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_Paused_block
};

export type BlockArena_Paused_loaderArgs = Internal_genericLoaderArgs<BlockArena_Paused_event,loaderContext>;

export type BlockArena_Paused_loader<loaderReturn> = Internal_genericLoader<BlockArena_Paused_loaderArgs,loaderReturn>;

export type BlockArena_Paused_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_Paused_event,handlerContext,loaderReturn>;

export type BlockArena_Paused_handler<loaderReturn> = Internal_genericHandler<BlockArena_Paused_handlerArgs<loaderReturn>>;

export type BlockArena_Paused_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_Paused_event,contractRegistrations>>;

export type BlockArena_Paused_eventFilter = {};

export type BlockArena_Paused_eventFilters = Internal_noEventFilters;

export type BlockArena_Unpaused_eventArgs = void;

export type BlockArena_Unpaused_block = Block_t;

export type BlockArena_Unpaused_transaction = Transaction_t;

export type BlockArena_Unpaused_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: BlockArena_Unpaused_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: BlockArena_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: BlockArena_Unpaused_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: BlockArena_Unpaused_block
};

export type BlockArena_Unpaused_loaderArgs = Internal_genericLoaderArgs<BlockArena_Unpaused_event,loaderContext>;

export type BlockArena_Unpaused_loader<loaderReturn> = Internal_genericLoader<BlockArena_Unpaused_loaderArgs,loaderReturn>;

export type BlockArena_Unpaused_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<BlockArena_Unpaused_event,handlerContext,loaderReturn>;

export type BlockArena_Unpaused_handler<loaderReturn> = Internal_genericHandler<BlockArena_Unpaused_handlerArgs<loaderReturn>>;

export type BlockArena_Unpaused_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<BlockArena_Unpaused_event,contractRegistrations>>;

export type BlockArena_Unpaused_eventFilter = {};

export type BlockArena_Unpaused_eventFilters = Internal_noEventFilters;

export type chainId = number;

export type chain = 6343;
