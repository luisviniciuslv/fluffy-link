import { UserNotFoundException } from "../../exceptions/user-not-found";
import { IUser, Redirect } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.repository.interface";

export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async getUser(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();

    return user;
  }

  public async getUserRedirects(id: string): Promise<Redirect[] | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();

    return user.redirects;
  }

  public async registerRedirect(id: string, redirect: Redirect): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();

    user.redirects.push(redirect);
    await this.userRepository.update(id, user);
  }
}
