import * as router from "express";
const routes = router.Router();
import { CrudController } from "../controllers/crud.controller";
import { PersonModel } from "../../schemas/person.model";
import { PersonController } from "../controllers/person.controller";
const personcontroller = new PersonController();
const controller: CrudController = new CrudController(PersonModel);

routes.get("", controller.getAll);
routes.get("/:id", personcontroller.getById);
routes.put("/:id", personcontroller.update);

//development
routes.post("", controller.create);
export default routes;
