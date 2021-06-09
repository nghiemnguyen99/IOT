import * as express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { getRepository } from "typeorm";
import PostNotFoundException from "../../exceptions/PostNotFoundException";
import Controller from "../../interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import Infor from "./infor.entity";
import RequestWithUser from "../../interfaces/requestWithUser.interface";
class InforController implements Controller {
  public path = "/infor";
  public router = express.Router();
  private postRepository = getRepository(Infor);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createPost);
    this.router.get(this.path, this.getAllPosts);
  }

  private createPost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: Infor = request.body;
    console.log(postData);
    postData.time = new Date().getTime().toString();
    const newPost = this.postRepository.create(postData);
    await this.postRepository.save(newPost);
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

export default InforController;
