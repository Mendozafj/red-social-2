var commentsModel = require("../models/comments.m");
var usersModel = require("../models/users.m");
var postsModel = require("../models/posts.m");

class CommentsController {
  async create(data) {
    const { content, post_id, user_id } = data;
    if (!content || !post_id || !user_id) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const post = postsModel.showByID(post_id);
      if (post.length === 0) {
        return { error: `No se encontró la publicación con id: ${user_id}` };
      }

      const user = usersModel.showByID(user_id);
      if (user.length === 0) {
        return { error: `No se encontró el usuario con id: ${user_id}` };
      }

      const newComments = { content, post_id, user_id };
      commentsModel.create(newComments);

      return { success: true };
    } catch (error) {
      return { error: `Error al crear el comentario: ${error.message}` };
    }
  }

  async show() {
    try {
      const comments = commentsModel.show();
      return comments;
    } catch (err) {
      throw new Error(`Error al listar los comentarios: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const comment = commentsModel.showByID(id);
      return comment;
    } catch (err) {
      throw new Error(`Error al buscar el comentario: ${err}`);
    }
  }

  async update(id, data) {
    const { content } = data;
    try {
      const comment = commentsModel.showByID(id);
      if (comment.length === 0) {
        return { error: `No se encontró el comentario con id: ${id}` };
      }

      const updatedComment = {
        ...comment[0],
        content: content ? content : comment.content,
      };

      const result = commentsModel.edit(updatedComment, id);
      return result;
    } catch (err) {
      throw new Error(`Error al editar comentario: ${err}`);
    }
  }

  async delete(id) {
    try {
      const comment = commentsModel.showByID(id);
      if (comment.length === 0) {
        return { error: `No se encontró el comentario con id: ${id}` };
      }

      const result = commentsModel.delete(id);
      return result;
    } catch (err) {
      throw new Error(`Error al eliminar comentario: ${err}`);
    }
  }
}

module.exports = new CommentsController();