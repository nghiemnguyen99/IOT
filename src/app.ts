import * as bodyParser from "body-parser";
import * as express from "express";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";
import * as cookieParser from "cookie-parser";
import * as multer from "multer";
import "reflect-metadata";
import authMiddleware from "./middleware/auth.middleware";
class App {
  public app: express.Application;
  public upload: any;
  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", authMiddleware, express.static("public"));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }
}

export default App;
