const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// temos que dizer que vamos usar o BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// db Connection
// sequelize retorna uma Promise
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso!");
  })
  .catch((erro) => {
    console.log("Ocorreu um erro ao conectar", erro);
  });

app.listen(PORT, () => {
  console.log(`Express está rodando na porta ${PORT}`);
});
