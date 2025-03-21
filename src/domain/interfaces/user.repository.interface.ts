import { ICreateUserDTO, IUser, Redirect } from "../entities/user.entity";

export interface IUserRepository {
  create(account: ICreateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  deleteByEmail(email: string): Promise<void>;
  update(id: string, user: IUser): Promise<IUser | null>;
}
