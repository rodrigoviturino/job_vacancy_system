const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");

const Job = require("./models/Job");
const Sequelize = require("sequelize");
const sequelize = require("./db/connection");
const Op = Sequelize.Op;

const PORT = 3000;
/******************************************************************************** */
app.listen(PORT, () => {
  console.log(`Express está rodando na porta ${PORT}`);
});

/****** BODY PARSER ******/
// temos que dizer que vamos usar o BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Bars

// Setamos o path para pegar a raiz do projeto e juntando com o diretorio VIEWS
app.set("views", path.join(__dirname, "views"));
// definindo o template principal da aplicação
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Definindo o motor responsável por renderizar o FRONT
app.set("view engine", "handlebars");

//*** Setando a pasta que vai ser STATIC, para o CSS e JS ser linkados */
app.use(express.static(path.join(__dirname, "public")));

/******************************************************************************** */

// db Connection
// sequelize retorna uma Promise
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso!");
  })
  .catch((erro) => {
    console.log("Ocorreu um erro ao conectar", erro);
  });

/******************************************************************************** */

// Routes
app.get("/", (req, res) => {
  // .job é o NAME do INPUT, então estamos fazendo
  let search = req.query.job;
  // faz o seguinte ao digitar PH, Word, Press, ele já completa a busca
  let query = "%" + search + "%";

  if (!search) {
    Job.findAll()
      .then((jobs) => {
        res.render("index", { jobs });
      })
      .catch((erro) => console.log(erro));
  } else {
    Job.findAll({
      where: {
        title: { [Op.like]: query },
      },
    })
      .then((jobs) => {
        res.render("index", { jobs, search });
      })
      .catch((erro) => console.log(erro));
  }
});

// Jobs Routes
app.use("/jobs", require("./routes/jobs"));

/******************************************************************************** */
