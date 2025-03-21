export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IUser extends ICreateUserDTO {
  _id: string;
  redirects: Redirect[];
}

interface Link {
  to: string;
  percent: number;
}

export interface Redirect {
  ext: string;
  links: Link[];
}
