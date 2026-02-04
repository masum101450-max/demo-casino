import { z } from "zod";
import { getUser } from "../services/authService.js";
import { creditBonus, getWallet } from "../services/walletService.js";
import { enforceSelfExclusion, startSession, validateGeoAccess, validateSessionLimit } from "../services/complianceService.js";

const userSchema = z.object({ userId: z.string() });

export function startComplianceSession(req: any, res: any): void {
  const payload = userSchema.parse(req.body);
  const user = getUser(payload.userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  validateGeoAccess(user);
  enforceSelfExclusion(user);
  startSession(user);

  res.json({ status: "ok" });
}

export function checkSessionLimit(req: any, res: any): void {
  const payload = userSchema.parse(req.body);
  const user = getUser(payload.userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  validateSessionLimit(user);
  res.json({ status: "ok" });
}

export function grantBonus(req: any, res: any): void {
  const payload = z.object({ userId: z.string(), amount: z.number().positive() }).parse(req.body);
  const wallet = creditBonus(payload.userId, payload.amount);
  res.json({ wallet });
}

export function getBalances(req: any, res: any): void {
  const payload = userSchema.parse(req.body);
  const wallet = getWallet(payload.userId);
  res.json({ wallet });
}
