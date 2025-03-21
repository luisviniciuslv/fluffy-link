import { model, Schema } from "mongoose";
import { IUser } from "../../entities/user.entity";

const filedIsRequires = [true, "Field is required"];

const UserAccountSchema = new Schema({
  email: { type: String, required: filedIsRequires },
  password: { type: String, required: filedIsRequires },
  redirects: { type: [], required: false, default: [] },
});

const UserModel = model<IUser>("UserAccount", UserAccountSchema);

export default UserModel;
