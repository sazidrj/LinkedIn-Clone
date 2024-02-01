import React, { useState, useMemo } from "react";
import ModalComponent from "../Modal";
import { postStatus, getStatus } from "../../../api/FirestoreAPI";
import PostCard from "../PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueID } from "../../../helpers/getUniqueId";
import "./index.scss";

export default function PostStatus({ currentUser }) {
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
    };

    // {
    //   console.log(currentUser);
    // }

    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>
          Start a Post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
      />
      <div>
        {allStatuses.map((posts) => {
          return (
            <div key="posts.id">
              <PostCard posts={posts} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
