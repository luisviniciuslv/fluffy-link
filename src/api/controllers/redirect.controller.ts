import { NextFunction, Request, Response } from 'express';
import UserService from '../../domain/services/user.service';

export default class RedirectController {
  constructor(private userService: UserService) {}

  public acessRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const username = req.params.username;
      const ext = req.params.ext;
      const redirect = await this.userService.getRedirect(username, ext);
      res.redirect(redirect);
    } catch (e) {
      next(e);
    }
  };
}
