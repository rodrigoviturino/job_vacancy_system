const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express está rodando na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
