import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./task.module.css";
import io from "socket.io-client";

export default function TaskComments({ task }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(task.comments);
  const id = task._id;
  const [socket] = useState(() => io(":8000"));

  const addComment = () => {
    const newCom = {
      sender: localStorage.getItem("userName"),
      message: newComment,
    };
    axios
      .put(
        `http://localhost:8000/api/tasks/${id}`,
        { comments: [...comments, newCom] },
        { withCredentials: true }
      )
      .then((res) => {
        socket.emit("new comment created", newCom);

        setNewComment("");
      })
      .catch(console.log);
  };

  useEffect(() => {
    socket.on("new comment added", (newComment) => {
      setComments((prevComments) => {
        return [...prevComments, newComment];
      });
    });

    return () => socket.disconnect(true);
  }, [socket]);

  if (comments === undefined) return "Loading...";

  return (
    <div>
      <div className={styles.commentArea}>
        {comments.map((comment, idx) => {
          return (
            <div key={idx}>
              <p>{comment.sender}</p>
              <p>{comment.message}</p>
            </div>
          );
        })}
      </div>
      <textarea
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="leave a comment"
        className={styles.textInput}
      />
      <button type="button" onClick={addComment} className={styles.saveButton}>
        Save
      </button>
      <button
        type="button"
        onClick={() => setNewComment("")}
        className={styles.cancelButton}
      >
        Cancel
      </button>
    </div>
  );
}
