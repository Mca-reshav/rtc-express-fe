import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRoutes } from "./routes/api.route";
import { connectDB } from "./config/db.config";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API is running fine");
});

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});