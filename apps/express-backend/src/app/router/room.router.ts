import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { RoomModel } from "../../schemas/room.model";
import { ChatController } from "../controllers/chat.controller";
import { RoomController } from "../controllers/room.controller";
const controller: CrudController = new CrudController(RoomModel);
const chatcontroller = new ChatController();
const roomcontroller = new RoomController();
routes.get("", roomcontroller.getAll);
routes.get("/:id", roomcontroller.getById);
routes.put("/:id", roomcontroller.update);
routes.get("/:id/chats", chatcontroller.getChats);

//development
routes.post("", controller.create);

export default routes;