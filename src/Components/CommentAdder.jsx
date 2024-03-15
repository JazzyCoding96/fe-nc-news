import React, { useState } from "react";
import { postComment } from "../utils/app";
import { useParams } from "react-router-dom";

function CommentAdder({ setComments, setSelectedUser, selectedUser }) {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { newComment, selectedUser, article_id };

    setIsSubmitting(true);

    postComment(formData).then((postedComment) => {
      setNewComment("");
      setComments((currComments) => {
        return [postedComment, ...currComments];
      });
      setIsSubmitting(false);
    });
  };

  return (
    <form className="post-comment" onSubmit={handleSubmit}>
      <label htmlFor="user">Select User:</label>
      <select
        id="user"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="jessjelly">jessjelly</option>
        <option value="grumpy19">grumpy19</option>
        <option value="tickle122">tickle122</option>
        <option value="happyamy2016">happyamy2016</option>
        <option value="cooljmessy">cooljmessy</option>
        <option value="weegembump">weegembump</option>
      </select>
      <label htmlFor="newComment">Add a comment</label>
      <textarea required
        id="newComment"
        multiline="true"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button type="submit" className="capitalize bg-green-500 text-white hover:bg-green-700">{isSubmitting ? "Posting..." : "Post"}</button>
    </form>
  );
}

export default CommentAdder;
