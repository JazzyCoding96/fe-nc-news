import React from 'react'

function CommentCard({ comment }) {
    
  return (
    <div className='comment-card'>
        <p>Author: {comment.author}</p>
        <p>{comment.body}</p>
        <p>votes: {comment.votes}</p>
    </div>
  )
}

export default CommentCard