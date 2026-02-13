module ContractType = {
  @genType
  type t = 
    | @as("BlockArena") BlockArena

  let name = "CONTRACT_TYPE"
  let variants = [
    BlockArena,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module EntityType = {
  @genType
  type t = 
    | @as("Arena") Arena
    | @as("ArenaEntry") ArenaEntry
    | @as("EmergencyEvent") EmergencyEvent
    | @as("Player") Player
    | @as("ProtocolStats") ProtocolStats
    | @as("ReferralPayment") ReferralPayment
    | @as("Tournament") Tournament
    | @as("TournamentArena") TournamentArena
    | @as("TournamentQualification") TournamentQualification
    | @as("TreasuryWithdrawal") TreasuryWithdrawal
    | @as("dynamic_contract_registry") DynamicContractRegistry

  let name = "ENTITY_TYPE"
  let variants = [
    Arena,
    ArenaEntry,
    EmergencyEvent,
    Player,
    ProtocolStats,
    ReferralPayment,
    Tournament,
    TournamentArena,
    TournamentQualification,
    TreasuryWithdrawal,
    DynamicContractRegistry,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

let allEnums = ([
  ContractType.config->Internal.fromGenericEnumConfig,
  EntityType.config->Internal.fromGenericEnumConfig,
])
