const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const authRoutes = require("./Routes/auth");
const taskRoutes = require("./Routes/tasks");
const tagRoutes = require("./Routes/tags");

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

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