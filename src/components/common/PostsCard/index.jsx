import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";

export default function PostsCard({ posts }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  console.log(currentUser);

  return (
    <div className="posts-card">
      {/* {console.log("posts", posts)} */}
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: posts?.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div>
  );
}
