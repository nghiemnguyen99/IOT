import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import config from "./ormconfig";
import PostController from "./model/posts/posts.controller";
import AuthenticationController from "./authentication/authentication.controller";
import {
  StoreController,
  DriverController,
  CustomerController,
  UploadController,
  FoodController,
} from "./controller/index";

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }
  const app = new App([
    new PostController(),
    new AuthenticationController(),
    new CustomerController(),
    new DriverController(),
    new StoreController(),
    new UploadController(),
    new FoodController(),
  ]);
  app.listen();
})();
