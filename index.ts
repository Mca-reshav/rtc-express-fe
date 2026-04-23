import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes/api.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API is running fine");
});

app.use("/api", apiRoutes);

export default app;