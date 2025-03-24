import { ObjectId } from "mongoose";
import { UserNotFoundException } from "../../exceptions/user-not-found";
import generateRandomString from "../../shared/utils/generateRandomString";
import { validateRedirectPayload } from "../../shared/utils/validateRedirectPayload";
import { IUser, Redirect } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.repository.interface";

export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async getUser(id: ObjectId): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();

    return user;
  }

  public async getUserRedirects(id: ObjectId): Promise<Redirect[] | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    console.log(user.redirects)

    return user.redirects;
  }

  public async registerRedirect(id: ObjectId, redirect: Redirect): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    
    validateRedirectPayload(redirect);
    
    if (!redirect.ext) {
      let uniqueExt;
      do {
        uniqueExt = generateRandomString(5);
      } while (user.redirects.some(r => r.ext === uniqueExt));
      redirect.ext = uniqueExt;
    }
    
    redirect._id = new Date().getTime().toString();
    user.redirects.push(redirect);
    await this.userRepository.update(id, user);
  }
}
