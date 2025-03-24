export class RedirectPayloadIsNotValid extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RedirectPayloadIsNotValid";
  }
}
