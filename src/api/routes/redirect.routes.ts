import { Router } from 'express';
import RedirectController from '../controllers/redirect.controller';
import { userService } from '../../shared/serverInstances';

const router = Router();
const redirectController = new RedirectController(userService);

router.get('/:username/:ext', redirectController.acessRedirect);

export default router;
