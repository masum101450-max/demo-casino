import { z } from "zod";
import { authenticate, registerUser, verifyEmail } from "../services/authService.js";

const registerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  age: z.number().int().min(18),
  country: z.string().min(2),
  sessionLimitMinutes: z.number().int().min(10).optional()
});

export function register(req: any, res: any): void {
  const payload = registerSchema.parse(req.body);
  const user = registerUser({
    ...payload,
    emailVerified: false,
    selfExcluded: false,
    sessionLimitMinutes: payload.sessionLimitMinutes ?? 60
  });
  res.status(201).json({ user });
}

export function login(req: any, res: any): void {
  const payload = z.object({ email: z.string().email() }).parse(req.body);
  const token = authenticate(payload.email);
  res.json({ token });
}

export function confirmEmail(req: any, res: any): void {
  const payload = z.object({ userId: z.string() }).parse(req.body);
  verifyEmail(payload.userId);
  res.json({ status: "verified" });
}
