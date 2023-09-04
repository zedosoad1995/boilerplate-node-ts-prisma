import { Router, Request, Response } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";

const api = Router()
  .use("/users", usersRoute)
  .use("/auth", authRoute)
  .use("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json({ healthy: true });
  });

export default Router().use("/api", api);
