import { ObjectId } from "mongoose";
import { ICreateUserDTO, IUser } from "../entities/user.entity";

export interface IUserRepository {
  create(account: ICreateUserDTO): Promise<IUser>;
  findById(id: ObjectId): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  deleteByEmail(email: string): Promise<void>;
  update(id: ObjectId, user: IUser): Promise<IUser | null>;
}
