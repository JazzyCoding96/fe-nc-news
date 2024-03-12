import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getComments } from "../utils/app";
import CommentCard from "./CommentCard";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([])

  useEffect(() => {
    getArticles(article_id).then((articleData) => {
      setSingleArticle(articleData);
    });
    getComments(article_id).then((commentData) => {
      setComments(commentData)
    })
  }, [article_id]);

  return (
    <div className="single-article">
      <h1>{singleArticle.title}</h1>
      <img src={singleArticle.article_img_url} alt={singleArticle.title} />
      <p>Author: {singleArticle.author}</p>
      <p>Topic: {singleArticle.topic}</p>
      <p>{singleArticle.body}</p>
      <p>Comment Count: {singleArticle.comment_count}</p>
      <p>Votes: {singleArticle.votes}</p>

      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment= {comment}/>
        })}
      </ul>
    </div>
  );
}

export default SingleArticle;
