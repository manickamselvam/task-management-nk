// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import NewTask from "../components/NewTask";
// import TaskParent from "../components/TaskParent";
// import { Modal } from "react-bootstrap";
// import Axios from "axios";
// import ProjectSettings from "../components/ProjectSettings";
// import io from "socket.io-client";
// import { navigate } from "@reach/router";
// import styles from "../components/main.module.css";

// export default function Main({ id }) {
//   const [show, setShow] = useState(false);
//   const [allUsers, setAllUsers] = useState(null);
//   const [allProjects, setAllProjects] = useState(null);
//   const [currentProj, setCurrentProj] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [currentView, setCurrentView] = useState("tasks");
//   const [socket] = useState(() => io(":8000"));
//   //new
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     //Make sure a user is logged in
//     if (localStorage.getItem("userID") === null) {
//       navigate("/login");
//       return;
//     }
//     Axios.get(
//       "http://localhost:8000/api/projects/user/" +
//         localStorage.getItem("userID"),
//       { withCredentials: true }
//     ).then((res) => {
//       //this is to prevent the site from crashing if a user has no projects created yet
//       if (res.data.length === 0) {
//         return navigate("/welcome");
//       }
//       setAllProjects(res.data);
//       //updating currentProj to a default
//       setCurrentProj(res.data[0]);
//       setFilteredTasks(res.data[0].tasks);
//       setTasks(res.data[0].tasks);
//     });

//     Axios.get("http://localhost:8000/api/users", {
//       withCredentials: true,
//     }).then((users) => setAllUsers(users.data));

//     //new
//     if (id) {
//       Axios.get("http://localhost:8000/api/tasks/" + id, {
//         withCredentials: true,
//       })
//         .then((res) => setTask(res.data))
//         .catch(console.log);
//     }

//     socket.on("new task added", (newTask) => {
//       setTasks((prevIssues) => {
//         return [...prevIssues, newTask];
//       });
//     });

//     return () => socket.disconnect(true);
//   }, [socket]);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   if (allProjects == null) return <p>Loading...</p>;

//   return (
//     <>
//       <div className="row">
//         <div className="col-12">
//           <Header
//             showModal={handleShow}
//             setCurrentProject={setCurrentProj}
//             projects={allProjects}
//             setProjects={setAllProjects}
//             setTasks={setTasks}
//             setFilteredTasks={setFilteredTasks}
//           />
//         </div>
//       </div>

//       <Modal size="lg" show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <div className="ml-1">
//             {/* <div className="col"> */}
//             <Modal.Title>Create issue</Modal.Title>
//             {/* </div>
//                         <div className="row col">
//                             <Button variant="light">Import issues</Button>
//                             {/* will need to create a drop down
//                             <Button variant="light">Configure fields</Button>
//                         </div> */}
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//           <NewTask
//             closeModal={handleClose}
//             currentProject={currentProj}
//             setCurrentProject={setCurrentProj}
//             projects={allProjects}
//             users={allUsers}
//             // setTasks={setTasks}
//             // onSubmit={(f) => setSubmitFunction(f)}
//           />
//         </Modal.Body>
//         {/* <Modal.Footer>
//                     <Button variant="primary" onClick={submitFunction}>
//                         Create
//                     </Button>
//                 </Modal.Footer> */}
//       </Modal>
//       <div className={styles.main}>
//         <Sidebar
//           tasks={tasks}
//           setTasks={setTasks}
//           filteredTasks={filteredTasks}
//           setFilteredTasks={setFilteredTasks}
//           setCurrentView={setCurrentView}
//           currentProj={currentProj}
//           allProjects={allProjects}
//           setCurrentProj={setCurrentProj}
//           setAllProjects={setAllProjects}
//         />
//         {currentView === "tasks" ? (
//           <TaskParent
//             id={id}
//             task={task}
//             filteredTasks={filteredTasks}
//             setFilteredTasks={setFilteredTasks}
//             currentProject={currentProj}
//             allUsers={allUsers}
//           />
//         ) : (
//           <ProjectSettings
//             currentProj={currentProj}
//             setCurrentView={setCurrentView}
//             setCurrentProj={setCurrentProj}
//             allProjects={allProjects}
//             setAllProjects={setAllProjects}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// New Code

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewTask from "../components/NewTask";
import TaskParent from "../components/TaskParent";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import ProjectSettings from "../components/ProjectSettings";
import io from "socket.io-client";
import styles from "../components/main.module.css";

export default function Main() {
  const [show, setShow] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [allProjects, setAllProjects] = useState(null);
  const [currentProj, setCurrentProj] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentView, setCurrentView] = useState("tasks");
  const [socket] = useState(() => io(":8000"));
  const [task, setTask] = useState(null);

  const navigate = useNavigate(); // replaces @reach/router navigate
  const { id } = useParams(); // get URL param if exists

  useEffect(() => {
    // Make sure a user is logged in
    if (!localStorage.getItem("userID")) {
      navigate("/login");
      return;
    }

    Axios.get(
      "http://localhost:8000/api/projects/user/" +
        localStorage.getItem("userID"),
      { withCredentials: true }
    ).then((res) => {
      // Prevent crash if no projects
      if (res.data.length === 0) {
        navigate("/welcome");
        return;
      }
      setAllProjects(res.data);
      setCurrentProj(res.data[0]);
      setFilteredTasks(res.data[0].tasks);
      setTasks(res.data[0].tasks);
    });

    Axios.get("http://localhost:8000/api/users", {
      withCredentials: true,
    }).then((users) => setAllUsers(users.data));

    if (id) {
      Axios.get("http://localhost:8000/api/tasks/" + id, {
        withCredentials: true,
      })
        .then((res) => setTask(res.data))
        .catch(console.log);
    }

    socket.on("new task added", (newTask) => {
      setTasks((prevIssues) => [...prevIssues, newTask]);
    });

    return () => socket.disconnect(true);
  }, [socket, id, navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (allProjects == null) return <p>Loading...</p>;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Header
            showModal={handleShow}
            setCurrentProject={setCurrentProj}
            projects={allProjects}
            setProjects={setAllProjects}
            setTasks={setTasks}
            setFilteredTasks={setFilteredTasks}
          />
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="ml-1">
            <Modal.Title>Create issue</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <NewTask
            closeModal={handleClose}
            currentProject={currentProj}
            setCurrentProject={setCurrentProj}
            projects={allProjects}
            users={allUsers}
          />
        </Modal.Body>
      </Modal>

      <div className={styles.main}>
        <Sidebar
          tasks={tasks}
          setTasks={setTasks}
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
          setCurrentView={setCurrentView}
          currentProj={currentProj}
          allProjects={allProjects}
          setCurrentProj={setCurrentProj}
          setAllProjects={setAllProjects}
        />
        {currentView === "tasks" ? (
          <TaskParent
            id={id}
            task={task}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            currentProject={currentProj}
            allUsers={allUsers}
          />
        ) : (
          <ProjectSettings
            currentProj={currentProj}
            setCurrentView={setCurrentView}
            setCurrentProj={setCurrentProj}
            allProjects={allProjects}
            setAllProjects={setAllProjects}
          />
        )}
      </div>
    </>
  );
}
