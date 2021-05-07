import * as express from "express";
import { getRepository } from "typeorm";
import Controller from "../interfaces/controller.interface";

import FeedBack from "../model/feedback/feedback.entity";
import Cart from "../model/cart/cart.entity";

class CartController implements Controller {
    public path = "/cart";
    public router = express.Router();
    private postRepository = getRepository(Cart);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
           `${ this.path}/create`,
            this.createPost
        );
        this.router.get(this.path, this.getAllPosts);

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
    private getAllPosts = async (
        request: express.Request,
        response: express.Response
    ) => {
        const posts = await this.postRepository.find({relations:['DriverID',"CustomerID","StoreID","foods"]});
        response.send(posts);
    };

}

export default CartController;
