import { z } from "zod";
import { applyDemoBet, applyDemoWin, getWallet } from "../services/walletService.js";
import { spinSlot } from "../services/slotEngine.js";

const spinSchema = z.object({
  userId: z.string(),
  betAmount: z.number().positive(),
  config: z.object({
    reels: z.number().int().min(3).max(5),
    symbols: z.array(z.string()).min(3),
    paylines: z.number().int().min(1).max(5),
    volatility: z.enum(["low", "medium", "high"]),
    rtp: z.number().min(0.7).max(0.99)
  })
});

export function getLobby(_req: any, res: any): void {
  res.json({
    games: [
      { id: "demo-slot-1", name: "Neon Spins", rtp: 0.95, volatility: "medium" },
      { id: "demo-slot-2", name: "Solar Riches", rtp: 0.92, volatility: "high" }
    ]
  });
}

export function spin(req: any, res: any): void {
  const payload = spinSchema.parse(req.body);
  applyDemoBet(payload.userId, payload.betAmount);

  const result = spinSlot(payload.config, payload.betAmount);
  if (result.winAmount > 0) {
    applyDemoWin(payload.userId, result.winAmount);
  }

  const wallet = getWallet(payload.userId);
  res.json({ result, wallet });
}
