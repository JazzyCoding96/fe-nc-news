import React from 'react'
import { Button } from "@material-tailwind/react";

function CommentCard({ comment, selectedUser, handleDeleteComment }) {
  const handleDelete = () => {
    handleDeleteComment(comment.comment_id);
  };

  return (
    <div className="comment-card">
      <p>Author: {comment.author}</p>
      <p>{comment.body}</p>
      <p>votes: {comment.votes}</p>
      {selectedUser === comment.author ? (
        <div className="flex w-max gap-4">
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;