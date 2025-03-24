import { Request, Response, NextFunction } from "express";
import UserService from "../../domain/services/user.service";
import { Redirect } from "../../domain/entities/user.entity";
import { ObjectId } from "mongoose";

export default class UserController {
  constructor(private userService: UserService) {}

  public registerRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId =req.headers['x-user-id'] as unknown as ObjectId;
    const redirect = req.body as Redirect;
    try {
      await this.userService.registerRedirect(userId, redirect);
      res.sendStatus(200);
    }catch (error) {
      next(error);
    }
  };

  public getRedirects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.headers['x-user-id'] as unknown as ObjectId;
      const redirects = await this.userService.getUserRedirects(userId);
      res.send(redirects);
    } catch (error) {
      next(error);
    }
  };
}
