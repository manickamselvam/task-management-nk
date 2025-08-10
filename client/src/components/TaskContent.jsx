import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskContent({ taskNumber }) {
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [type, setType] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [creator, setCreator] = useState("");
  const [estimate, setEstimate] = useState(0);
  const [timeTracked, setTimeTracked] = useState(0);
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/tasks/${taskNumber}`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        setTask(data);
        setName(data.name || "");
        setDescription(data.description || "");
        setComments(data.comments || []);
        setType(data.type || "To Do");
        setDueDate(data.dueDate || "");
        setPriority(data.priority || "Medium");
        setAssignee(data.assignee || "");
        setCreator(data.creator || "");
        setEstimate(data.estimate || 0);
        setTimeTracked(data.timeTracked || 0);
        setLabels(data.labels || []);
        setStatus(data.status || "");
      })
      .catch(console.error);

    axios
      .get(`${API_BASE_URL}/users`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, [taskNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCom = {
      sender: localStorage.getItem("userName"),
      message: newComment,
    };

    const updatedComments = newComment ? [...comments, newCom] : comments;

    const updatedTask = {
      name,
      description,
      comments: updatedComments,
      type,
      dueDate,
      priority,
      assignee,
      creator,
      estimate,
      timeTracked,
      labels,
      status,
    };

    axios
      .put(`${API_BASE_URL}/tasks/${taskNumber}`, updatedTask, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data);
        setComments(updatedComments);
        setNewComment("");
        setErrors([]);
      })
      .catch((err) => {
        const errorResponse = err.response?.data?.errors || {};
        setErrors(
          Object.values(errorResponse).map((e) => e.properties?.message)
        );
      });
  };

  const handleLabels = (value) => {
    setLabels(value.split(",").map((label) => label.trim()));
  };

  if (!task || !users.length) {
    return <p>The task you have selected does not exist!</p>;
  }

  return (
    <div className="col-9">
      <Form onSubmit={handleSubmit} className="row">
        <div className="col-9">
          {errors.length > 0 && (
            <Alert variant="danger">
              {errors.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </Alert>
          )}

          <p className="fw-bold">
            <img
              style={{ width: "18px" }}
              src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png"
              alt="check"
              className="me-1"
            />
            GEER-{taskNumber}
          </p>

          <Form.Group className="mb-3">
            <Form.Control
              size="lg"
              value={name}
              placeholder="Task name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button variant="light" className="me-2">
              Attach
            </Button>
            <Button variant="light" className="me-2">
              Create subtask
            </Button>
            <Button variant="light" className="me-2">
              Link issue
            </Button>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Activity</Form.Label>
          <div className="mb-2">
            <Button variant="light" className="me-2">
              Comments
            </Button>
            <Button variant="light" className="me-2">
              History
            </Button>
            <Button variant="light" className="me-2">
              Work log
            </Button>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>

        <div className="col-3">
          <Form.Group className="mb-3">
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignee</Form.Label>
            <Form.Select
              size="sm"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reporter</Form.Label>
            <Form.Select
              size="sm"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due date</Form.Label>
            <Form.Control
              type="datetime-local"
              size="sm"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              size="sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Labels</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={labels.join(", ")}
              placeholder="Comma-separated labels"
              onChange={(e) => handleLabels(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Original Estimate</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time tracking</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={timeTracked}
              onChange={(e) => setTimeTracked(e.target.value)}
            />
          </Form.Group>
        </div>
      </Form>
    </div>
  );
}
