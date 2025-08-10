import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./task.module.css";
import io from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;

export default function TaskComments({ task }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(task?.comments || []);
  const socketRef = useRef(null);
  const commentEndRef = useRef(null);
  const id = task._id;

  useEffect(() => {
    socketRef.current = io(`${BACKEND_DOMAIN}`);

    socketRef.current.on("new comment added", (incomingComment) => {
      setComments((prev) => [...prev, incomingComment]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const addComment = async () => {
    if (!newComment.trim()) return;

    const commentObj = {
      sender: localStorage.getItem("userName"),
      message: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { comments: [...comments, commentObj] },
        { withCredentials: true }
      );

      socketRef.current.emit("new comment created", commentObj);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  if (!comments) return <p>Loading comments...</p>;

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentArea}>
        {comments.map((comment, idx) => (
          <div key={`${comment.sender}-${idx}`} className={styles.commentCard}>
            <p className={styles.commentSender}>{comment.sender}</p>
            <p className={styles.commentMessage}>{comment.message}</p>
            {comment.createdAt && (
              <span className={styles.commentTime}>
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            )}
          </div>
        ))}
        <div ref={commentEndRef} />
      </div>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Leave a comment..."
        className={styles.textInput}
        rows={3}
      />

      <div className={styles.buttonRow}>
        <button
          type="button"
          onClick={addComment}
          className={styles.saveButton}
          disabled={!newComment.trim()}
        >
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
    </div>
  );
}
