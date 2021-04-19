import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(404, `Email exits ${email}`);
  }
}

export default UserWithThatEmailAlreadyExistsException;
