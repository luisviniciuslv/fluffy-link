import { ObjectId } from 'mongoose';
import { UserNotFoundException } from '../../exceptions/user-not-found';
import generateRandomString from '../../shared/utils/generateRandomString';
import { validateRedirectPayload } from '../../shared/utils/validateRedirectPayload';
import { IUser, Redirect } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { RedirectNotFound } from '../../exceptions/redirect-not-found';

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
    console.log(user.redirects);

    return user.redirects;
  }

  public async registerRedirect(
    id: ObjectId,
    redirect: Redirect
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();

    validateRedirectPayload(redirect);

    if (!redirect.ext) {
      let uniqueExt;
      do {
        uniqueExt = generateRandomString(5);
      } while (user.redirects.some((r) => r.ext === uniqueExt));
      redirect.ext = uniqueExt;
    }

    redirect._id = new Date().getTime().toString();
    user.redirects.push(redirect);
    await this.userRepository.update(id, user);
  }

  public async deleteRedirect(id: ObjectId, redirectId: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    if (!user.redirects.some((r) => r._id === redirectId))
      throw new RedirectNotFound('Redirect not found');
    user.redirects = user.redirects.filter((r) => r._id !== redirectId);
    this.userRepository.update(id, user);
  }

  public async getRedirect(username: string, ext: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new UserNotFoundException();
    const redirects = user.redirects.find((r) => r.ext == ext);
    if (!redirects) throw new RedirectNotFound('Redirect not found');
  
    const links = redirects.links;

    if (links.length === 1) {
      return links[0].to;
    }
  
    const totalWeight = links.reduce((sum, link) => sum + (link.percent || 0), 0);
    const randomWeight = Math.random() * totalWeight;
  
    let cumulativeWeight = 0;
    for (const link of links) {
      cumulativeWeight += link.percent || 0;
      if (randomWeight <= cumulativeWeight) {
        return link.to;
      }
    }
 
    return links[0].to; 
  }
}
