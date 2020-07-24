const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite", // nome do banco a ser usado
  storage: "./db/app.db", // local que vai ser salvo
});

module.exports = sequelize;
