import { Router } from "express";
import { getLobby, spin } from "../controllers/gameController.js";

export const gameRoutes = Router();

gameRoutes.get("/lobby", getLobby);
gameRoutes.post("/spin", spin);
