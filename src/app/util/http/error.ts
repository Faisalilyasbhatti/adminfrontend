export class HttpError {
  public code: string;
  public message: string;
  public constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
