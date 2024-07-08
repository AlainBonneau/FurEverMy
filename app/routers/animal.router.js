import { Router } from "express";
import animalController from "../controllers/animal.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.middleware.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import { isEmployee } from "../middlewares/login.middleware.js";

export const router = Router();

router.get("/animals", cw(animalController.getAllAnimals));
router.get("/animals/:id", cw(animalController.getById));
router.post("/animals", jwtMiddleware, isEmployee, cw(animalController.insert));
router.patch(
  "/animals/:id",
  jwtMiddleware,
  isEmployee,
  cw(animalController.update)
);
