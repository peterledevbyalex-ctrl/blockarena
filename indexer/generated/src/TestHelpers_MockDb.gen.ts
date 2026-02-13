/* TypeScript file generated from TestHelpers_MockDb.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpers_MockDbJS = require('./TestHelpers_MockDb.res.js');

import type {ArenaEntry_t as Entities_ArenaEntry_t} from '../src/db/Entities.gen';

import type {Arena_t as Entities_Arena_t} from '../src/db/Entities.gen';

import type {DynamicContractRegistry_t as InternalTable_DynamicContractRegistry_t} from 'envio/src/db/InternalTable.gen';

import type {EmergencyEvent_t as Entities_EmergencyEvent_t} from '../src/db/Entities.gen';

import type {Player_t as Entities_Player_t} from '../src/db/Entities.gen';

import type {ProtocolStats_t as Entities_ProtocolStats_t} from '../src/db/Entities.gen';

import type {RawEvents_t as InternalTable_RawEvents_t} from 'envio/src/db/InternalTable.gen';

import type {ReferralPayment_t as Entities_ReferralPayment_t} from '../src/db/Entities.gen';

import type {TournamentArena_t as Entities_TournamentArena_t} from '../src/db/Entities.gen';

import type {TournamentQualification_t as Entities_TournamentQualification_t} from '../src/db/Entities.gen';

import type {Tournament_t as Entities_Tournament_t} from '../src/db/Entities.gen';

import type {TreasuryWithdrawal_t as Entities_TreasuryWithdrawal_t} from '../src/db/Entities.gen';

import type {eventLog as Types_eventLog} from './Types.gen';

import type {rawEventsKey as InMemoryStore_rawEventsKey} from 'envio/src/InMemoryStore.gen';

/** The mockDb type is simply an InMemoryStore internally. __dbInternal__ holds a reference
to an inMemoryStore and all the the accessor methods point to the reference of that inMemory
store */
export abstract class inMemoryStore { protected opaque!: any }; /* simulate opaque types */

export type t = {
  readonly __dbInternal__: inMemoryStore; 
  readonly entities: entities; 
  readonly rawEvents: storeOperations<InMemoryStore_rawEventsKey,InternalTable_RawEvents_t>; 
  readonly dynamicContractRegistry: entityStoreOperations<InternalTable_DynamicContractRegistry_t>; 
  readonly processEvents: (_1:Types_eventLog<unknown>[]) => Promise<t>
};

export type entities = {
  readonly Arena: entityStoreOperations<Entities_Arena_t>; 
  readonly ArenaEntry: entityStoreOperations<Entities_ArenaEntry_t>; 
  readonly EmergencyEvent: entityStoreOperations<Entities_EmergencyEvent_t>; 
  readonly Player: entityStoreOperations<Entities_Player_t>; 
  readonly ProtocolStats: entityStoreOperations<Entities_ProtocolStats_t>; 
  readonly ReferralPayment: entityStoreOperations<Entities_ReferralPayment_t>; 
  readonly Tournament: entityStoreOperations<Entities_Tournament_t>; 
  readonly TournamentArena: entityStoreOperations<Entities_TournamentArena_t>; 
  readonly TournamentQualification: entityStoreOperations<Entities_TournamentQualification_t>; 
  readonly TreasuryWithdrawal: entityStoreOperations<Entities_TreasuryWithdrawal_t>
};

export type entityStoreOperations<entity> = storeOperations<string,entity>;

export type storeOperations<entityKey,entity> = {
  readonly getAll: () => entity[]; 
  readonly get: (_1:entityKey) => (undefined | entity); 
  readonly set: (_1:entity) => t; 
  readonly delete: (_1:entityKey) => t
};

/** The constructor function for a mockDb. Call it and then set up the inital state by calling
any of the set functions it provides access to. A mockDb will be passed into a processEvent 
helper. Note, process event helpers will not mutate the mockDb but return a new mockDb with
new state so you can compare states before and after. */
export const createMockDb: () => t = TestHelpers_MockDbJS.createMockDb as any;
