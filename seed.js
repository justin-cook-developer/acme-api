const { connection, User, Department } = require('./server/db/index');

const makeNameObj = name => ({ name });

const usersData = [
  makeNameObj('jeff'),
  makeNameObj('tom'),
  makeNameObj('jerry'),
];
const departmentsData = [
  makeNameObj('gardening'),
  makeNameObj('electronics'),
  makeNameObj('food'),
];

connection
  .sync({ force: true })
  .then(async () => {
    const userProms = usersData.map(user => User.create(user));
    const departmentProms = departmentsData.map(dep => Department.create(dep));
    const departments = await Promise.all(departmentProms);
    const users = await Promise.all(userProms);
    const UsersWithDeps = users.map((user, i) =>
      user.setDepartment(departments[i])
    );
    await UsersWithDeps;
  })
  .catch(console.error);
