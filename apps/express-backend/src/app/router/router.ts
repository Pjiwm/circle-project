import * as router from "express";
const routes = router.Router();
import chat from "./chat.router";
routes.use("/chat", chat);

export default routes;