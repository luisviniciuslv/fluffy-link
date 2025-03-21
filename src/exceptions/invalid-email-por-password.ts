export class InvalidEmailOrPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEmailOrPassword";
  }
}
