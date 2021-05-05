import { Request } from "express";
import UserBase from "model/users/user.entity";
import User from "./user.interface";

interface RequestWithUser extends Request {
  user: UserBase;
}

export default RequestWithUser;
