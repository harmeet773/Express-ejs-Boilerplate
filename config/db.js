const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testdb", "root", "password123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
