import * as express from "express";
import postModel from "./posts.model";
import PostNotFoundException from "../exceptions/PostNotFoundException";
class PostsController {
    constructor() {
        this.path = "/posts";
        this.router = express.Router();
        this.post = postModel;
        this.getAllPosts = (request, response) => {
            this.post.find().then((posts) => {
                response.send(posts);
            });
        };
        this.getPostById = (request, response, next) => {
            const id = request.params.id;
            console.log(id, 11111);
            try {
                this.post.findById(id).then((post) => {
                    if (post) {
                        response.send(post);
                    }
                    else {
                        next(new PostNotFoundException(id));
                    }
                });
            }
            catch (error) {
                next(new PostNotFoundException(id));
            }
        };
        this.modifyPost = (request, response, next) => {
            const id = request.params.id;
            const postData = request.body;
            this.post.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
                if (post) {
                    response.send(post);
                }
                else {
                    next(new PostNotFoundException(id));
                }
            });
        };
        this.deletePost = (request, response, next) => {
            const id = request.params.id;
            this.post.findByIdAndDelete(id).then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                }
                else {
                    next(new PostNotFoundException(id));
                }
            });
        };
        this.createPost = (request, response) => {
            const postData = request.body;
            const createdPost = new this.post(postData);
            createdPost.save().then((savedPost) => {
                response.send(savedPost);
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.patch(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path, this.createPost);
    }
}
export default PostsController;
//# sourceMappingURL=posts.controller.js.map