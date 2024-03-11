import axios from 'axios'

const getArticles = () => {
    let url = `https://nc-news-xooy.onrender.com/api/articles`;

    return axios.get(url).then((response) => {
        const articlesArray = response.data.articles
      return articlesArray
    });
  };
  
export { getArticles }