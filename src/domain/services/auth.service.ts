import { InvalidEmailOrPassword } from "../../exceptions/invalid-email-por-password";
import { comparePlainText } from "../../shared/utils/encryptStr";
import { generateJwt } from "../../shared/utils/jwt";
import UserRepository from "../repositories/user.repository";

export default class AuthService {
    constructor (private userRepository: UserRepository) {}
    public async executeLogin(email: string, password: string) {
      const foundUser = await this.userRepository.findByEmail(email);
      if (!foundUser || !foundUser.password)
        throw new InvalidEmailOrPassword('Invalid e-mail or password!');
  
      const isValidPassword = await comparePlainText(
        password,
        foundUser.password
      );
  
      if (!isValidPassword)
        throw new InvalidEmailOrPassword('Invalid e-mail or password!');
  
      return generateJwt(foundUser._id);
    }
}
