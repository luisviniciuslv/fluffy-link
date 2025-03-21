export class CreationAccountCodeNotExists extends Error {
  constructor() {
    super();
    this.message = "Creation request not found";
    this.name = "CreationAccountCodeNotExists";
  }
}
