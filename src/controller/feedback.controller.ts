import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getRepository } from "typeorm";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateStoreDto from "../model/store/store.dto";
import Store from "../model/store/store.entity";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import { getDistanceFromLatLonInKm } from "../common/functioncommon";
import FeedBack from "../model/feedback/feedback.entity";
import CreateCustomerDto from "../model/customer/customer.dto";
import FeedBackFood from "../model/feedback/feedbackfood.entity";

class FeedBackController implements Controller {
  public path = "/feedback";
  public router = express.Router();
  private postRepository = getRepository(FeedBack);
  private feedbackfood = getRepository(FeedBackFood);
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createPost);
    this.router.post(`${this.path}/create/feedbackfood`, this.createFeedback);
    this.router.get(this.path, this.getAllPosts);
  }

  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: FeedBack = request.body;

    const newPost = this.postRepository.create(postData);
    await this.postRepository.save(newPost);
    response.send(newPost);
  };
  private createFeedback = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: FeedBackFood = request.body;

    const newPost = this.feedbackfood.create(postData);
    await this.feedbackfood.save(newPost);
    response.send(newPost);
  };
  private getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  };
}

export default FeedBackController;
