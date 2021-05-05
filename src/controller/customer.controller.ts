import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getRepository } from "typeorm";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateCustomerDto from "../model/customer/customer.dto";
import Customer from "../model/customer/customer.entity";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
class CustomerController implements Controller {
  public path = "/customer";
  public router = express.Router();
  private postRepository = getRepository(Customer);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(CreateCustomerDto),
      this.createPost
    );
    this.router.get(this.path, authMiddleware, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateCustomerDto, true),
      this.modifyPost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    console.log('123')
    const postData: CreateCustomerDto = request.body;
    if (await this.postRepository.findOne({ email: postData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(postData.email));
    } else {
      const newPost = this.postRepository.create(postData);
      await this.postRepository.save(newPost);
      response.send(newPost);
    }
  };

  private getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  };

  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const post = await this.postRepository.findOne(id);
    if (post) {
      response.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const postData: Customer = request.body;
    await this.postRepository.update(id, postData);
    const updatedPost = await this.postRepository.findOne(id);
    if (updatedPost) {
      response.send(updatedPost);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const deleteResponse = await this.postRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new PostNotFoundException(id));
    }
  };
}

export default CustomerController;