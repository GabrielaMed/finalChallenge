import { Router } from "express";

import authenticate from "../middlewares/auth";
import ReserveController from "../controllers/reserveController";

const reserveRoutes = Router();
const reserveController = new ReserveController();

reserveRoutes
  .route("/")
  .post(authenticate, reserveController.create)
  .get(authenticate, reserveController.listAll);

export default reserveRoutes;
