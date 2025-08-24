const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "attendance",
  password: "password",
  port: 5432,
});

// Check-in route
app.post("/attendance/checkin", async (req, res) => {
  const { userId } = req.body;
  const result = await pool.query(
    "INSERT INTO logs (user_id, type, timestamp) VALUES ($1, $2, NOW()) RETURNING *",
    [userId, "checkin"]
  );
  res.json(result.rows[0]);
});

app.listen(5000, () => console.log("Backend running on port 5000"));

