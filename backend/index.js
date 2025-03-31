const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
 
const app = express();
app.use(express.json());
app.use(cors());
 
// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpassword",
  database: "user_data",
  port: '3308'
});
 
db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});
 
// Save Data API
app.post("/save", (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
 
  const query = "INSERT INTO messages (content) VALUES (?)";
  db.query(query, [content], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Saved Successfully" });
  });
});
 
app.listen(3001, () => console.log("Server running on port 3001"));