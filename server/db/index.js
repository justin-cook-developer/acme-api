const { connection } = require('./db');
const Department = require('./department');
const User = require('./user');

User.belongsTo(Department);
Department.hasMany(User);

module.exports = {
  connection,
  User,
  Department,
};
