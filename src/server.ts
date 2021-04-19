import App from "./app";
import PostsController from "./posts/posts.controller";
import AuthenticationController from "./authentication/authentication.controller";
import "dotenv/config";
import { validateEnv } from "./utils/validateEnv";
import "reflect-metadata";
import "es6-shim";
validateEnv();
const { PORT } = process.env;
const app = new App([new PostsController(), new AuthenticationController()]);

app.listen();
