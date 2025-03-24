import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authService, userRepository, userService } from "../../shared/serverInstances";

const router = Router()
const authController = new AuthController(authService)

router.post("/", authController.getLoginToken);

export default router