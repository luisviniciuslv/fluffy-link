import { Request, Response, NextFunction } from "express";
import { CreationAccCodeAlreadyExists } from "../../exceptions/creation-acc-code-already-exists";
import { CreationAccountCodeNotExists } from "../../exceptions/creation-acc-code-not-exists";
import { codesAreNotTheSame } from "../../exceptions/creation-account-code-are-not-the-same";
import { UserNotFoundException } from "../../exceptions/user-not-found";
import { InvalidEmailOrPassword } from "../../exceptions/invalid-email-por-password";
import { InvalidPayloadException } from "../../exceptions/invalid-payload-exception";
import { PostNotFound } from "../../exceptions/post-not-found";
import { Unauthorized } from "../../exceptions/unauthorized-exception";
import { UserAlreadyExistsException } from "../../exceptions/user-already-exists";
import { RedirectPayloadIsNotValid } from "../../exceptions/redirect-payload-not-valid";
import { UsernameOrEmailOrPasswordNotProvided } from "../../exceptions/username-email-or-password-not-provided";
import { RedirectNotFound } from "../../exceptions/redirect-not-found";

export interface ErrorResponse {
  message: string;
  status: number;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CreationAccCodeAlreadyExists)
    res.status(409).json({ message: err.message }).send();
  else if (err instanceof CreationAccountCodeNotExists)
    res.status(404).json({ message: err.message }).send();
  else if (err instanceof codesAreNotTheSame)
    res.status(400).json({ message: err.message }).send();
  else if (err instanceof InvalidEmailOrPassword)
    res.status(401).json({ message: err.message }).send();
  else if (err instanceof InvalidPayloadException)
    res.status(400).json({ message: err.message }).send();
  else if (err instanceof PostNotFound)
    res.status(404).json({ message: err.message }).send();
  else if (err instanceof Unauthorized)
    res.status(401).json({ message: err.message }).send();
  else if (err instanceof UserAlreadyExistsException)
    res.status(409).json({ message: err.message }).send();
  else if (err instanceof UserNotFoundException)
    res.status(404).json({ message: err.message }).send();
  else if (err instanceof RedirectPayloadIsNotValid)
    res.status(400).json({ message: err.message }).send
  else if (err instanceof UsernameOrEmailOrPasswordNotProvided)
    res.status(400).json({ message: err.message }).send();
  else if (err instanceof RedirectNotFound)
    res.status(404).json({ message: err.message }).send();
  else{console.log(err); res.status(500).json({ message: "Internal Server Error" }).send();}
};
