import React, { useEffect, useState } from "react";
import { getArticles, getFilteredArticles } from "../utils/app";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useLoading } from "../contexts/LoadingContext";
import ErrorPage from "./ErrorPage";

function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const { isLoading, setIsLoading } = useLoading();
  const [sortBy, setSortBy] = useState("");
  const topic = searchParams.get("topic") || "All";

  useEffect(() => {
    setIsLoading(true);
    let articleFunc;
    if (topic === "All") {
      articleFunc = getArticles();
    } else {
      articleFunc = getFilteredArticles(topic);
    }

    articleFunc
      .then((articleData) => {
        const sortedArticles = sortBy
          ? [...articleData].sort((a, b) => {
              return b[sortBy] - a[sortBy];
            })
          : articleData;
        setArticles(sortedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, [topic, sortBy]);

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    if (newTopic === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ topic: newTopic });
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
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
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-2 items-center">
              <label htmlFor="topic" className="font-semibold">
                Select Topic:
              </label>
              <select
                id="topic"
                value={topic}
                onChange={handleTopicChange}
                className="border-2 border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All</option>
                <option value="coding">Coding</option>
                <option value="football">Football</option>
                <option value="cooking">Cooking</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="sort-by" className="font-semibold">
                Sort By:
              </label>
              <select
                id="sort-by"
                onChange={handleSortBy}
                className="border-2 border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="">None</option>
                <option value="comment_count">Comment Count</option>
                <option value="votes">Votes</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-8">
              {articles.map((article) => {
                const articleObj = {
                  id: article.article_id,
                  img: article.article_img_url,
                  author: article.author,
                  commentCount: article.comment_count,
                  title: article.title,
                  topic: article.topic,
                  votes: article.votes,
                };
                return (
                  <ArticleCard key={articleObj.id} articleObj={articleObj} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleList;
