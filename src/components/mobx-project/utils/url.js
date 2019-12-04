const postListFilter = {
  fields: ["id", "title", "author", "vote", "updatedAt"],
  limit: 10,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
};

const postByIdFilter = id => ({
  fields: ["id", "title", "author", "vote", "updatedAt", "content"],
  where: { id: id },
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

const commentListFilter = postId => ({
  fields: ["id", "author", "updatedAt", "content"],
  where: { post: postId },
  limit: 20,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

function encodeFilter(filter) {
  return encodeURIComponent(JSON.stringify(filter));
}

export default {
  login: () => "/bbc/user/login",
  getPostList: () => `/bbc/post?filter=${encodeFilter(postListFilter)}`,
  getPostById: id => `/bbc/post?filter=${encodeFilter(postByIdFilter(id))}`,
  createPost: () => "/bbc/post",
  updatePost: id => `/bbc/post/${id}`,
  getCommentList: postId =>
    `/bbc/comment?filter=${encodeFilter(commentListFilter(postId))}`,
  createComment: () => "/bbc/comment"
};
