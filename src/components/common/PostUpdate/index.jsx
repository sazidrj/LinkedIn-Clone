import React, { useState, useMemo } from "react";
import ModalComponent from "../Modal";
import {
  postStatus,
  getStatus,
  updatePost,
  deletePost,
} from "../../../api/FirestoreAPI";
import PostCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueID } from "../../../helpers/getUniqueId";
import "./index.scss";

export default function PostStatus({ currentUser }) {
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currnetPost, setCurrentPost] = useState({});

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
    };

    {
      console.log("isEdit", isEdit);
    }

    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currnetPost.id, status);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img alt="imageLink" src={currentUser.imageLink} />
        <p className="name">{currentUser.name}</p>
        <p className="heading">{currentUser.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          alt="imageLink"
          src={currentUser.imageLink}
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
      />
      <div>
        {allStatuses.map((posts) => {
          return (
            <div key="posts.id">
              <PostCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
