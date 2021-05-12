import * as express from "express";
import { getRepository } from "typeorm";
import Controller from "../interfaces/controller.interface";

import FeedBack from "../model/feedback/feedback.entity";
import Cart from "../model/cart/cart.entity";
import Cart_Food from "../model/cart/cart_food.entity";
class CartController implements Controller {
  public path = "/cart";
  public router = express.Router();
  private postRepository = getRepository(Cart);
  private Food_CardRepository = getRepository(Cart_Food);
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createPost);
    this.router.post(`${this.path}/food_card/create`, this.createFood_Card);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/food_card`, this.getfoodcard);
  }

  private createPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: Cart = request.body;
    const newPost = this.postRepository.create(postData);
    await this.postRepository.save(newPost);
    response.send(newPost);
  };
  private createFood_Card = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: Cart_Food = request.body;
    const newPost = this.Food_CardRepository.create(postData);
    await this.Food_CardRepository.save(newPost);
    response.send(newPost);
  };
  private getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.postRepository.find({
      relations: ["cart_food"],
    });
    response.send(posts);
  };
  private getfoodcard = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.Food_CardRepository.find({
      relations: ["cart", "food"],
    });
    response.send(posts);
  };
}

export default CartController;
