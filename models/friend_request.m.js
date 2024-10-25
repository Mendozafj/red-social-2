const { v4: uuidv4 } = require('uuid');

let friendRequestsDB = [
  {
    id: "1",
    sender_id: "1",
    receiver_id: "3",
    status: "pendiente" // "pendiente", "aceptada", "rechazada
  }
]

class FriendRequestsModel {
  create(friend_request) {
    friend_request.id = uuidv4();
    friendRequestsDB.push(friend_request);
  }

  show() {
    return friendRequestsDB;
  }

  showByID(id) {
    return friendRequestsDB.filter(friend_request => friend_request.id == id);
  }

  showByUserID(receiver_id) {
    return friendRequestsDB.filter(friend_request => friend_request.receiver_id == receiver_id);
  }

  edit(updatedFriendRequest, id) {
    const index = friendRequestsDB.findIndex(friendRequest => friendRequest.id == id);
    return friendRequestsDB[index] = { id, ...updatedFriendRequest };
  }

  delete(id) {
    const index = friendRequestsDB.findIndex(friendRequest => friendRequest.id == id);
    friendRequestsDB.splice(index, 1);
    return friendRequestsDB;
  }
}

module.exports = new FriendRequestsModel();