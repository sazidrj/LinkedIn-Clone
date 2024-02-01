import React, { useMemo, useState } from "react";
import "./index.scss";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                : `${currentProfile?.city}, ${currentProfile?.country}`}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="collge">{currentUser.college}</p>
            <p className="company">{currentUser.company}</p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>
        <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? currentUser.skills
            : currentProfile?.skills}
        </p>
      </div>

      <div className="post-status-main">
        {/* {console.log("allstatuses", allStatuses)} */}
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
