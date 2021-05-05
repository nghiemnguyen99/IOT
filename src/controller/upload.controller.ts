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

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/driver`, type, this.update);
  }
  private update = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.body);
  };
}

export default UploadController;
