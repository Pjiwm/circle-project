import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { PersonModel } from "../../schemas/person.model";
const controller: CrudController = new CrudController(PersonModel);

routes.get("", controller.getAll);
routes.get("/:id", controller.getById);
routes.put("/:id", controller.update);

//development
routes.post("", controller.create);
export default routes;
