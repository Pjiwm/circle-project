import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { RoomModel } from "../../schemas/room.model";
const controller: CrudController = new CrudController(RoomModel);

routes.get("", controller.getAll);
routes.get("/:id", controller.getById);
routes.post("/:id", controller.update);

export default routes;