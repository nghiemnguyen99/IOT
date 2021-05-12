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

class StoreController implements Controller {
  public path = "/store";
  public router = express.Router();
  private postRepository = getRepository(Store);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.createPost);
    this.router.get(`${this.path}/gettest`, this.getAllAddresses);
    this.router.get(`${this.path}/feedback`, this.getFeedBack);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/search/:long/:lat`, this.searchStore);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateStoreDto, true),
      this.modifyPost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }
  private getFeedBack = async (
    request: express.Request,
    response: express.Response
  ) => {
    const addresses = await this.postRepository.find({
      relations: ["FeedBack"],
    });
    response.send(addresses);
  };
  private getAllAddresses = async (
    request: express.Request,
    response: express.Response
  ) => {
    const addresses = await this.postRepository.find({
      relations: ["food"],
    });
    response.send(addresses);
  };
  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.log(request.body);
    const postData: Store = request.body;

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
    const posts = await this.postRepository.find({
      order: {
        name: "ASC",
        id: "DESC",
      },
    });

    response.send(posts);
  };
  private searchStore = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.params);
    const posts = await this.postRepository.find();
    let res = [];
    console.log(posts);
    posts.forEach((element) => {
      let a = getDistanceFromLatLonInKm(
        Number(request.params.lat),
        Number(request.params.long),
        Number(element.latitude),
        Number(element.longitude)
      );
      console.log(a);
      if (a < 1) {
        res.push(element);
      }
    });
    response.send(res);
  };
  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const post = await this.postRepository.findOne(id, { relations: ["food"] });
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
    const postData: Store = request.body;
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

export default StoreController;
