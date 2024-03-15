import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getArticles, getComments, patchArticle } from "../utils/app";
import CommentCard from "./CommentCard";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CommentAdder from "./CommentAdder";
import { useLoading } from "../contexts/LoadingContext";
import { ClipLoader } from "react-spinners";
import ErrorPage from "./ErrorPage";


function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null)
  const { isLoading, setIsLoading } = useLoading();
  const [selectedUser, setSelectedUser] = useState("jessjelly");

  useEffect(() => {
    setIsLoading(true);
    getArticles(article_id)
      .then((articleData) => {
        setSingleArticle(articleData);
        return getComments(article_id);
      })
      .then((commentData) => {
        setComments(commentData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, [article_id]);

  const upVote = (articleId) => {
    setSingleArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
    patchArticle(articleId).catch(() => {
      setSingleArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes - 1 };
      });
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      setComments((prevComments) => {
        return prevComments.filter((comment) => {
          return comment.comment_id != commentId;
        });
      });
    });
  };

  if(error){
    return <ErrorPage error={error} />
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <ClipLoader color="#36d6c3" size={50} />
      </div>
    );
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
        <span aria-label="Upvote Article">
          <ArrowCircleUpIcon />
        </span>
      </button>

      <h2>Comments:</h2>
      <CommentAdder
        setComments={setComments}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />

      <ul>
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              selectedUser={selectedUser}
              handleDeleteComment={handleDeleteComment}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SingleArticle;
