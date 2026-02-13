
type hyperSyncConfig = {endpointUrl: string}
type hyperFuelConfig = {endpointUrl: string}

@genType.opaque
type rpcConfig = {
  syncConfig: Config.sourceSync,
}

@genType
type syncSource = HyperSync(hyperSyncConfig) | HyperFuel(hyperFuelConfig) | Rpc(rpcConfig)

@genType.opaque
type aliasAbi = Ethers.abi

type eventName = string

type contract = {
  name: string,
  abi: aliasAbi,
  addresses: array<string>,
  events: array<eventName>,
}

type configYaml = {
  syncSource,
  startBlock: int,
  confirmedBlockThreshold: int,
  contracts: dict<contract>,
  lowercaseAddresses: bool,
}

let publicConfig = ChainMap.fromArrayUnsafe([
  {
    let contracts = Js.Dict.fromArray([
      (
        "BlockArena",
        {
          name: "BlockArena",
          abi: Types.BlockArena.abi,
          addresses: [
            "0xDe32993819Ca96eb08e8bE8b7D5A31585a17D033",
          ],
          events: [
            Types.BlockArena.ArenaCreated.name,
            Types.BlockArena.ArenaFinalized.name,
            Types.BlockArena.ArenaReset.name,
            Types.BlockArena.PlayerJoined.name,
            Types.BlockArena.PredictionCommitted.name,
            Types.BlockArena.PredictionRevealed.name,
            Types.BlockArena.PotDistributed.name,
            Types.BlockArena.ReferralPaid.name,
            Types.BlockArena.ReferrerSet.name,
            Types.BlockArena.GodStreakUpdate.name,
            Types.BlockArena.BotDetected.name,
            Types.BlockArena.TournamentCreated.name,
            Types.BlockArena.TournamentFinalized.name,
            Types.BlockArena.TournamentArenaAdded.name,
            Types.BlockArena.TournamentPlayerQualified.name,
            Types.BlockArena.EmergencyWithdraw.name,
            Types.BlockArena.TreasuryWithdrawn.name,
            Types.BlockArena.Paused.name,
            Types.BlockArena.Unpaused.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=6343)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: Rpc({syncConfig: NetworkSources.getSyncConfig({})}),
        startBlock: 0,
        contracts,
        lowercaseAddresses: false
      }
    )
  },
])

@genType
let getGeneratedByChainId: int => configYaml = chainId => {
  let chain = ChainMap.Chain.makeUnsafe(~chainId)
  if !(publicConfig->ChainMap.has(chain)) {
    Js.Exn.raiseError(
      "No chain with id " ++ chain->ChainMap.Chain.toString ++ " found in config.yaml",
    )
  }
  publicConfig->ChainMap.get(chain)
}
