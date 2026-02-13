  @genType
module BlockArena = {
  module ArenaCreated = Types.MakeRegister(Types.BlockArena.ArenaCreated)
  module ArenaFinalized = Types.MakeRegister(Types.BlockArena.ArenaFinalized)
  module ArenaReset = Types.MakeRegister(Types.BlockArena.ArenaReset)
  module PlayerJoined = Types.MakeRegister(Types.BlockArena.PlayerJoined)
  module PredictionCommitted = Types.MakeRegister(Types.BlockArena.PredictionCommitted)
  module PredictionRevealed = Types.MakeRegister(Types.BlockArena.PredictionRevealed)
  module PotDistributed = Types.MakeRegister(Types.BlockArena.PotDistributed)
  module ReferralPaid = Types.MakeRegister(Types.BlockArena.ReferralPaid)
  module ReferrerSet = Types.MakeRegister(Types.BlockArena.ReferrerSet)
  module GodStreakUpdate = Types.MakeRegister(Types.BlockArena.GodStreakUpdate)
  module BotDetected = Types.MakeRegister(Types.BlockArena.BotDetected)
  module TournamentCreated = Types.MakeRegister(Types.BlockArena.TournamentCreated)
  module TournamentFinalized = Types.MakeRegister(Types.BlockArena.TournamentFinalized)
  module TournamentArenaAdded = Types.MakeRegister(Types.BlockArena.TournamentArenaAdded)
  module TournamentPlayerQualified = Types.MakeRegister(Types.BlockArena.TournamentPlayerQualified)
  module EmergencyWithdraw = Types.MakeRegister(Types.BlockArena.EmergencyWithdraw)
  module TreasuryWithdrawn = Types.MakeRegister(Types.BlockArena.TreasuryWithdrawn)
  module Paused = Types.MakeRegister(Types.BlockArena.Paused)
  module Unpaused = Types.MakeRegister(Types.BlockArena.Unpaused)
}

@genType /** Register a Block Handler. It'll be called for every block by default. */
let onBlock: (
  Envio.onBlockOptions<Types.chain>,
  Envio.onBlockArgs<Types.handlerContext> => promise<unit>,
) => unit = (
  EventRegister.onBlock: (unknown, Internal.onBlockArgs => promise<unit>) => unit
)->Utils.magic
