import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(404, `Token Missing Exception`);
  }
}

export default AuthenticationTokenMissingException;
