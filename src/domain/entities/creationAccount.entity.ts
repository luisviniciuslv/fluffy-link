import { Document } from "mongoose";

export interface ICreationDTO {
  email: string;
  password: string;
  code: string;
}

export interface ICreationAccount extends ICreationDTO, Document {
  _id: string;
  created_at: Date;
}
