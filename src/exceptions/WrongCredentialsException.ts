import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor(e) {
    super(404, `Wrong Credentials ${e}`);
  }
}

export default WrongCredentialsException;
