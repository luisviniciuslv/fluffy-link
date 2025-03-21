import { Request, Response, NextFunction } from "express";
import UserService from "../../domain/services/user.service";
import { Redirect } from "../../domain/entities/user.entity";

export default class UserController {
  constructor(private userService: UserService) {}

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await this.userService.getUser(id);
    res.send(user);
  };

  public registerRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const redirect = req.body as Redirect;

    await this.userService.registerRedirect(id, redirect);
  };

  public getRedirects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const redirects = await this.userService.getUserRedirects(id);
    res.send(redirects);
  };
}
