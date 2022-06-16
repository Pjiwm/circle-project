import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { ChatModel } from "../../schemas/chat.model";
const controller: CrudController = new CrudController(ChatModel);

routes.post("", controller.create);

export default routes;
