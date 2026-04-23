import express from "express";
import {
  createSession,
  joinSession,
  getSession,
} from "../controllers/session.controller";

export const sessionRoutes = express.Router();

sessionRoutes.post("/create", createSession);
sessionRoutes.post("/join", joinSession);
sessionRoutes.get("/:id", getSession);