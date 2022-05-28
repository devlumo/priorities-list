const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "items",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM items ORDER BY priority ASC",
    function (err, results) {
      res.send(results);
    }
  );
});

app.patch("/update", (req, res) => {
  const { itemDroppedOn, itemDragged } = req.body;
  connection.query(
    `UPDATE items SET priority = ${itemDroppedOn.priority} WHERE id = ${itemDragged.id};UPDATE items SET priority = ${itemDragged.priority} WHERE id = ${itemDroppedOn.id};`,
    function (err, results) {
      res.send(results);
    }
  );
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
