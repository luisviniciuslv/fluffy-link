export class codesAreNotTheSame extends Error {
  constructor() {
    super();
    this.message = "Codes are not the same";
    this.name = "codesAreNotTheSame";
  }
}
