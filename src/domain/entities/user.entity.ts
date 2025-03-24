export interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface IUser extends ICreateUserDTO {
  _id: string;
  redirects: Redirect[];
}

interface Link {
  to: string;
  percent?: number;
}

export interface Redirect {
  _id: string;
  ext?: string;
  links: Link[];
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}