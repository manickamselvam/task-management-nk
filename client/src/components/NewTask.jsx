import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button, Form } from "react-bootstrap";

export default function NewTask({
  closeModal,
  currentProject,
  projects,
  users,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assignee, setAssignee] = useState(null);
  const creator = localStorage.getItem("userID");
  const status = "0";
  const [projectID, setProjectID] = useState(0);
  const [socket] = useState(() => io(":8000"));

  // useEffect(() => {
  //     setProject(currentProject);
  // }, [currentProject]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Creating new task

    const newTask = {
      name,
      description,
      priority,
      assignee,
      creator,
      status,
      projectID,
    };

    axios
      .post("http://localhost:8000/api/tasks/", newTask, {
        withCredentials: true,
      })
      .then((res) => {
        //broadcasts new task so the issues list will auto update
        socket.emit("new task created", res.data.task);
        return res.data;
      })
      .catch((err) => {
        console.log("this is from new task page: ", err.response.data.errors);
        // const errorResponse = err.response.data.errors;
        // const errorArr = [];
        // for (const key of Object.keys(errorResponse)) {
        //     errorArr.push(errorResponse[key].properties.message);
        // }
        // setErrors(errorArr);
        // setErrors(err.response.data.message);
        // Object.values(err.response.data.errors).map(
        //     (field) => field.properties.message
        // )
      });

    // Adding the task to the project selected

    // axios
    //     .put(
    //         `http://localhost:8000/api/projects/${
    //             project._id
    //         }/${localStorage.getItem('userId')}`
    //     )
    //     .then((res) => res.data)
    //     .catch((err) => {
    //         const errorResponse = err.response.data.errors;
    //         const errorArr = [];
    //         for (const key of Object.keys(errorResponse)) {
    //             errorArr.push(errorResponse[key].properties.message);
    //         }
    //         setErrors(errorArr);
    //     });

    // const updatedProj = {
    //     name: project.name,
    //     tasks: [...project.tasks, task._id],
    //     users: project.users,
    //     dueDate: project.dueDate,
    // };

    // console.log(
    //     'this is the project: ',
    //     project,
    //     'and this is the updated one: ',
    //     updatedProj
    // );

    // axios
    //     .put(
    //         'http://localhost:8000/api/projects' + project._id,
    //         updatedProj,
    //         { withCredentials: true }
    //     )
    //     .then((res) => res.data)
    //     .catch((err) => {
    //         // const errorResponse = err.response.data.errors;
    //         // const errorArr = [];
    //         // for (const key of Object.keys(errorResponse)) {
    //         //     errorArr.push(errorResponse[key].properties.message);
    //         // }
    //         // setErrors(errorArr);
    //         setErrors(err.response.data.message);
    //     });
  };

  if (projects == null) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* {errors.map((err, idx) => (
                <p key={idx} className="text-danger">
                    {err}
                </p>
            ))} */}
      <Form.Group>
        <Form.Label>Project</Form.Label>
        <Form.Control
          as="select"
          value={projectID}
          onChange={(e) => {
            setProjectID(e.target.value);
            console.log("we changed project to: ", e.target.value);
          }}
        >
          {projects.map((p, idx) => {
            return (
              <option key={idx} value={p._id}>
                {p.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {/* This is for issue Type */}
      {/* <Form.Group>
                <Form.Label>Issue Type</Form.Label>
                <Form.Control as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {tasks.map((t, idx) => {
                        <option key={idx} value={t}>
                            {t.type}
                        </option>;
                    })}
                </Form.Control>
            </Form.Group> */}
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      {/* <Form.Group>
                <Form.Label>Attachment</Form.Label>
                <p>This is for the attachment feature</p>
            </Form.Group> */}
      {/* <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </Form.Group> */}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
      </Form.Group>
      {/* <Form.Group>
                <Form.Label>Reporter</Form.Label>
                <Form.Control
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                ></Form.Control>
            </Form.Group> */}
      <Form.Group>
        <Form.Label>Assignee</Form.Label>
        <Form.Control
          as="select"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          {<option value={null}>Unassigned</option>}
          {users.map((user, idx) => {
            return (
              <option value={user._id} key={idx}>
                {user.name}
              </option>
            );
          })}
        </Form.Control>
        {/* <a>Assign to me</a> */}
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </Form.Control>
      </Form.Group>
      {/* <Form.Group>
                <Form.Label>Labels</Form.Label>
                <Form.Control
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                ></Form.Control>
            </Form.Group> */}
      <div className="text-right">
        <Button variant="primary" type="submit" onClick={closeModal}>
          Create
        </Button>
      </div>
    </Form>
  );
}
