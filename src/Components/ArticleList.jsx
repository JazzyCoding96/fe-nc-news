import React, { useEffect, useState } from 'react'
import { getArticles } from '../utils/app';
import ArticleCard from './ArticleCard';

function ArticleList() {
  const [articles, setArticles] = useState([]);

    useEffect(() => {
      getArticles().then((data) => {
        setArticles(data)
      });
    }, []);



  return ( <ul>
    {articles.map((article) => {
        const articleObj = {
            id: article.article_id,
            img: article.article_img_url,
            author: article.author,
            commentCount: article.comment_count,
            title: article.title,
            topic: article.topic,
            votes: article.votes
        }
        return  <ArticleCard key={articleObj.id} articleObj={ articleObj }/>
    })}
  </ul> )
}

export default ArticleList