const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.send(`Server is running! it's: ${rows[0].now} from the database.`);
  } catch (error) {
    console.error("Error querying the database ", error);
    res.status(500).send("Could not connect to the database");
  }
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});