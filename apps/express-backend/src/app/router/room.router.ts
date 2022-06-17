import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { RoomModel } from "../../schemas/room.model";
import { ChatController } from "../controllers/chat.controller";
const controller: CrudController = new CrudController(RoomModel);
const chatcontroller = new ChatController();
routes.get("", controller.getAll);
routes.get("/:id", controller.getById);
routes.put("/:id", controller.update);
routes.get("/:id/chats", chatcontroller.getChats);

//development
routes.post("", controller.create);

export default routes;