import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.middleware.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import { isAdmin, isLoggedIn } from "../middlewares/login.middleware.js";

export const router = Router();

router.get("/users", jwtMiddleware, isAdmin, cw(userController.getAllUsers));
router.get("/user", jwtMiddleware, isLoggedIn, cw(userController.getById));
router.put(
  "/users/patch",
  jwtMiddleware,
  isLoggedIn,
  cw(userController.update)
);
router.post(
  "/user/delete",
  jwtMiddleware,
  isAdmin,
  cw(userController.softDelete)
);
router.post("/user/add", jwtMiddleware, isAdmin, cw(userController.addNewUser));
