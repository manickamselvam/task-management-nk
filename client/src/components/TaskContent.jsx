import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default function TaskContent(props) {
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  //maybe won't have to initialize it to 'To Do'
  const [type, setType] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState(null);
  const [creator, setCreator] = useState(null);
  const [estimate, setEstimate] = useState(0);
  const [timeTracked, setTimeTracked] = useState(0);
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/" + props.taskNumber, {
        withCredentials: true,
      })
      .then((res) => {
        // Destructuring for DRY
        setTask(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setComments(res.data.comments);
        setType(res.data.type);
        setDueDate(res.data.dueDate);
        setPriority(res.data.priority);
        setAssignee(res.data.assignee);
        setCreator(res.data.creator);
        setEstimate(res.data.estimate);
        setTimeTracked(res.data.timeTracked);
        setLabels(res.data.labels);
        setStatus(res.data.status);
      })
      .catch(console.log);

    axios
      .get("http://localhost:8000/api/users", {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data))
      .catch(console.log);
  }, [props.taskNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCom = {
      sender: localStorage.getItem("userName"),
      message: newComment,
    };
    if (newComment !== "") {
      if (comments.length > 0) setComments(...comments, newCom);
      else setComments([newCom]);
    }

    const updatedTask = {
      name,
      description,
      comments: [...comments, newCom],
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
      .put(`http://localhost:8000/api/tasks/${props.taskNumber}`, updatedTask, {
        withCredentials: true,
      })
      .then((res) => setTask(res.data))
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].properties.message);
        }
        setErrors(errorArr);
      });
  };

  const handleLabels = (value) => {
    setLabels(...labels, value);
  };

  if (task == null || users == null) {
    return <p>The task you have selected does not exist!</p>;
  }

  return (
    <div className="col-9">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-9">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
          <p>
            <img
              style={{ width: "18px" }}
              src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png"
              alt="check"
            />
            GEER-{props.taskNumber}
          </p>
          <h3>
            <Form.Control
              size="lg"
              value={task.name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </h3>
          <div>
            <Button variant="light" className="mr-1">
              Attach
            </Button>
            <Button variant="light" className="mr-1">
              Create subtask
            </Button>
            <Button variant="light" className="mr-1">
              Link issue
            </Button>
          </div>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            aria-label="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
          <Form.Label>Activity</Form.Label>
          <div>
            Show:
            <Button variant="light">Comments</Button>
            <Button variant="light">History</Button>
            <Button variant="light">Work log</Button>
            <Form.Control
              as="textarea"
              rows="1"
              aria-label="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></Form.Control>
          </div>
          <div className="mt-2">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </div>
        <div className="col-3">
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => e.target.value}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Control>
          <Form.Group>
            <Form.Label>Assignee</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={assignee}
              onChange={(e) => e.target.value}
            >
              {users.map((user, idx) => (
                <option key={idx} value={user}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Reporter</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={creator}
              onChange={(e) => e.target.value}
            >
              {users.map((user, idx) => (
                <option key={idx} value={user}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Due date</Form.Label>
            <Form.Control
              type="datetime-local"
              size="sm"
              value={dueDate}
              onChange={(e) => e.target.value}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={priority}
              onChange={(e) => e.target.value}
            >
              <option value="High">High</option>
              <option defaultValue value="Medium">
                Medium
              </option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Labels</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={labels}
              onChange={(e) => handleLabels(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Original Estimate</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time tracking</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={timeTracked}
              onChange={(e) => setTimeTracked(e.target.value)}
            />
          </Form.Group>
          {/* Implement timestamp properties */}
        </div>
      </form>
    </div>
  );
}

// function mapStateToProps(state) {
//     return {
//         user: state.user,
//     };
// }

// export default connect(mapStateToProps)(TaskContent);
