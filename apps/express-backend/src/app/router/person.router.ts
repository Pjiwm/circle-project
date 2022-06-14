import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { person } from "../../schemas/person.model";
const controller: CrudController = new CrudController(person);

routes.get("", controller.getAll);
routes.get("/:id", controller.getById);
routes.post("/:id", controller.update);

export default routes;