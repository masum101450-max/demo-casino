import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { logAuditEvent } from "../utils/auditLogger.js";
import type { UserProfile } from "../types/index.js";

const users = new Map<string, UserProfile>();

export function registerUser(profile: UserProfile): UserProfile {
  if (profile.age < env.minAge) {
    throw new Error("User does not meet minimum age requirement.");
  }

  if (env.blockedCountries.includes(profile.country)) {
    throw new Error("Country is blocked.");
  }

  if (env.allowedCountries.length > 0 && !env.allowedCountries.includes(profile.country)) {
    throw new Error("Country is not allowed.");
  }

  users.set(profile.id, profile);
  logAuditEvent({ actorId: profile.id, action: "USER_REGISTERED", metadata: { email: profile.email } });
  return profile;
}

export function verifyEmail(userId: string): void {
  const user = users.get(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.emailVerified = true;
  users.set(userId, user);
  logAuditEvent({ actorId: userId, action: "EMAIL_VERIFIED" });
}

export function authenticate(email: string): string {
  const user = Array.from(users.values()).find((entry) => entry.email === email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  logAuditEvent({ actorId: user.id, action: "USER_AUTHENTICATED" });
  return token;
}

export function getUser(userId: string): UserProfile | undefined {
  return users.get(userId);
}
