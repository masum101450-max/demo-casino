import { Router } from "express";
import { checkSessionLimit, getBalances, grantBonus, startComplianceSession } from "../controllers/complianceController.js";

export const complianceRoutes = Router();

complianceRoutes.post("/session/start", startComplianceSession);
complianceRoutes.post("/session/check", checkSessionLimit);
complianceRoutes.post("/bonus/grant", grantBonus);
complianceRoutes.post("/wallet", getBalances);
