import { Router } from "express";
import CreationAccountController from "../controllers/creationAccount.controller";
import { creationAccountService } from "../../shared/serverInstances";

const router = Router();
const creationAccountController = new CreationAccountController(
  creationAccountService
);

router.post("/", creationAccountController.creationAccountCode);
router.put("/", creationAccountController.verifyAccountCode);

export default router;
