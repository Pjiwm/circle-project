import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { chat } from "../../schemas/chat.model";
const controller: CrudController = new CrudController(chat);

routes.get("", controller.getAll);
routes.get("/:id", controller.getById);
routes.post("/:id", controller.create);

export default routes;