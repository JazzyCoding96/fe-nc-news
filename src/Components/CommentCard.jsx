import React from 'react'
import { Button } from "@material-tailwind/react";

function CommentCard({ comment, selectedUser, handleDeleteComment }) {
  const handleDelete = () => {
    handleDeleteComment(comment.comment_id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-2">
        <p className="text-md text-black font-semibold">
          Author: <span className="font-normal">{comment.author}</span>
        </p>
      </div>
      <p className="text-black mb-4">{comment.body}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-large text-blue-600">
          votes: {comment.votes}
        </p>
        {selectedUser === comment.author ? (
            <Button color="red" className="capitalize bg-red-500 text-white hover:bg-red-700"  onClick={handleDelete}>
              Delete
            </Button>
        ) : null}
      </div>
    </div>
  );
}

export default CommentCard;