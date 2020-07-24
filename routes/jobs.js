const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Tivemos que ir no app e declar o bodyParser para pegar os dados do "corpo da requisição" e preencher as variaveis do req.body

// add job via post
router.post("/add", (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body;

  // Insert - Método do Sequelize e vai retornar uma Promise
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((erro) => console.log(erro));
});
