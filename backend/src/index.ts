import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import { config } from './config';
import { getDb } from './db/database';
import { EventIndexer } from './services/indexer';
import { PriceOracle } from './services/price-oracle';
import { ArenaManager } from './services/arena-manager';
import { setWss, broadcast } from './utils/broadcast';

import arenasRouter from './routes/arenas';
import playersRouter from './routes/players';
import leaderboardRouter from './routes/leaderboard';
import referralsRouter from './routes/referrals';
import tournamentsRouter from './routes/tournaments';

async function main() {
  // Initialize database
  getDb();
  console.log('[DB] Initialized');

  // Express REST API
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
  app.use('/arenas', arenasRouter);
  app.use('/players', playersRouter);
  app.use('/leaderboard', leaderboardRouter);
  app.use('/referrals', referralsRouter);
  app.use('/tournaments', tournamentsRouter);

  // Create HTTP server and attach WebSocket to it (single port for Railway)
  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log(`[API] Listening on http://localhost:${config.port}`);
  });

  // WebSocket server — shares the HTTP server
  const wss = new WebSocketServer({ server });
  setWss(wss);

  wss.on('connection', (ws) => {
    console.log('[WS] Client connected');
    ws.send(JSON.stringify({ type: 'connected', data: { timestamp: Date.now() } }));

    ws.on('close', () => {
      console.log('[WS] Client disconnected');
    });

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        // Handle subscription messages if needed
        if (msg.type === 'subscribe') {
          // Could track subscriptions per client
        }
      } catch {
        // ignore malformed messages
      }
    });
  });

  console.log(`[WS] Attached to HTTP server on port ${config.port}`);

  // Start services
  const indexer = new EventIndexer();
  const priceOracle = new PriceOracle();
  const arenaManager = new ArenaManager(priceOracle);

  await indexer.start();
  priceOracle.start();
  arenaManager.start();

  // Graceful shutdown
  const shutdown = () => {
    console.log('\nShutting down...');
    indexer.stop();
    priceOracle.stop();
    arenaManager.stop();
    wss.close();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
