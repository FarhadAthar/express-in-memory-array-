// This file acts like a model layer. For now, data is stored in memory.
// Restarting the server will reset this array.
let users = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@example.com",
    age: 24,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    age: 29,
  },
];

let nextId = 3;

const findAll = () => users;

const findById = (id) => users.find((user) => user.id === Number(id));

const create = ({ name, email, age }) => {
  const newUser = {
    id: nextId,
    name,
    email,
    age,
  };

  nextId += 1;
  users.push(newUser);

  return newUser;
};

const update = (id, { name, email, age }) => {
  const user = findById(id);

  if (!user) {
    return null;
  }

  user.name = name;
  user.email = email;
  user.age = age;

  return user;
};

const remove = (id) => {
  const user = findById(id);

  if (!user) {
    return null;
  }

  users = users.filter((currentUser) => currentUser.id !== Number(id));

  return user;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
