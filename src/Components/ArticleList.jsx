import React, { useEffect, useState } from 'react'
import { getArticles, getFilteredArticles } from '../utils/app';
import ArticleCard from './ArticleCard';
import { useSearchParams } from 'react-router-dom'


function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const topic = searchParams.get("topic") || "All";

  useEffect(() => {
    let articleFunc;
    if (topic === "All") {
      articleFunc = getArticles();
    } else {
      articleFunc = getFilteredArticles(topic);
    }

    articleFunc.then(
      (articleData) => {
        const sortedArticles = sortBy
          ? [...articleData].sort((a, b) => {
            console.log(a, "this is a");
            console.log(b, "this is b");
              return b[sortBy] - a[sortBy];
            })
          : articleData;
        setArticles(sortedArticles);
      },
      [topic, sortBy]
    );
  });

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    if (newTopic === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ topic: newTopic });
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <label htmlFor="topic"> Select Topic:</label>
      <select id="topic" value={topic} onChange={handleTopicChange}>
        <option value="All">All</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>

      <label htmlFor="sort-by">Sort By:</label>
      <select id="sort-by" onChange={handleSortBy}>
        <option value="">None</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
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
            votes: article.votes,
          };
          return <ArticleCard key={articleObj.id} articleObj={articleObj} />;
        })}
      </ul>
    </>
  );
}

export default ArticleList;