import { Router } from "express";
import UserController from "../controllers/user.controller";
import { userService } from "../../shared/serverInstances";

const router = Router();

const userController = new UserController(userService);
router.get("/:id", userController.getUser);

export default router;
