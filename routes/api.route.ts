import express from "express";
import { sessionRoutes } from "./session.route";

export const apiRoutes = express.Router();

apiRoutes.use('/session', sessionRoutes)
apiRoutes.get("/", (req, res) => {
  res.send("API route working");
});