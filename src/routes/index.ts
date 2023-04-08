import { Request, Response, Router } from "express";
import userRoutes from "./userRoutes";
import authenticateRoutes from "./authenticateRoutes";
import carRoutes from "./carRoutes";
import reserveRoutes from "./reserveRoutes";

const routes = Router();
const prefix = "/api/v1";

routes.get("/", (req: Request, res: Response) =>
  res.json({ message: "Welcome aboard 🚀!" })
);

routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/authenticate`, authenticateRoutes);
routes.use(`${prefix}/car`, carRoutes);
routes.use(`${prefix}/reserve`, reserveRoutes);

export default routes;
