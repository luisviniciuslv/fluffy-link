import {
  ICreationAccount,
  ICreationDTO,
} from "../entities/creationAccount.entity";
import ICreationAccountRepository from "../interfaces/creationAccount.repository.interface";
import CreationAccountModel from "./model/creationAccount.model";

export default class CreationAccountRepository
  implements ICreationAccountRepository
{
  public async create(account: ICreationDTO): Promise<ICreationAccount> {
    return new CreationAccountModel(account).save();
  }

  public findByEmail = (email) =>
    CreationAccountModel.findOne({ email }).exec();

  public deleteByEmail = (email) =>
    CreationAccountModel.findOneAndDelete({ email }).exec();
}
