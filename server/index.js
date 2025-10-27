import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import pool from "./shared/db.js";

import authRoutes from "./auth/auth.routes.js";
import taskRoutes from "./tasks/tasks.routes.js";
import tagRoutes from "./tags/tags.routes.js";
import categoryRoutes from "./categories/categories.routes.js";
import userRoutes from "./users/user.routes.js";
import dateRoutes from "./date/date.routes.js"
import prioritiesRoutes from "./priorities/priorities.routes.js"

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/dates", dateRoutes);
app.use("/priorities", prioritiesRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.send(`Server is running, its : ${rows[0].now}.`);
  } catch (error) {
    console.error("Error to connect to database: ", error);
    res.status(500).send("Could not connect to the database :(");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
