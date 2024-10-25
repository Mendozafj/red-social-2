const { v4: uuidv4 } = require('uuid');

let postsDB = [
  {
    id: "1",
    title: "Publicación 1",
    description: "Publicación en la red social",
    url_multimedia: "https://www.multimedia.com/image.png",
    user_id: "1"
  }
]

class UsersModel {
  create(post) {
    post.id = uuidv4();
    postsDB.push(post);
  }

  show() {
    return postsDB;
  }

  showByID(id) {
    return postsDB.filter(post => post.id == id);
  }

  showByUserID(user_id) {
    return postsDB.filter(post => post.user_id == user_id);
  }

  getLastPostByUser(user_id) {
    const posts = postsDB.filter(post => post.user_id == user_id);
    const lastPost = posts.length > 0 ? posts[posts.length - 1] : null;
    return lastPost;
  }


  edit(updatedPost, id) {
    const index = postsDB.findIndex(post => post.id == id);
    return postsDB[index] = { id, ...updatedPost };
  }

  delete(id) {
    const index = postsDB.findIndex(post => post.id == id);
    postsDB.splice(index, 1);
    return postsDB;
  }
}

module.exports = new UsersModel();