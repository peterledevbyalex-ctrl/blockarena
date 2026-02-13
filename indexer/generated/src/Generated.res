@val external require: string => unit = "require"

let registerContractHandlers = (
  ~contractName,
  ~handlerPathRelativeToRoot,
  ~handlerPathRelativeToConfig,
) => {
  try {
    require(`../${Path.relativePathToRootFromGenerated}/${handlerPathRelativeToRoot}`)
  } catch {
  | exn =>
    let params = {
      "Contract Name": contractName,
      "Expected Handler Path": handlerPathRelativeToConfig,
      "Code": "EE500",
    }
    let logger = Logging.createChild(~params)

    let errHandler = exn->ErrorHandling.make(~msg="Failed to import handler file", ~logger)
    errHandler->ErrorHandling.log
    errHandler->ErrorHandling.raiseExn
  }
}

let makeGeneratedConfig = () => {
  let chains = [
    {
      let contracts = [
        {
          Config.name: "BlockArena",
          abi: Types.BlockArena.abi,
          addresses: [
            "0xDe32993819Ca96eb08e8bE8b7D5A31585a17D033"->Address.Evm.fromStringOrThrow
,
          ],
          events: [
            (Types.BlockArena.ArenaCreated.register() :> Internal.eventConfig),
            (Types.BlockArena.ArenaFinalized.register() :> Internal.eventConfig),
            (Types.BlockArena.ArenaReset.register() :> Internal.eventConfig),
            (Types.BlockArena.PlayerJoined.register() :> Internal.eventConfig),
            (Types.BlockArena.PredictionCommitted.register() :> Internal.eventConfig),
            (Types.BlockArena.PredictionRevealed.register() :> Internal.eventConfig),
            (Types.BlockArena.PotDistributed.register() :> Internal.eventConfig),
            (Types.BlockArena.ReferralPaid.register() :> Internal.eventConfig),
            (Types.BlockArena.ReferrerSet.register() :> Internal.eventConfig),
            (Types.BlockArena.GodStreakUpdate.register() :> Internal.eventConfig),
            (Types.BlockArena.BotDetected.register() :> Internal.eventConfig),
            (Types.BlockArena.TournamentCreated.register() :> Internal.eventConfig),
            (Types.BlockArena.TournamentFinalized.register() :> Internal.eventConfig),
            (Types.BlockArena.TournamentArenaAdded.register() :> Internal.eventConfig),
            (Types.BlockArena.TournamentPlayerQualified.register() :> Internal.eventConfig),
            (Types.BlockArena.EmergencyWithdraw.register() :> Internal.eventConfig),
            (Types.BlockArena.TreasuryWithdrawn.register() :> Internal.eventConfig),
            (Types.BlockArena.Paused.register() :> Internal.eventConfig),
            (Types.BlockArena.Unpaused.register() :> Internal.eventConfig),
          ],
          startBlock: None,
        },
      ]
      let chain = ChainMap.Chain.makeUnsafe(~chainId=6343)
      {
        Config.maxReorgDepth: 200,
        startBlock: 11250000,
        id: 6343,
        contracts,
        sources: NetworkSources.evm(~chain, ~contracts=[{name: "BlockArena",events: [Types.BlockArena.ArenaCreated.register(), Types.BlockArena.ArenaFinalized.register(), Types.BlockArena.ArenaReset.register(), Types.BlockArena.PlayerJoined.register(), Types.BlockArena.PredictionCommitted.register(), Types.BlockArena.PredictionRevealed.register(), Types.BlockArena.PotDistributed.register(), Types.BlockArena.ReferralPaid.register(), Types.BlockArena.ReferrerSet.register(), Types.BlockArena.GodStreakUpdate.register(), Types.BlockArena.BotDetected.register(), Types.BlockArena.TournamentCreated.register(), Types.BlockArena.TournamentFinalized.register(), Types.BlockArena.TournamentArenaAdded.register(), Types.BlockArena.TournamentPlayerQualified.register(), Types.BlockArena.EmergencyWithdraw.register(), Types.BlockArena.TreasuryWithdrawn.register(), Types.BlockArena.Paused.register(), Types.BlockArena.Unpaused.register()],abi: Types.BlockArena.abi}], ~hyperSync=Some("https://megaeth-testnet2.hypersync.xyz"), ~allEventSignatures=[Types.BlockArena.eventSignatures]->Belt.Array.concatMany, ~shouldUseHypersyncClientDecoder=true, ~rpcs=[], ~lowercaseAddresses=false)
      }
    },
  ]

  Config.make(
    ~shouldRollbackOnReorg=true,
    ~shouldSaveFullHistory=false,
    ~multichain=if (
      Env.Configurable.isUnorderedMultichainMode->Belt.Option.getWithDefault(
        Env.Configurable.unstable__temp_unordered_head_mode->Belt.Option.getWithDefault(
          false,
        ),
      )
    ) {
      Unordered
    } else {
      Ordered
    },
    ~chains,
    ~enableRawEvents=false,
    ~batchSize=?Env.batchSize,
    ~preloadHandlers=false,
    ~lowercaseAddresses=false,
    ~shouldUseHypersyncClientDecoder=true,
  )
}

