export class CreationAccCodeAlreadyExists extends Error {
  constructor() {
    super();
    this.message = "Creation request already exists";
    this.name = "CreationAccCodeAlreadyExists";
  }
}
