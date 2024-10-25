const { v4: uuidv4 } = require('uuid');

let usersDB = [
  {
    id: 1,
    username: "fran1",
    password: "1234",
    name: "Francisco",
    email: "francisco@gmail.com"
  },
  {
    id: 2,
    username: "user2",
    password: "1234",
    name: "user 2",
    email: "user2@gmail.com"
  },
  {
    id: 3,
    username: "user3",
    password: "1234",
    name: "user 3",
    email: "user3@gmail.com"
  },
  {
    id: 4,
    username: "user4",
    password: "1234",
    name: "user 3",
    email: "user3@gmail.com"
  }
]

class UsersModel {
  register(user) {
    user.id = uuidv4();
    usersDB.push(user);
  }

  show() {
    return usersDB;
  }

  showByID(id) {
    return usersDB.filter(user => user.id == id);
  }

  showByUsername(username) {
    return usersDB.filter(user => user.username == username);
  }

  showByUsernameExcludingID(username, id) {
    return usersDB.filter(user => user.username == username && user.id != id);
  }

  edit(updatedUser, id) {
    const index = usersDB.findIndex(user => user.id == id);
    return usersDB[index] = { id, ...updatedUser };
  }

  delete(id) {
    const index = usersDB.findIndex(user => user.id == id);
    usersDB.splice(index, 1);
    return usersDB;
  }
}

module.exports = new UsersModel();