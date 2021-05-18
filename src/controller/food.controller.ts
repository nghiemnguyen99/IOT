import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getRepository } from "typeorm";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateStoreDto from "../model/store/store.dto";
import Food from "../model/food/food.entity";
import HttpException from "../exceptions/HttpException";

class FoodController implements Controller {
  public path = "/food";
  public router = express.Router();
  private postRepository = getRepository(Food);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      // validationMiddleware(CreateStoreDto),
      this.createPost
    );
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/gettest`, this.getAllAddresses);
    this.router.get(`${this.path}/getfeedback`, this.getFeedback);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateStoreDto, true),
      this.modifyPost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }
  private getAllAddresses = async (
    request: express.Request,
    response: express.Response
  ) => {
    const addresses = await this.postRepository.find({
      relations: ["storeid"],
    });
    response.send(addresses);
  };
  private getFeedback = async (
    request: express.Request,
    response: express.Response
  ) => {
    const addresses = await this.postRepository.find({
      relations: ["food_feedback"],
    });
    response.send(addresses);
  };
  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log(request.body);
      const postData: Food = request.body;

      const newPost = this.postRepository.create(postData);
      await this.postRepository.save(newPost);
      response.send(newPost);
    } catch (error) {
      next(new HttpException(404, error));
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
    console.log("get by id", request.params.id);
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
    const postData: Food = request.body;
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

export default FoodController;
