import { encryptStr } from "../../shared/utils/encryptStr";
import sendEmail from "../../shared/utils/email";

import ICreationAccountRepository from "../interfaces/creationAccount.repository.interface";

import { CreationAccCodeAlreadyExists } from "../../exceptions/creation-acc-code-already-exists";
import { UserAlreadyExistsException } from "../../exceptions/user-already-exists";
import { CreationAccountCodeNotExists } from "../../exceptions/creation-acc-code-not-exists";
import { codesAreNotTheSame } from "../../exceptions/creation-account-code-are-not-the-same";
import { IUserRepository } from "../interfaces/user.repository.interface";

export default class CreationAccountService {
  constructor(
    private creationAccountCodeRepository: ICreationAccountRepository,
    private userRepository: IUserRepository
  ) {}

  public async createCreationRequest(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    const userEmail = await this.userRepository.findByEmail(email);
    if (userEmail)
      throw new UserAlreadyExistsException("User email already exists");

    const usernameExists = await this.userRepository.findByUsername(username);
    if (usernameExists)
      throw new UserAlreadyExistsException("Username already exists");

    password = await encryptStr(password);

    const creationRequest =
      await this.creationAccountCodeRepository.findByEmail(email);

    // se já existir um pedido de criação de conta com o mesmo email e o pedido em até 1 minuto
    if (creationRequest) {
      if (new Date().getTime() - creationRequest?.created_at.getTime() < 120000)
        throw new CreationAccCodeAlreadyExists();
      else await creationRequest.deleteOne();
    }

    const code = this.generateCode();
    await this.creationAccountCodeRepository.create({
      username,
      email,
      password,
      code,
    });

    try {
      await sendEmail(
        email,
        "Código de verificação",
        `Seu código de verificação é: ${code}`
      );
    } catch (e) {
      throw new Error("Error sending email");
    }
  }

  public async verifyCodeAndCreateUser(
    email: string,
    code: string
  ): Promise<void> {
    const creationRequest =
      await this.creationAccountCodeRepository.findByEmail(email);

    if (!creationRequest) throw new CreationAccountCodeNotExists();

    if (creationRequest.code !== code) throw new codesAreNotTheSame();

    await this.creationAccountCodeRepository.deleteByEmail(email);

    const password = creationRequest.password;
    const username = creationRequest.username;
    
    await this.userRepository.create({ username, email, password });
  }

  private generateCode(): string {
    return String(Math.floor(Math.random() * 900000 + 100000));
  }
}