let configWithoutRegistrations = makeGeneratedConfig()

let registerAllHandlers = () => {
  EventRegister.startRegistration(
    ~ecosystem=configWithoutRegistrations.ecosystem,
    ~multichain=configWithoutRegistrations.multichain,
    ~preloadHandlers=configWithoutRegistrations.preloadHandlers,
  )

  registerContractHandlers(
    ~contractName="BlockArena",
    ~handlerPathRelativeToRoot="src/EventHandlers.ts",
    ~handlerPathRelativeToConfig="src/EventHandlers.ts",
  )

  EventRegister.finishRegistration()
}

let initialSql = Db.makeClient()
let storagePgSchema = Env.Db.publicSchema
let makeStorage = (~sql, ~pgSchema=storagePgSchema, ~isHasuraEnabled=Env.Hasura.enabled) => {
  PgStorage.make(
    ~sql,
    ~pgSchema,
    ~pgHost=Env.Db.host,
    ~pgUser=Env.Db.user,
    ~pgPort=Env.Db.port,
    ~pgDatabase=Env.Db.database,
    ~pgPassword=Env.Db.password,
    ~onInitialize=?{
      if isHasuraEnabled {
        Some(
          () => {
            Hasura.trackDatabase(
              ~endpoint=Env.Hasura.graphqlEndpoint,
              ~auth={
                role: Env.Hasura.role,
                secret: Env.Hasura.secret,
              },
              ~pgSchema=storagePgSchema,
              ~userEntities=Entities.userEntities,
              ~responseLimit=Env.Hasura.responseLimit,
              ~schema=Db.schema,
              ~aggregateEntities=Env.Hasura.aggregateEntities,
            )->Promise.catch(err => {
              Logging.errorWithExn(
                err->Utils.prettifyExn,
                `EE803: Error tracking tables`,
              )->Promise.resolve
            })
          },
        )
      } else {
        None
      }
    },
    ~onNewTables=?{
      if isHasuraEnabled {
        Some(
          (~tableNames) => {
            Hasura.trackTables(
              ~endpoint=Env.Hasura.graphqlEndpoint,
              ~auth={
                role: Env.Hasura.role,
                secret: Env.Hasura.secret,
              },
              ~pgSchema=storagePgSchema,
              ~tableNames,
            )->Promise.catch(err => {
              Logging.errorWithExn(
                err->Utils.prettifyExn,
                `EE804: Error tracking new tables`,
              )->Promise.resolve
            })
          },
        )
      } else {
        None
      }
    },
    ~isHasuraEnabled,
  )
}

let codegenPersistence = Persistence.make(
  ~userEntities=Entities.userEntities,
  ~allEnums=Enums.allEnums,
  ~storage=makeStorage(~sql=initialSql),
  ~sql=initialSql,
)

%%private(let indexer: ref<option<Indexer.t>> = ref(None))
let getIndexer = () => {
  switch indexer.contents {
  | Some(indexer) => indexer
  | None =>
    let i = {
      Indexer.registrations: registerAllHandlers(),
      // Need to recreate initial config one more time,
      // since configWithoutRegistrations called register for event
      // before they were ready
      config: makeGeneratedConfig(),
      persistence: codegenPersistence,
    }
    indexer := Some(i)
    i
  }
}
