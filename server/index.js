const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    msg: "Hello World",
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
