var postsModel = require("../models/posts.m");
var usersModel = require("../models/users.m");
var commentsModel = require("../models/comments.m");

class PostsController {
  async create(data) {
    const { title, description, url_multimedia, user_id } = data;
    if (!title || !description || !url_multimedia || !user_id) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const user = usersModel.showByID(user_id);
      if (user.length === 0) {
        return { error: `No se encontró el usuario con id: ${user_id}` };
      }

      const newPost = { title, description, url_multimedia, user_id };
      postsModel.create(newPost);

      return { success: true };
    } catch (error) {
      return { error: `Error al crear la publicación: ${error.message}` };
    }
  }

  async show() {
    try {
      const posts = postsModel.show();
      return posts;
    } catch (err) {
      throw new Error(`Error al listar las publicaciones: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const post = postsModel.showByID(id);
      return post;
    } catch (err) {
      throw new Error(`Error al buscar publicación: ${err}`);
    }
  }

  async showComments(id) {
    try {
      const comments = commentsModel.showByPostID(id);
      return comments;
    } catch (err) {
      throw new Error(`Error al buscar los comentarios de la publicación: ${err}`);
    }
  }

  async update(id, data) {
    const { title, description, url_multimedia } = data;
    try {
      const post = postsModel.showByID(id);
      if (post.length === 0) {
        return { error: `No se encontró la publicación con id: ${id}` };
      }

      const updatedPost = {
        ...post[0],
        title: title ? title : post.title,
        description: description ? description : post.description,
        url_multimedia: url_multimedia ? url_multimedia : url_multimedia.password,
      };

      const result = postsModel.edit(updatedPost, id);
      return result;
    } catch (err) {
      throw new Error(`Error al editar publicación: ${err}`);
    }
  }

  async delete(id) {
    try {
      const post = postsModel.showByID(id);
      if (post.length === 0) {
        return { error: `No se encontró la publicación con id: ${id}` };
      }

      const result = postsModel.delete(id);
      return result;
    } catch (err) {
      throw new Error(`Error al eliminar publicación: ${err}`);
    }
  }
}

module.exports = new PostsController();