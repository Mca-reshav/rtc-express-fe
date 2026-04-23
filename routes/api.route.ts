import express from "express";

export const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
  res.send("API route working");
});