import {
  ICreationAccount,
  ICreationDTO,
} from "../entities/creationAccount.entity";

export default interface ICreationAccountRepository {
  create(account: ICreationDTO): Promise<ICreationAccount>;
  findByEmail(email: string): Promise<ICreationAccount | null>;
  deleteByEmail(email: string): Promise<ICreationAccount | null>;
}
