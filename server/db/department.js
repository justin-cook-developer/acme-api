const Sequelize = require('sequelize');
const { Model, connection } = require('./db');
const User = require('./user')

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

Department.getAll = function() {
  return this.findAll({include: [{model: User}]});
}

Department.findById = function(id) {
  return this.findByPk(id, {
    include: [{ model: User }],
  });
}

Department.makeDepartment = function({ name }) {
  return this.findOrCreate({
    where: { name },
  });
};

Department.updateDepartment = function(id, data) {
  return this.update(data, {
    where: { id },
    returning: true,
  });
};


module.exports = Department;
