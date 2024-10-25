const { v4: uuidv4 } = require('uuid');

let commentsDB = [
  {
    id: "1",
    content: "Comentario 1",
    post_id: "1",
    user_id: "1"
  }
]

class CommentsModel {
  create(comment) {
    comment.id = uuidv4();
    commentsDB.push(comment);
  }

  show() {
    return commentsDB;
  }

  showByID(id) {
    return commentsDB.filter(comment => comment.id == id);
  }

  showByPostID(post_id) {
    return commentsDB.filter(comment => comment.post_id == post_id);
  }

  edit(updatedComments, id) {
    const index = commentsDB.findIndex(comment => comment.id == id);
    return commentsDB[index] = { id, ...updatedComments };
  }

  delete(id) {
    const index = commentsDB.findIndex(comment => comment.id == id);
    commentsDB.splice(index, 1);
    return commentsDB;
  }
}

module.exports = new CommentsModel();