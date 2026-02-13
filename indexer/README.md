# BlockArena Indexer (Envio HyperIndex)

Indexes all BlockArena Diamond proxy events on MegaETH testnet.

## Setup

```bash
cd indexer
pnpm install
pnpm codegen
```

## Local Development

Requires Docker (for PostgreSQL + Hasura):

```bash
pnpm dev    # starts docker containers + indexer
```

Then query at: http://localhost:8080/console (Hasura GraphQL)

## Deploy to Envio Hosted Service

```bash
npx envio deploy
```

## MegaETH Support

MegaETH (chain ID 6343) is **not** in Envio's HyperSync network list. The indexer is configured to use **RPC mode** (`rpc_config.url`) which works with any EVM chain. This is slower than HyperSync but fully functional.

To get HyperSync support for MegaETH, contact the Envio team to add chain 6343 to their HyperSync infrastructure.

## Architecture

- **config.yaml** — Network config, contract address, event signatures
- **schema.graphql** — Entity types (Arena, Player, Tournament, etc.)
- **src/EventHandlers.ts** — All event handler logic
- **abis/BlockArena.json** — Merged ABI (events from all facets)

## Indexed Events (19 total)

| Facet | Events |
|-------|--------|
| ArenaFacet | ArenaCreated, ArenaFinalized, ArenaReset, PlayerJoined, PredictionCommitted, PredictionRevealed, PotDistributed, ReferralPaid, GodStreakUpdate, BotDetected, TournamentPlayerQualified |
| FeeFacet | ReferrerSet, TreasuryWithdrawn |
| TournamentFacet | TournamentCreated, TournamentFinalized, TournamentArenaAdded |
| EmergencyFacet | EmergencyWithdraw, Paused, Unpaused |

## Key Entities

- **Arena** — Individual prediction arenas with tier, entry fee, player counts
- **Player** — Aggregated player stats (wins, earnings, streak, referrals)
- **ArenaEntry** — Per-player arena participation tracking
- **Tournament** — Multi-round tournament structure
- **ProtocolStats** — Singleton global metrics
