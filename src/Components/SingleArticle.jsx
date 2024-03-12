import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getComments, patchArticle } from "../utils/app";
import CommentCard from "./CommentCard";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CommentAdder from "./CommentAdder";


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

  const upVote = (articleId) => {
    setSingleArticle((currArticle) => {
      return {...currArticle, votes: currArticle.votes + 1}
    })
    patchArticle(articleId).catch(() => {
      setSingleArticle((currArticle) => {
      return {...currArticle, votes: currArticle.votes - 1}
      })
    })
  }
  
  return (
    <div className="single-article">
      <h1>{singleArticle.title}</h1>
      <img src={singleArticle.article_img_url} alt={singleArticle.title} />
      <p>Author: {singleArticle.author}</p>
      <p>Topic: {singleArticle.topic}</p>
      <p>{singleArticle.body}</p>
      <p>Comment Count: {singleArticle.comment_count}</p>
      <p>Votes: {singleArticle.votes}</p>
      <button onClick={() => upVote(singleArticle.article_id)}>
        <span aria-label="Upvote Article"><ArrowCircleUpIcon/></span>
      </button>

      <h2>Comments:</h2>
      <CommentAdder setComments={setComments}/>

      <ul>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment= {comment}/>
        })}
      </ul>

    </div>
  );
}

export default SingleArticle;
