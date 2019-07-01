const Sequelize = require('sequelize');
const { Model, connection } = require('./db');

class Department extends Model {}
Department.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize: connection,
    modelName: 'department',
  }
);

module.exports = Department;
