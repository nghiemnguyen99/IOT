import * as bodyParser from "body-parser";
import * as express from "express";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";
import * as cookieParser from "cookie-parser";
import * as multer from "multer";
import "reflect-metadata";
class App {
  public app: express.Application;
  public upload: any;
  constructor(controllers: Controller[]) {
    let diskStorage = multer.diskStorage({
      destination: (req, file, callback) => {
        // Định nghĩa nơi file upload sẽ được lưu lại
        callback(null, "public");
      },
      filename: (req, file, callback) => {
        // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
        // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
        // let math = ["image/png", "image/jpeg"];
        // if (math.indexOf(file.mimetype) === -1) {
        //   let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
        //   return callback(errorMess, null);
        // }
        // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
        let filename = `${Date.now()}-trungquandev-${file.originalname}`;
        callback(null, filename);
      },
    });
    this.app = express();
    this.upload = multer({ storage: diskStorage });
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
    this.app.use(this.upload.single("file"));
    this.app.use(express.static("public"));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }
}

export default App;
