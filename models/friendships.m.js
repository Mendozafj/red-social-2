const { v4: uuidv4 } = require('uuid');

let friendshipDB = [
  {
    id: "1",
    user_id_1: "1",
    user_id_2: "2"
  }
]

class FriendshipModel {
  create(friendship) {
    friendship.id = uuidv4();
    friendshipDB.push(friendship);
  }

  show() {
    return friendshipDB;
  }

  showByID(id) {
    return friendshipDB.filter(friendship => friendship.id == id);
  }

  showByUserID(id) {
    return friendshipDB
      .filter(friendship => friendship.user_id_1 == id || friendship.user_id_2 == id)
      .map(friendship => (friendship.user_id_1 == id ? friendship.user_id_2 : friendship.user_id_1));
  }

  delete(id) {
    const index = friendshipDB.findIndex(friendship => friendship.id == id);
    friendshipDB.splice(index, 1);
    return friendshipDB;
  }
}

module.exports = new FriendshipModel();