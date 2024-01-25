import React, { useMemo, useState } from "react";
import "./index.scss";
import PostsCard from "../PostsCard";
import { getStatus } from "../../../api/FirestoreAPI";

export default function ProfileCard({ currentUser, onEdit }) {
  const [allStatuses, setAllStatus] = useState([]);

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <button onClick={onEdit}>Edit</button>
        </div>
        <div className="profile-info">
          <div>
            <h3 className="username">{currentUser.name}</h3>
            <p className="heading">{currentUser.headline}</p>
            <p>{currentUser.location}</p>
          </div>
          <div className="right-info">
            <p className="collge">{currentUser.college}</p>
            <p className="company">{currentUser.company}</p>
          </div>
        </div>
      </div>

      <div className="post-status-main">
        {allStatuses
          .filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail");
          })
          .map((posts) => {
            return (
              <div key="posts.id">
                <PostsCard posts={posts} />
              </div>
            );
          })}
      </div>
    </>
  );
}
