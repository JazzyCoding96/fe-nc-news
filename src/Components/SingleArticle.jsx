import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/app";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});

  useEffect(() => {
    getArticles(article_id).then((articleData) => {
      setSingleArticle(articleData);
    });
  }, []);

  return (
    <div className="single-article">
      <h2>{singleArticle.title}</h2>
      <img src={singleArticle.article_img_url} alt={singleArticle.title} />
      <p>Author: {singleArticle.author}</p>
      <p>Topic: {singleArticle.topic}</p>
      <p>{singleArticle.body}</p>
      <p>Comment Count: {singleArticle.comment_count}</p>
      <p>Votes: {singleArticle.votes}</p>
    </div>
  );
}

export default SingleArticle;
