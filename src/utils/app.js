import axios from "axios";

const getArticles = (articleId) => {
  let url = `https://nc-news-xooy.onrender.com/api/articles`;

  if (articleId) {
    return axios.get(`${url}/${articleId}`).then((response) => {
      const singleArticle = response.data.article;
      return singleArticle;
    });
  }
  return axios.get(url).then((response) => {
    const articlesArray = response.data.articles;
    return articlesArray;
  });
};

const getComments = (articleId) => {
  let url = `https://nc-news-xooy.onrender.com/api/articles/${articleId}/comments`;

  return axios.get(url).then((response) => {
    const commentsArray = response.data.comments;
    return commentsArray;
  });
};

const patchArticle = (articleId) => {
  const patchBody = { inc_votes: 1 };
  return axios
    .patch(
      `https://nc-news-xooy.onrender.com/api/articles/${articleId}`,
      patchBody
    )
    .then((response) => {
      return response.data.articles;
    });
};

const postComment = (formData) => {
  const postBody = { username: formData.selectedUser, body: formData.newComment };
  
  return axios
    .post(
      `https://nc-news-xooy.onrender.com/api/articles/${formData.article_id}/comments`,
      postBody
    )
    .then((response) => {
        console.log(response.data.comment, "response ");
      return response.data.comment;
    });
};

const deleteComment = (commentId) => {
    console.log(commentId);
    return axios.delete(`https://nc-news-xooy.onrender.com/api/comments/${commentId}`)

}

export { getArticles, getComments, patchArticle, postComment, deleteComment };
