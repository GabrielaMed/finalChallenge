import { Request, Response, Router } from "express";
import userRoutes from "./userRoutes";

const routes = Router();
const prefix = "/api/v1";

routes.get("/", (req: Request, res: Response) =>
  res.json({ message: "Welcome aboard 🚀!" })
);

routes.use(`${prefix}/users`, userRoutes);

export default routes;
