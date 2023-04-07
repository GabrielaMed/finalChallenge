import { Router } from "express";
import CarController from "../controllers/carController";
import authenticate from "../middlewares/auth";

const carRoutes = Router();
const carController = new CarController();

carRoutes.route("/").post(authenticate, carController.create);

export default carRoutes;
