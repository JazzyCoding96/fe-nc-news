import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  getArticles,
  getComments,
  patchArticle,
} from "../utils/app";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import { useLoading } from "../contexts/LoadingContext";
import { ClipLoader } from "react-spinners";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
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

  if (error) {
    return <ErrorPage error={error} />;
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
        <ClipLoader color="#dedede" size={50} />
      </div>
    );
  }

  return (
    <div className="max-w-4x1 mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{singleArticle.title}</h1>
      <img
        src={singleArticle.article_img_url}
        alt={singleArticle.title}
        className="rounded-lg mb-4 w-full"
      />
      <div className="mb-8">
          <p className="text-md font-semibold mb-2">Author: {singleArticle.author}</p>
          <p className="text-md font-semibold mb-2">Topic: {singleArticle.topic}</p>
        </div>
        <p className="mb-4">{singleArticle.body}</p>
      <div className="flex items-center space-x-4 mb-4">
        <p className="font-semibold">
          Comment Count: {singleArticle.comment_count}
        </p>
        <p className="font-semibold">Votes: {singleArticle.votes}</p>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
        onClick={() => upVote(singleArticle.article_id)}
      >
        <span aria-label="Upvote Article">Upvote</span>
      </button>

      <h2 className="text-xl font-bold mb-2">Comments:</h2>
      <CommentAdder
        setComments={setComments}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />

      <ul className="space-y-4">
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
