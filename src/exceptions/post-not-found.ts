export class PostNotFound extends Error {
  constructor() {
    super();
    this.message = "Post not found";
    this.name = "PostNotFound";
  }
}
