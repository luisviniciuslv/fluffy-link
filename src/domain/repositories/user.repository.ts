import { ObjectId } from "mongoose";
import { ICreateUserDTO, IUser, Redirect } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.repository.interface";
import UserModel from "./model/user.model";

export default class UserRepository implements IUserRepository {
  public create = async (account: ICreateUserDTO): Promise<IUser> => {
    return new UserModel(account).save();
  };

  findByUsername(username: string): Promise<IUser | null> {
    return UserModel.findOne({ username });
  }

  public findById = async (_id: ObjectId): Promise<IUser | null> => 
    UserModel.findById(_id).exec();

  public findByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email });
  };

  public deleteByEmail = async (email: string): Promise<void> => {
    await UserModel.deleteOne({ email });
  };

  public update = async (id: ObjectId, user: IUser): Promise<IUser | null> =>
    UserModel.findByIdAndUpdate(id, user, { new: true });
}
