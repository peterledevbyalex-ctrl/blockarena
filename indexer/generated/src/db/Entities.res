open Table
open Enums.EntityType
type id = string

type internalEntity = Internal.entity
module type Entity = {
  type t
  let index: int
  let name: string
  let schema: S.t<t>
  let rowsSchema: S.t<array<t>>
  let table: Table.table
  let entityHistory: EntityHistory.t<t>
}
external entityModToInternal: module(Entity with type t = 'a) => Internal.entityConfig = "%identity"
external entityModsToInternal: array<module(Entity)> => array<Internal.entityConfig> = "%identity"
external entitiesToInternal: array<'a> => array<Internal.entity> = "%identity"

@get
external getEntityId: internalEntity => string = "id"

// Use InMemoryTable.Entity.getEntityIdUnsafe instead of duplicating the logic
let getEntityIdUnsafe = InMemoryTable.Entity.getEntityIdUnsafe

//shorthand for punning
let isPrimaryKey = true
let isNullable = true
let isArray = true
let isIndex = true

@genType
type whereOperations<'entity, 'fieldType> = {
  eq: 'fieldType => promise<array<'entity>>,
  gt: 'fieldType => promise<array<'entity>>,
  lt: 'fieldType => promise<array<'entity>>
}

module Arena = {
  let name = (Arena :> string)
  let index = 0
  @genType
  type t = {
    bestScore: int,
    createdAt: int,
    endBlock: int,
    entryFee: bigint,
    epoch: int,
    finalizedAt: option<int>,
    id: id,
    isFinalized: bool,
    playerCount: int,
    startBlock: int,
    tier: int,
    totalPot: bigint,
    tournament_id: option<id>,
    winnerCount: int,
  }

  let schema = S.object((s): t => {
    bestScore: s.field("bestScore", S.int),
    createdAt: s.field("createdAt", S.int),
    endBlock: s.field("endBlock", S.int),
    entryFee: s.field("entryFee", BigInt.schema),
    epoch: s.field("epoch", S.int),
    finalizedAt: s.field("finalizedAt", S.null(S.int)),
    id: s.field("id", S.string),
    isFinalized: s.field("isFinalized", S.bool),
    playerCount: s.field("playerCount", S.int),
    startBlock: s.field("startBlock", S.int),
    tier: s.field("tier", S.int),
    totalPot: s.field("totalPot", BigInt.schema),
    tournament_id: s.field("tournament_id", S.null(S.string)),
    winnerCount: s.field("winnerCount", S.int),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "bestScore", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "createdAt", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "endBlock", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "entryFee", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "epoch", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "finalizedAt", 
      Integer,
      ~fieldSchema=S.null(S.int),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isFinalized", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "playerCount", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "startBlock", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "tier", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalPot", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "tournament", 
      Text,
      ~fieldSchema=S.null(S.string),
      
      ~isNullable,
      
      
      ~linkedEntity="Tournament",
      ),
      mkField(
      "winnerCount", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module ArenaEntry = {
  let name = (ArenaEntry :> string)
  let index = 1
  @genType
  type t = {
    arena_id: id,
    committed: bool,
    id: id,
    player_id: id,
    revealed: bool,
    wonAmount: bigint,
  }

  let schema = S.object((s): t => {
    arena_id: s.field("arena_id", S.string),
    committed: s.field("committed", S.bool),
    id: s.field("id", S.string),
    player_id: s.field("player_id", S.string),
    revealed: s.field("revealed", S.bool),
    wonAmount: s.field("wonAmount", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "arena", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Arena",
      ),
      mkField(
      "committed", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "player", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "revealed", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "wonAmount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module EmergencyEvent = {
  let name = (EmergencyEvent :> string)
  let index = 2
  @genType
  type t = {
    amount: option<bigint>,
    arenaId: option<bigint>,
    blockNumber: int,
    eventType: string,
    id: id,
    player_id: option<id>,
    timestamp: int,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", S.null(BigInt.schema)),
    arenaId: s.field("arenaId", S.null(BigInt.schema)),
    blockNumber: s.field("blockNumber", S.int),
    eventType: s.field("eventType", S.string),
    id: s.field("id", S.string),
    player_id: s.field("player_id", S.null(S.string)),
    timestamp: s.field("timestamp", S.int),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "arenaId", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "blockNumber", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "eventType", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "player", 
      Text,
      ~fieldSchema=S.null(S.string),
      
      ~isNullable,
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module Player = {
  let name = (Player :> string)
  let index = 3
  @genType
  type t = {
    godStreak: int,
    id: id,
    isFlagged: bool,
    referralEarnings: bigint,
    referrer_id: option<id>,
    totalArenas: int,
    totalEarnings: bigint,
    totalWins: int,
  }

  let schema = S.object((s): t => {
    godStreak: s.field("godStreak", S.int),
    id: s.field("id", S.string),
    isFlagged: s.field("isFlagged", S.bool),
    referralEarnings: s.field("referralEarnings", BigInt.schema),
    referrer_id: s.field("referrer_id", S.null(S.string)),
    totalArenas: s.field("totalArenas", S.int),
    totalEarnings: s.field("totalEarnings", BigInt.schema),
    totalWins: s.field("totalWins", S.int),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "godStreak", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isFlagged", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "referralEarnings", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "referrer", 
      Text,
      ~fieldSchema=S.null(S.string),
      
      ~isNullable,
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "totalArenas", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalEarnings", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "totalWins", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module ProtocolStats = {
  let name = (ProtocolStats :> string)
  let index = 4
  @genType
  type t = {
    id: id,
    isPaused: bool,
    totalArenas: int,
    totalPlayers: int,
    totalTournaments: int,
    totalVolume: bigint,
  }

  let schema = S.object((s): t => {
    id: s.field("id", S.string),
    isPaused: s.field("isPaused", S.bool),
    totalArenas: s.field("totalArenas", S.int),
    totalPlayers: s.field("totalPlayers", S.int),
    totalTournaments: s.field("totalTournaments", S.int),
    totalVolume: s.field("totalVolume", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isPaused", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "totalArenas", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalPlayers", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalTournaments", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalVolume", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module ReferralPayment = {
  let name = (ReferralPayment :> string)
  let index = 5
  @genType
  type t = {
    amount: bigint,
    blockNumber: int,
    id: id,
    player_id: id,
    referrer_id: id,
    timestamp: int,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    blockNumber: s.field("blockNumber", S.int),
    id: s.field("id", S.string),
    player_id: s.field("player_id", S.string),
    referrer_id: s.field("referrer_id", S.string),
    timestamp: s.field("timestamp", S.int),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "blockNumber", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "player", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "referrer", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module Tournament = {
  let name = (Tournament :> string)
  let index = 6
  @genType
  type t = {
    
    arenasPerRound: int,
    id: id,
    isFinalized: bool,
    
    roundCount: int,
    tier: int,
  }

  let schema = S.object((s): t => {
    
    arenasPerRound: s.field("arenasPerRound", S.int),
    id: s.field("id", S.string),
    isFinalized: s.field("isFinalized", S.bool),
    
    roundCount: s.field("roundCount", S.int),
    tier: s.field("tier", S.int),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "arenasPerRound", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isFinalized", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "roundCount", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "tier", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkDerivedFromField(
      "arenas", 
      ~derivedFromEntity="TournamentArena",
      ~derivedFromField="tournament",
      ),
      mkDerivedFromField(
      "qualifications", 
      ~derivedFromEntity="TournamentQualification",
      ~derivedFromField="tournament",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module TournamentArena = {
  let name = (TournamentArena :> string)
  let index = 7
  @genType
  type t = {
    arena_id: id,
    id: id,
    round: int,
    tournament_id: id,
  }

  let schema = S.object((s): t => {
    arena_id: s.field("arena_id", S.string),
    id: s.field("id", S.string),
    round: s.field("round", S.int),
    tournament_id: s.field("tournament_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("tournament_id") tournament_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "arena", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Arena",
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "round", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "tournament", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Tournament",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module TournamentQualification = {
  let name = (TournamentQualification :> string)
  let index = 8
  @genType
  type t = {
    id: id,
    player_id: id,
    round: int,
    tournament_id: id,
  }

  let schema = S.object((s): t => {
    id: s.field("id", S.string),
    player_id: s.field("player_id", S.string),
    round: s.field("round", S.int),
    tournament_id: s.field("tournament_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("tournament_id") tournament_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "player", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Player",
      ),
      mkField(
      "round", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "tournament", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Tournament",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module TreasuryWithdrawal = {
  let name = (TreasuryWithdrawal :> string)
  let index = 9
  @genType
  type t = {
    amount: bigint,
    blockNumber: int,
    id: id,
    timestamp: int,
    to: string,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    blockNumber: s.field("blockNumber", S.int),
    id: s.field("id", S.string),
    timestamp: s.field("timestamp", S.int),
    to: s.field("to", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "blockNumber", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "to", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

let userEntities = [
  module(Arena),
  module(ArenaEntry),
  module(EmergencyEvent),
  module(Player),
  module(ProtocolStats),
  module(ReferralPayment),
  module(Tournament),
  module(TournamentArena),
  module(TournamentQualification),
  module(TreasuryWithdrawal),
]->entityModsToInternal

let allEntities =
  userEntities->Js.Array2.concat(
    [module(InternalTable.DynamicContractRegistry)]->entityModsToInternal,
  )

let byName =
  allEntities
  ->Js.Array2.map(entityConfig => {
    (entityConfig.name, entityConfig)
  })
  ->Js.Dict.fromArray
