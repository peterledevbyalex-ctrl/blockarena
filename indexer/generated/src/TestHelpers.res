/***** TAKE NOTE ******
This is a hack to get genType to work!

In order for genType to produce recursive types, it needs to be at the 
root module of a file. If it's defined in a nested module it does not 
work. So all the MockDb types and internal functions are defined in TestHelpers_MockDb
and only public functions are recreated and exported from this module.

the following module:
```rescript
module MyModule = {
  @genType
  type rec a = {fieldB: b}
  @genType and b = {fieldA: a}
}
```

produces the following in ts:
```ts
// tslint:disable-next-line:interface-over-type-literal
export type MyModule_a = { readonly fieldB: b };

// tslint:disable-next-line:interface-over-type-literal
export type MyModule_b = { readonly fieldA: MyModule_a };
```

fieldB references type b which doesn't exist because it's defined
as MyModule_b
*/

module MockDb = {
  @genType
  let createMockDb = TestHelpers_MockDb.createMockDb
}

@genType
module Addresses = {
  include TestHelpers_MockAddresses
}

module EventFunctions = {
  //Note these are made into a record to make operate in the same way
  //for Res, JS and TS.

  /**
  The arguements that get passed to a "processEvent" helper function
  */
  @genType
  type eventProcessorArgs<'event> = {
    event: 'event,
    mockDb: TestHelpers_MockDb.t,
    @deprecated("Set the chainId for the event instead")
    chainId?: int,
  }

  @genType
  type eventProcessor<'event> = eventProcessorArgs<'event> => promise<TestHelpers_MockDb.t>

  /**
  A function composer to help create individual processEvent functions
  */
  let makeEventProcessor = (~register) => args => {
    let {event, mockDb, ?chainId} =
      args->(Utils.magic: eventProcessorArgs<'event> => eventProcessorArgs<Internal.event>)

    // Have the line here, just in case the function is called with
    // a manually created event. We don't want to break the existing tests here.
    let _ =
      TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    TestHelpers_MockDb.makeProcessEvents(mockDb, ~chainId=?chainId)([event->(Utils.magic: Internal.event => Types.eventLog<unknown>)])
  }

  module MockBlock = {
    @genType
    type t = {
      hash?: string,
      number?: int,
      timestamp?: int,
    }

    let toBlock = (_mock: t) => {
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      number: _mock.number->Belt.Option.getWithDefault(0),
      timestamp: _mock.timestamp->Belt.Option.getWithDefault(0),
    }->(Utils.magic: Types.AggregatedBlock.t => Internal.eventBlock)
  }

  module MockTransaction = {
    @genType
    type t = {
    }

    let toTransaction = (_mock: t) => {
    }->(Utils.magic: Types.AggregatedTransaction.t => Internal.eventTransaction)
  }

  @genType
  type mockEventData = {
    chainId?: int,
    srcAddress?: Address.t,
    logIndex?: int,
    block?: MockBlock.t,
    transaction?: MockTransaction.t,
  }

  /**
  Applies optional paramters with defaults for all common eventLog field
  */
  let makeEventMocker = (
    ~params: Internal.eventParams,
    ~mockEventData: option<mockEventData>,
    ~register: unit => Internal.eventConfig,
  ): Internal.event => {
    let {?block, ?transaction, ?srcAddress, ?chainId, ?logIndex} =
      mockEventData->Belt.Option.getWithDefault({})
    let block = block->Belt.Option.getWithDefault({})->MockBlock.toBlock
    let transaction = transaction->Belt.Option.getWithDefault({})->MockTransaction.toTransaction
    let event: Internal.event = {
      params,
      transaction,
      chainId: switch chainId {
      | Some(chainId) => chainId
      | None =>
        switch Generated.configWithoutRegistrations.defaultChain {
        | Some(chainConfig) => chainConfig.id
        | None =>
          Js.Exn.raiseError(
            "No default chain Id found, please add at least 1 chain to your config.yaml",
          )
        }
      },
      block,
      srcAddress: srcAddress->Belt.Option.getWithDefault(Addresses.defaultAddress),
      logIndex: logIndex->Belt.Option.getWithDefault(0),
    }
    // Since currently it's not possible to figure out the event config from the event
    // we store a reference to the register function by event in a weak map
    let _ = TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    event
  }
}


