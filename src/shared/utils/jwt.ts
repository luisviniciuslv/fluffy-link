import SECRET from "../constants/jwt";
import jwt from "jsonwebtoken";

export const generateJwt = (id: string) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "10h" });
};
