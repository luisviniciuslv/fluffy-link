import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authService, userService } from "../../shared/serverInstances";
import createAuthMiddleware from "../middlewares/auth.middleware";

const router = Router();
const authMiddleware = createAuthMiddleware(userService);
const userController = new UserController(userService);

router.post("/redirect", authMiddleware, userController.registerRedirect)
router.get("/redirect", authMiddleware, userController.getRedirects)
// router.delete("/redirect/:id", authMiddleware, userController.deleteRedirect)
export default router;
