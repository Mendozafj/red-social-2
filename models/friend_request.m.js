const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class FriendRequestsModel {
  // Método para crear una nueva solicitud de amistad
  create(friendRequest) {
    return new Promise((resolve, reject) => {
      friendRequest.id = uuidv4(); 
      const query = 'INSERT INTO friend_requests (id, sender_id, receiver_id, status) VALUES (?, ?, ?, ?)';
      const values = [friendRequest.id, friendRequest.sender_id, friendRequest.receiver_id, friendRequest.status];

      pool.query(query, values)
        .then(([result]) => resolve({ id: friendRequest.id, ...friendRequest }))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar todas las solicitudes de amistad
  show() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM friend_requests';

      pool.query(query)
        .then(([rows]) => resolve(rows))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar una solicitud de amistad por su ID
  showByID(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM friend_requests WHERE id = ?';

      pool.query(query, [id])
        .then(([rows]) => resolve(rows[0]))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar solicitudes de amistad por ID de usuario receptor
  showByUserID(receiver_id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM friend_requests WHERE receiver_id = ?';

      pool.query(query, [receiver_id])
        .then(([rows]) => resolve(rows))
        .catch(error => reject(error));
    });
  }

  // Método para editar una solicitud de amistad por su ID
  edit(updatedFriendRequest, id) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE friend_requests SET status = ? WHERE id = ?';
      const values = [updatedFriendRequest.status, id];

      pool.query(query, values)
        .then(([result]) => resolve(result.affectedRows))
        .catch(error => reject(error));
    });
  }

  // Método para eliminar una solicitud de amistad por su ID
  delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM friend_requests WHERE id = ?';

      pool.query(query, [id])
        .then(([result]) => resolve(result.affectedRows))
        .catch(error => reject(error));
    });
  }
}

module.exports = new FriendRequestsModel();