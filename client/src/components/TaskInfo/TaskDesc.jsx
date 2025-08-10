import React, { useState } from "react";
import axios from "axios";
import styles from "./task.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskDesc({ task }) {
  const [description, setDescription] = useState(task.description || "");
  const [draft, setDraft] = useState(task.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const id = task._id;

  const saveDesc = async () => {
    if (draft.trim() === description.trim()) return;

    setIsSaving(true);
    setStatus(null);

    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { description: draft },
        { withCredentials: true }
      );
      setDescription(draft);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setDraft(description);
    setStatus(null);
  };

  return (
    <div className={styles.taskDescContainer}>
      <h5 className={styles.heading}>Description</h5>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Add a description..."
        className={styles.textInput}
        rows={4}
      />

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.saveButton}
          onClick={saveDesc}
          disabled={isSaving || draft.trim() === description.trim()}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={cancelEdit}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>

      {status === "success" && (
        <p className={styles.successMsg}>Description updated!</p>
      )}
      {status === "error" && (
        <p className={styles.errorMsg}>Failed to update description.</p>
      )}
    </div>
  );
}
