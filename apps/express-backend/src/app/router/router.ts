import * as router from "express";
const routes = router.Router();
import chat from "./chat.router";

routes.use("/chat", chat);
routes.use("/room", chat);
routes.use("/person", chat);

export default routes;