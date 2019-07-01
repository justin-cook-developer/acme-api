const Sequelize = require('sequelize');
const { Model, connection } = require('./db');
const Department = require('./department');

class User extends Model {}
User.init(
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
    modelName: 'user',
  }
);

User.findById = function(id) {
  return this.findByPk(id, {
    include: [{ model: Department }],
  });
};

User.makeUser = function({ name, departmentId }) {
  return this.findOrCreate({
    where: { name },
    defaults: departmentId.length ? { departmentId } : {},
  });
};

User.updateUser = function(id, { name, departmentId }) {
  const updateObj = departmentId.length
    ? { name, departmentId }
    : { name, departmentId: null };
  return User.update(updateObj, {
    where: { id },
  });
};

module.exports = User;
