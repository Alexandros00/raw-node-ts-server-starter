export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super();
    this.message = message;
    this.name = "HttpError";
  }
}
