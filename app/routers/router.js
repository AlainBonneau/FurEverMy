import { Router } from "express";
import { router as animalRouter } from "./animal.router.js";
import { router as userRouter } from "./user.router.js";
import { router as authRouter } from "./auth.router.js";

export const router = Router();

router.use(authRouter);
router.use(animalRouter);
router.use(userRouter);
