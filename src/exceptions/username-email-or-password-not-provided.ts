export class UsernameOrEmailOrPasswordNotProvided extends Error {
  constructor() {
    super();
    this.message = "Username, email or password not provided";
    this.name = "UsernameOrEmailOrPasswordNotProvided";
  }
}
