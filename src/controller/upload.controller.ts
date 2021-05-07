import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
var multer = require("multer");
var upload = multer();
var fs = require("fs");

var type = upload.single("streamfile");

class UploadController implements Controller {
  public path = "/upload";
  public router = express.Router();
public upload
  constructor() {

    this.initializeRoutes();
  }

  private initializeRoutes() {
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
        let filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
    });
    this.upload = multer({ storage: diskStorage });
    this.router.post(`${this.path}/driver`,this.upload.single("file"), this.update);
    this.router.post(`${this.path}/store`,this.upload.single("file"), this.update);
    this.router.post(`${this.path}/user`,this.upload.single("file"), this.update);
    this.router.post(`${this.path}/food`,this.upload.single("file"), this.update);
  }
  private update = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.body);

    response.send("Oke")

  };
}

export default UploadController;
