const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://:5432/acme-api', {
  logging: false,
});

const Model = Sequelize.Model;

module.exports = { connection, Model };
