import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.middleware.js";

export const router = Router();

router.post("/auth/register", cw(authController.register));
router.post("/auth/login", cw(authController.login));
