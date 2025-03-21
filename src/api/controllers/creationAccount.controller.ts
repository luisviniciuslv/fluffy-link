import { NextFunction, Request, Response } from "express";
import CreationAccountService from "../../domain/services/creationAccount.service";

export default class CreationAccountController {
  constructor(private creationAccountService: CreationAccountService) {}

  public creationAccountCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).send("Email or password or username not provided");

    try {
      await this.creationAccountService.createCreationRequest(email, password);
      res.status(201).send("Creation request created");
    } catch (error) {
      return next(error);
    }
  };

  public verifyAccountCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, code } = req.body;
    if (!email || !code) res.status(400).send("Email or code not provided");

    try {
      const user = await this.creationAccountService.verifyCodeAndCreateUser(
        email,
        code
      );
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };
}