module BlockArena = {
  module ArenaCreated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.ArenaCreated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.ArenaCreated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("tier")
      tier?: bigint,
      @as("entryFee")
      entryFee?: bigint,
      @as("startBlock")
      startBlock?: bigint,
      @as("endBlock")
      endBlock?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?tier,
        ?entryFee,
        ?startBlock,
        ?endBlock,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       tier: tier->Belt.Option.getWithDefault(0n),
       entryFee: entryFee->Belt.Option.getWithDefault(0n),
       startBlock: startBlock->Belt.Option.getWithDefault(0n),
       endBlock: endBlock->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.ArenaCreated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.ArenaCreated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.ArenaCreated.event)
    }
  }

  module ArenaFinalized = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.ArenaFinalized.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.ArenaFinalized.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("winnerCount")
      winnerCount?: bigint,
      @as("bestScore")
      bestScore?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?winnerCount,
        ?bestScore,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       winnerCount: winnerCount->Belt.Option.getWithDefault(0n),
       bestScore: bestScore->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.ArenaFinalized.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.ArenaFinalized.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.ArenaFinalized.event)
    }
  }

  module ArenaReset = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.ArenaReset.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.ArenaReset.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("newEpoch")
      newEpoch?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?newEpoch,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       newEpoch: newEpoch->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.ArenaReset.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.ArenaReset.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.ArenaReset.event)
    }
  }

  module PlayerJoined = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.PlayerJoined.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.PlayerJoined.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("player")
      player?: Address.t,
      @as("ref")
      ref?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?player,
        ?ref,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ref: ref->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.BlockArena.PlayerJoined.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.PlayerJoined.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.PlayerJoined.event)
    }
  }

  module PredictionCommitted = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.PredictionCommitted.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.PredictionCommitted.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("player")
      player?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?player,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.BlockArena.PredictionCommitted.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.PredictionCommitted.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.PredictionCommitted.event)
    }
  }

  module PredictionRevealed = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.PredictionRevealed.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.PredictionRevealed.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("player")
      player?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?player,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.BlockArena.PredictionRevealed.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.PredictionRevealed.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.PredictionRevealed.event)
    }
  }

  module PotDistributed = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.PotDistributed.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.PotDistributed.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("winner")
      winner?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?winner,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       winner: winner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.PotDistributed.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.PotDistributed.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.PotDistributed.event)
    }
  }

  module ReferralPaid = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.ReferralPaid.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.ReferralPaid.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("ref")
      ref?: Address.t,
      @as("player")
      player?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?ref,
        ?player,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       ref: ref->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.ReferralPaid.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.ReferralPaid.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.ReferralPaid.event)
    }
  }

  module ReferrerSet = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.ReferrerSet.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.ReferrerSet.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("player")
      player?: Address.t,
      @as("ref")
      ref?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?player,
        ?ref,
        ?mockEventData,
      } = args

      let params = 
      {
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       ref: ref->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.BlockArena.ReferrerSet.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.ReferrerSet.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.ReferrerSet.event)
    }
  }

  module GodStreakUpdate = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.GodStreakUpdate.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.GodStreakUpdate.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("player")
      player?: Address.t,
      @as("streak")
      streak?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?player,
        ?streak,
        ?mockEventData,
      } = args

      let params = 
      {
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       streak: streak->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.GodStreakUpdate.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.GodStreakUpdate.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.GodStreakUpdate.event)
    }
  }

  module BotDetected = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.BotDetected.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.BotDetected.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("player")
      player?: Address.t,
      @as("reason")
      reason?: string,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?player,
        ?reason,
        ?mockEventData,
      } = args

      let params = 
      {
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       reason: reason->Belt.Option.getWithDefault("foo"),
      }
