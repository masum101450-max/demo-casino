import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  emailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET ?? "dev-verify-secret",
  databaseUrl: process.env.DATABASE_URL ?? "",
  realMoneyEnabled: process.env.REAL_MONEY_ENABLED === "true",
  minAge: Number(process.env.MIN_AGE ?? 18),
  allowedCountries: (process.env.ALLOWED_COUNTRIES ?? "").split(",").filter(Boolean),
  blockedCountries: (process.env.BLOCKED_COUNTRIES ?? "").split(",").filter(Boolean),
  sessionLimitMinutes: Number(process.env.SESSION_LIMIT_MINUTES ?? 60)
};
