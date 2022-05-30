const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  port: 3306,
  user: "root",
  password: "root",
  database: "items",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM items", function (err, results) {
    if (err) {
      console.log(err);
    }
    res.send(results[0].data);
  });
});

app.patch("/update", (req, res) => {
  const { jsonItems } = req.body;
  pool.query(
    `UPDATE items SET data = '${jsonItems}' WHERE id = ${1}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
