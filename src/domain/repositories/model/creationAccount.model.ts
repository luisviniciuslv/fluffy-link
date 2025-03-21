import { model, Schema } from "mongoose";
import { ICreationAccount } from "../../entities/creationAccount.entity";

const filedIsRequires = [true, "Field is required"];

const CreationAccountSchema = new Schema({
  email: { type: String, required: filedIsRequires },
  password: { type: String, required: filedIsRequires },
  code: { type: String, required: filedIsRequires },
  created_at: { type: Date, default: Date.now },
});

const CreationAccountModel = model<ICreationAccount>(
  "CreationAccount",
  CreationAccountSchema
);

export default CreationAccountModel;
