import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/authRoutes.js";
import { gameRoutes } from "./routes/gameRoutes.js";
import { complianceRoutes } from "./routes/complianceRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", environment: env.nodeEnv });
});

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/compliance", complianceRoutes);
