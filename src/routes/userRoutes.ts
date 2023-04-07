import { Router } from "express";
import UserController from "../controllers/userController";
import authenticate from "../middlewares/auth";

const userRoutes = Router();
const userController = new UserController();

userRoutes
  .route("/")
  .post(userController.create)
  .get(authenticate, userController.listAll);
userRoutes
  .route("/:id")
  .delete(authenticate, userController.delete)
  .get(authenticate, userController.getById)
  .patch(authenticate, userController.update);

export default userRoutes;
