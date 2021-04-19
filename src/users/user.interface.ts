import { ObjectId } from "mongoose";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export default User;
