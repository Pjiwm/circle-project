import * as router from "express";
const routes = router.Router();
import chat from "./chat.router";
import person from "./person.router";
import room from "./room.router";
import security from "./security.router";

routes.use("/chats", chat);
routes.use("/rooms", room);
routes.use("/persons", person);
// development key generation
routes.use("/auth", security);
export default routes;