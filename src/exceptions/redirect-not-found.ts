export class RedirectNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RedirectNotFound";
  }
}
