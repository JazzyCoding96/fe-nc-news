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

export { getArticles };