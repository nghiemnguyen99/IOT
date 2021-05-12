import * as express from "express";
import Controller from "../interfaces/controller.interface";
import * as multer from "multer";

var diskStoragedriver = multer.diskStorage({
  destination: (req, file, callback) => {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, "public/driver");
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
var diskStoragestore = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/store");
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});
var diskStoragefood = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/food");
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});
var diskStoragecustomer = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/customer");
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});
class UploadController implements Controller {
  public path = "/upload";
  public router = express.Router();
  public upload;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/driver`,
      multer({ storage: diskStoragedriver }).single("file"),
      this.update
    );
    this.router.post(
      `${this.path}/store`,
      multer({ storage: diskStoragestore }).single("file"),
      this.update
    );
    this.router.post(
      `${this.path}/customer`,
      multer({ storage: diskStoragecustomer }).single("file"),
      this.update
    );
    this.router.post(
      `${this.path}/food`,
      multer({ storage: diskStoragefood }).single("file"),
      this.update
    );
  }
  private update = async (
    request: express.Request,
    response: express.Response
  ) => {
    response.send("Oke");
  };
}

export default UploadController;
