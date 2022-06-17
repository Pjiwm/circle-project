import * as router from "express";
const routes = router.Router();
import { SecurityController } from "../controllers/security.conrtoller";
const securitycontroller = new SecurityController();

routes.post("/keys", securitycontroller.createKeys);
routes.post("/login", securitycontroller.createKeys);
export default routes;