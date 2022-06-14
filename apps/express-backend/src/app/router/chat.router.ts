import * as router from "express";
const routes = router.Router();
import { ChatController } from "../controllers/chat.controller";
const chatController = new ChatController();
routes.get("", chatController.helloWorld);

export default routes;