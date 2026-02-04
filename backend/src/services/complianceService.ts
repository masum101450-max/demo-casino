import { env } from "../config/env.js";
import { logAuditEvent } from "../utils/auditLogger.js";
import type { UserProfile } from "../types/index.js";

const sessionStarts = new Map<string, Date>();

export function enforceSelfExclusion(user: UserProfile): void {
  if (user.selfExcluded) {
    logAuditEvent({ actorId: user.id, action: "SELF_EXCLUDED_ACCESS_BLOCKED" });
    throw new Error("User is self-excluded.");
  }
}

export function startSession(user: UserProfile): void {
  sessionStarts.set(user.id, new Date());
  logAuditEvent({ actorId: user.id, action: "SESSION_STARTED" });
}

export function validateSessionLimit(user: UserProfile): void {
  const start = sessionStarts.get(user.id);
  if (!start) {
    return;
  }
  const elapsedMinutes = (Date.now() - start.getTime()) / 60000;
  const limit = user.sessionLimitMinutes || env.sessionLimitMinutes;
  if (elapsedMinutes > limit) {
    logAuditEvent({ actorId: user.id, action: "SESSION_LIMIT_REACHED", metadata: { elapsedMinutes } });
    throw new Error("Session limit reached.");
  }
}

export function validateGeoAccess(user: UserProfile): void {
  if (env.blockedCountries.includes(user.country)) {
    throw new Error("Access blocked in this country.");
  }

  if (env.allowedCountries.length > 0 && !env.allowedCountries.includes(user.country)) {
    throw new Error("Access not permitted in this country.");
  }
}
