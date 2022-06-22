import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { ChatModel } from "../../schemas/chat.model";
import { ChatController } from "../controllers/chat.controller";
const controller: CrudController = new CrudController(ChatModel);
const chatcontroller = new ChatController();

routes.post("/java", controller.create);
routes.post("", chatcontroller.create);

export default routes;
