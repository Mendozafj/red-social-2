var friendsModel = require("../models/friendships.m");

class FriendsController {
  async show() {
    try {
      const friendships = friendsModel.show();
      return friendships;
    } catch (err) {
      throw new Error(`Error al listar las amistades: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const friendship = friendsModel.showByID(id);
      return friendship;
    } catch (err) {
      throw new Error(`Error al buscar amistad: ${err}`);
    }
  }

  async delete(id) {
    try {
      const friendship = friendsModel.showByID(id);
      if (friendship.length === 0) {
        return { error: `No se encontró la amistad con id: ${id}` };
      }

      const result = friendsModel.delete(id);
      return result;
    } catch (err) {
      throw new Error(`Error al eliminar amistad: ${err}`);
    }
  }
}

module.exports = new FriendsController();