import { Router } from "express";
import CarController from "../controllers/carController";
import authenticate from "../middlewares/auth";

const carRoutes = Router();
const carController = new CarController();

carRoutes
  .route("/")
  .post(authenticate, carController.create)
  .get(carController.listAll);

carRoutes
  .route("/:id")
  .delete(authenticate, carController.delete)
  .get(authenticate, carController.getById)
  .patch(authenticate, carController.update);

carRoutes
  .route("/:carId/accessories/:accessoryId")
  .patch(authenticate, carController.updateAccessory)
  .delete(authenticate, carController.deleteAccessoryById);

export default carRoutes;
