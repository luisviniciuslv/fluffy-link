export class UserNotFoundException extends Error {
  constructor() {
    super();
    this.message = "User not found";
    this.name = "UserNotFoundException";
  }
}
