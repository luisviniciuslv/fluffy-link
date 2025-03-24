import { NextFunction, Response, Request } from "express";
import AuthService from "../../domain/services/auth.service";
import { IUserLoginDTO } from "../../domain/entities/user.entity";
import { validateUserLoginPayload } from "../../shared/utils/validateUserLoginPayload";

export default class AuthController {
  constructor ( private authService: AuthService) {}
  
  public getLoginToken = async (req: Request, res: Response, next: NextFunction) => {
    const userCredentials: IUserLoginDTO = req.body;

    try {
      validateUserLoginPayload(userCredentials);
      const token = await this.authService.executeLogin(
        userCredentials.email,
        userCredentials.password
      );

      res.status(200).send({ accessToken: token });
    } catch (error) {
      next(error);
    }
  };
}
