import * as bcrypt from "bcrypt";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../model/users/user.dto";
import LogInDto from "./logIn.dto";
import TokenData from "../interfaces/TokenData.interface";
import DataStoredInToken from "../interfaces/DataStoredInToken.interface";
import UserBase from "../model/users/user.entity";
class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private userRepository = getRepository(UserBase);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
  }
  private createToken(user: UserBase): TokenData {
    const expiresIn = Number(process.env.Token_expiresIn);

    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user.id,
      role: user.username,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = request.body;

    if (await this.userRepository.findOne({ username: userData.username })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.username));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      console.log(user);
      await this.userRepository.save(user);
      user.password = undefined;
      const tokenData = this.createToken(user);
      response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      response.send(user);
    }
  };
  private createPost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: CreateUserDto = request.body;
    const newPost = this.userRepository.create(postData);
    await this.userRepository.save(newPost);
    response.send(newPost);
  };

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.userRepository.findOne({
      username: logInData.username,
    });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);

        response.send({ token: tokenData.token });
      } else {
        next(new WrongCredentialsException("Password Wrong"));
      }
    } else {
      next(new WrongCredentialsException("User not exits"));
    }
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthenticationController;
