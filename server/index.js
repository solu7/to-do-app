require("dotenv").config();
const express = require("express");
const cors = require("cors");

const pool = require("./shared/db");

const authRoutes = require("./auth/auth.routes");
const taskRoutes = require("./tasks/tasks.routes");
const tagRoutes = require("./tags/tags.routes");
const categoryRoutes = require("./categories/categories.routes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);
app.use("/categories", categoryRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.send(`El servidor esta corriendo, son las : ${rows[0].now}.`);
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    res.status(500).send("No se pudo conectar a la base de datos :(");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
