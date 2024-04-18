import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", userRoutes);