->(Utils.magic: Types.BlockArena.BotDetected.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.BotDetected.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.BotDetected.event)
    }
  }

  module TournamentCreated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.TournamentCreated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.TournamentCreated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("tournamentId")
      tournamentId?: bigint,
      @as("tier")
      tier?: bigint,
      @as("roundCount")
      roundCount?: bigint,
      @as("arenasPerRound")
      arenasPerRound?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?tournamentId,
        ?tier,
        ?roundCount,
        ?arenasPerRound,
        ?mockEventData,
      } = args

      let params = 
      {
       tournamentId: tournamentId->Belt.Option.getWithDefault(0n),
       tier: tier->Belt.Option.getWithDefault(0n),
       roundCount: roundCount->Belt.Option.getWithDefault(0n),
       arenasPerRound: arenasPerRound->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.TournamentCreated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.TournamentCreated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.TournamentCreated.event)
    }
  }

  module TournamentFinalized = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.TournamentFinalized.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.TournamentFinalized.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("tournamentId")
      tournamentId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?tournamentId,
        ?mockEventData,
      } = args

      let params = 
      {
       tournamentId: tournamentId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.TournamentFinalized.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.TournamentFinalized.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.TournamentFinalized.event)
    }
  }

  module TournamentArenaAdded = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.TournamentArenaAdded.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.TournamentArenaAdded.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("tournamentId")
      tournamentId?: bigint,
      @as("round")
      round?: bigint,
      @as("arenaId")
      arenaId?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?tournamentId,
        ?round,
        ?arenaId,
        ?mockEventData,
      } = args

      let params = 
      {
       tournamentId: tournamentId->Belt.Option.getWithDefault(0n),
       round: round->Belt.Option.getWithDefault(0n),
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.TournamentArenaAdded.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.TournamentArenaAdded.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.TournamentArenaAdded.event)
    }
  }

  module TournamentPlayerQualified = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.TournamentPlayerQualified.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.TournamentPlayerQualified.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("tournamentId")
      tournamentId?: bigint,
      @as("round")
      round?: bigint,
      @as("player")
      player?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?tournamentId,
        ?round,
        ?player,
        ?mockEventData,
      } = args

      let params = 
      {
       tournamentId: tournamentId->Belt.Option.getWithDefault(0n),
       round: round->Belt.Option.getWithDefault(0n),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.BlockArena.TournamentPlayerQualified.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.TournamentPlayerQualified.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.TournamentPlayerQualified.event)
    }
  }

  module EmergencyWithdraw = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.EmergencyWithdraw.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.EmergencyWithdraw.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("arenaId")
      arenaId?: bigint,
      @as("player")
      player?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?arenaId,
        ?player,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       arenaId: arenaId->Belt.Option.getWithDefault(0n),
       player: player->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.EmergencyWithdraw.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.EmergencyWithdraw.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.EmergencyWithdraw.event)
    }
  }

  module TreasuryWithdrawn = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.TreasuryWithdrawn.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.TreasuryWithdrawn.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.BlockArena.TreasuryWithdrawn.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.TreasuryWithdrawn.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.TreasuryWithdrawn.event)
    }
  }

  module Paused = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.Paused.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.Paused.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?mockEventData,
      } = args

      let params = 
      ()
      ->(Utils.magic: Types.BlockArena.Paused.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.Paused.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.Paused.event)
    }
  }

  module Unpaused = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.BlockArena.Unpaused.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.BlockArena.Unpaused.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?mockEventData,
      } = args

      let params = 
      ()
      ->(Utils.magic: Types.BlockArena.Unpaused.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.BlockArena.Unpaused.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.BlockArena.Unpaused.event)
    }
  }

}

