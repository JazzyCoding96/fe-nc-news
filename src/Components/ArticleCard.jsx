import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function ArticleCard({ articleObj }) {
  return (
    <div className="border shadow-lg rounded-lg overflow-hidden">
      <Link
        to={`/articles/${articleObj.id}`}
        className="block hover:opacity-75 transition-opacity duration-200"
      >
        <img
          src={articleObj.img}
          alt={articleObj.title}
          className="w-full h-48 object-cover"
        />
        <h3 className="text-lg font-semibold text-white mb-2">
          {articleObj.title}
        </h3>
      <div className="p-4 bg-gray-100">
        <p className="text-sm text-black font-medium">Author: {articleObj.author}</p>
        <p className="text-sm text-black font-medium">Topic: {articleObj.topic}</p>
        <p className="text-sm text-black font-medium">
          Comment Count: {articleObj.commentCount}
        </p>
        <p className="text-sm text-black font-medium">Votes: {articleObj.votes}</p>
      </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
