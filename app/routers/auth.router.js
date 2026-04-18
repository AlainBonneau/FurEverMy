import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.middleware.js";
import authRateLimiter from "../middlewares/authRateLimiter.middleware.js";

export const router = Router();

router.post("/auth/register", authRateLimiter, cw(authController.register));
router.post("/auth/login", authRateLimiter, cw(authController.login));
router.post("/auth/logout", cw(authController.logout));
