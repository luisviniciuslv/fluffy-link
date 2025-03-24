import UserRepository from "../domain/repositories/user.repository";
import CreationAccountRepository from "../domain/repositories/creationAccount.repository";
import UserService from "../domain/services/user.service";
import CreationAccountService from "../domain/services/creationAccount.service";
import AuthService from "../domain/services/auth.service";

// repositories
export const userRepository = new UserRepository();
const creationAccountRepository = new CreationAccountRepository();

// services
export const userService = new UserService(userRepository);
export const creationAccountService = new CreationAccountService(
  creationAccountRepository,
  userRepository
);
export const authService = new AuthService(userRepository);