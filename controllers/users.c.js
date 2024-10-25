var usersModel = require("../models/users.m");
var postsModel = require("../models/posts.m");
var friendRequestModel = require("../models/friend_request.m");
var friendshipsModel = require("../models/friendships.m");

class UsersController {

  async register(data) {
    const { name, username, password, email } = data;
    if (!name || !username || !password || !email) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const user = usersModel.showByUsername(username);
      if (user.length > 0) {
        return { error: "El nombre de usuario ya está en uso." };
      }

      const newUser = { name, username, password, email };
      usersModel.register(newUser);

      return { success: true };
    } catch (error) {
      return { error: `Error al registrar usuario: ${error.message}` };
    }
  }

  async show() {
    try {
      const users = usersModel.show();
      return users;
    } catch (err) {
      throw new Error(`Error al listar usuarios: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const user = usersModel.showByID(id);
      return user;
    } catch (err) {
      throw new Error(`Error al buscar usuario: ${err}`);
    }
  }

  async showByUsername(username) {
    try {
      const user = usersModel.showByUsername(username);
      return user;
    } catch (err) {
      throw new Error(`Error al buscar usuario: ${err}`);
    }
  }

  async showPosts(id) {
    try {
      const posts = postsModel.showByUserID(id);
      return posts;
    } catch (err) {
      throw new Error(`Error al buscar las publicaciones del usuario: ${err}`);
    }
  }

  async showFriendRequests(id) {
    try {
      const friendRequests = friendRequestModel.showByUserID(id);
      return friendRequests;
    } catch (err) {
      throw new Error(`Error al buscar las publicaciones del usuario: ${err}`);
    }
  }

  async showFriends(id) {
    try {
      const friendsIds = await friendshipsModel.showByUserID(id);

      if (friendsIds.length === 0) {
        return [];
      }

      const friends = await Promise.all(friendsIds.map(friendId => usersModel.showByID(friendId)));

      const flattenedFriends = friends.flat();

      return flattenedFriends;
    } catch (err) {
      throw new Error(`Error al buscar los amigos del usuario: ${err}`);
    }
  }

  async showFeed(id) {
    try {
      const friends = friendshipsModel.showByUserID(id);
      const feed = friends
        .map(friendId => postsModel.getLastPostByUser(friendId))
        .filter(post => post !== null);
      return feed;
    } catch (err) {
      throw new Error(`Error al obtener el feed de publicaciones: ${err}`);
    }
  }

  async update(id, data) {
    const { name, username, password, email } = data;

    try {
      const user = usersModel.showByID(id);
      if (user.length === 0) {
        return { error: `No se encontró el usuario con id: ${id}` };
      }

      if (username) {
        const existingUser = usersModel.showByUsernameExcludingID(username, id);
        if (existingUser.length > 0) {
          return { error: "El nombre de usuario ya está en uso por otro usuario." };
        }
      }

      const updatedUser = {
        name: name ? name : user.name,
        username: username ? username : user.username,
        password: password ? password : user.password,
        email: email ? email : user.email
      };

      const result = usersModel.edit(updatedUser, id);
      return result;
    } catch (err) {
      throw new Error(`Error al editar el usuario: ${err}`);
    }
  }

  async delete(id) {
    try {
      const user = usersModel.showByID(id);
      if (user.length === 0) {
        return { error: `No se encontró el usuario con id: ${id}` };
      }

      const result = usersModel.delete(id);
      return result;
    } catch (err) {
      throw new Error(`Error al eliminar usuario: ${err}`);
    }
  }
}

module.exports = new UsersController();