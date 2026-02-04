import { env } from "../config/env.js";
import type { Wallet } from "../types/index.js";
import { logAuditEvent } from "../utils/auditLogger.js";

const wallets = new Map<string, Wallet>();

export function getWallet(userId: string): Wallet {
  const wallet = wallets.get(userId) ?? {
    userId,
    demoBalance: 1000,
    bonusBalance: 250,
    realBalance: 0
  };
  wallets.set(userId, wallet);
  return wallet;
}

export function applyDemoBet(userId: string, amount: number): Wallet {
  const wallet = getWallet(userId);
  if (amount <= 0) {
    throw new Error("Bet amount must be positive.");
  }

  if (env.realMoneyEnabled) {
    // Licensed real-money wagering would be implemented in a separate module
    // with regulator-approved controls (KYC/AML, payments, reporting).
    throw new Error("Real-money mode is not supported in this build.");
  }

  if (wallet.demoBalance < amount) {
    throw new Error("Insufficient demo balance.");
  }

  wallet.demoBalance -= amount;
  wallets.set(userId, wallet);
  logAuditEvent({ actorId: userId, action: "DEMO_BET_PLACED", metadata: { amount } });
  return wallet;
}

export function applyDemoWin(userId: string, amount: number): Wallet {
  const wallet = getWallet(userId);
  wallet.demoBalance += amount;
  wallets.set(userId, wallet);
  logAuditEvent({ actorId: userId, action: "DEMO_WIN_CREDITED", metadata: { amount } });
  return wallet;
}

export function creditBonus(userId: string, amount: number): Wallet {
  const wallet = getWallet(userId);
  wallet.bonusBalance += amount;
  wallets.set(userId, wallet);
  logAuditEvent({ actorId: userId, action: "BONUS_CREDITED", metadata: { amount } });
  return wallet;
}
