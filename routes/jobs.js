const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/view/:id", (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
  }).then((job) => {
    res.render("view", { job });
  });
});

// Tivemos que ir no app e declar o bodyParser para pegar os dados do "corpo da requisição" e preencher as variaveis do req.body
router.get("/add", (req, res) => {
  res.render("add");
});

// add job via post
router.post("/add", (req, res) => {
  let { title, description, salary, company, email, new_job } = req.body;

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

module.exports = router;
