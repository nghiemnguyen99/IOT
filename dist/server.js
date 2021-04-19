import App from "./app";
import PostsController from "./posts/posts.controller";
import "dotenv/config";
import { validateEnv } from "./utils/validateEnv";
validateEnv();
const { PORT } = process.env;
const app = new App([new PostsController()]);
app.listen();
//# sourceMappingURL=server.js.map