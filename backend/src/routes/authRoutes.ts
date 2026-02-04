import { Router } from "express";
import { confirmEmail, login, register } from "../controllers/authController.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/verify-email", confirmEmail);
