import * as router from "express";
const routes = router.Router();
import { SecurityController } from "../controllers/security.controller";
const securitycontroller = new SecurityController();

routes.post("/keys", securitycontroller.createKeys);
routes.post("/login", securitycontroller.login);
routes.post("/login/java", securitycontroller.loginJava);
export default routes;