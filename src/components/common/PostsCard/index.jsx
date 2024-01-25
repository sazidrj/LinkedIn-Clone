import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function PostsCard({ posts }) {
  let navigate = useNavigate();

  return (
    <div className="posts-card">
      <p className="name" onClick={() => navigate("./profile")}>
        {posts.userName}
      </p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
  );
}
