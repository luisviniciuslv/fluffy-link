import { NextFunction, Request, Response } from "express";
import CreationAccountService from "../../domain/services/creationAccount.service";
import { UsernameOrEmailOrPasswordNotProvided } from "../../exceptions/username-email-or-password-not-provided";

export default class CreationAccountController {
  constructor(private creationAccountService: CreationAccountService) {}

  public creationAccountCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password)
        throw new UsernameOrEmailOrPasswordNotProvided();

      await this.creationAccountService.createCreationRequest(username, email, password);
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
