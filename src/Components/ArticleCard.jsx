import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function ArticleCard({ articleObj }) {
  return (
    <li>
      <div className="article">
        <Link to={`/articles/${articleObj.id}`}>
          <h2>{articleObj.title}</h2>
          <img src={articleObj.img} alt={articleObj.title} />
        </Link>
        <p>Author: {articleObj.author}</p>
        <p>Topic: {articleObj.topic}</p>
        <p>Comment Count: {articleObj.commentCount}</p>
        <p>Votes: {articleObj.votes}</p>
      </div>
    </li>
  );
}

export default ArticleCard;
