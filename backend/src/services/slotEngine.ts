import { cryptoRandomFloat, cryptoRandomInt } from "../utils/rng.js";

export interface SlotConfig {
  reels: number;
  symbols: string[];
  paylines: number;
  volatility: "low" | "medium" | "high";
  rtp: number; // return-to-player target (0-1)
}

export interface SpinResult {
  reels: string[][];
  winAmount: number;
  payoutRatio: number;
}

const volatilityMultipliers: Record<SlotConfig["volatility"], number> = {
  low: 0.6,
  medium: 1,
  high: 1.5
};

export function spinSlot(config: SlotConfig, betAmount: number): SpinResult {
  if (betAmount <= 0) {
    throw new Error("Bet amount must be positive.");
  }

  const reels: string[][] = [];
  for (let i = 0; i < config.reels; i += 1) {
    const reel: string[] = [];
    for (let j = 0; j < config.paylines; j += 1) {
      reel.push(config.symbols[cryptoRandomInt(config.symbols.length)]);
    }
    reels.push(reel);
  }

  const randomness = cryptoRandomFloat();
  const volatilityFactor = volatilityMultipliers[config.volatility];
  const basePayoutRatio = config.rtp * volatilityFactor;
  const payoutRatio = Math.min(basePayoutRatio * randomness, config.rtp);

  const winAmount = Math.floor(betAmount * payoutRatio);
  return { reels, winAmount, payoutRatio };
}
