import axios from 'axios'

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

}

export { getArticles, getComments };