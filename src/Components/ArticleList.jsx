import React, { useEffect, useState } from 'react'
import { getArticles, getFilteredArticles } from '../utils/app';
import ArticleCard from './ArticleCard';
import { useSearchParams } from 'react-router-dom'




function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams({})
  const [articles, setArticles] = useState([]);
  const topic = searchParams.get('topic') || 'All'

    useEffect(() => {
      if(topic === "All"){
        getArticles().then((data) => {
          setArticles(data)
        })
      }
      else {
        getFilteredArticles(topic).then((data) => {
          setArticles(data)
      })
    }
    }, [topic]);

    const handleTopicChange = (e) => {
      const newTopic = e.target.value
      if(newTopic === "All"){
        setSearchParams({})
      }
      else {
        setSearchParams({ topic: newTopic })
      }
    }


  return ( 
    <>
      <label htmlFor="topic"> Select Topic:</label>
      <select id="topic" value={topic} onChange={handleTopicChange}>
        <option value="All">All</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>
      <ul>
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
    </ul> 
  </>
  )
}

export default ArticleList