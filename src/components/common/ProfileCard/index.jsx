import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import {
  getSingleStatus,
  getSingleUser,
  editProfile,
} from "../../../api/FirestoreAPI";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

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
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
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
                ? `${currentUser.City}, ${currentUser.country}`
                : `${currentProfile?.City}, ${currentProfile?.country}`}
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
        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}
