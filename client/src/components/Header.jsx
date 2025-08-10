// import React, { useState, useEffect } from "react";
// import styles from "./header.module.css";
// import {
//   Dropdown,
//   ButtonGroup,
//   NavDropdown,
//   FormControl,
// } from "react-bootstrap";
// import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
// import Axios from "axios";
// // import { navigate } from "@reach/router";
// import { useNavigate } from "react-router-dom";

// export default function Header(props) {
//   const {
//     projects,
//     setProjects,
//     setCurrentProject,
//     setTasks,
//     setFilteredTasks,
//   } = props;

//   //Function to handle when a project is selected in the dropdown menu
//   function selectProject(project) {
//     setCurrentProject(project);
//     //Do a new request to get the new tasks in case they have been updated
//     Axios.get("http://localhost:8000/api/projects/" + project._id).then(
//       (res) => {
//         setTasks(res.data.tasks);
//         setFilteredTasks(res.data.tasks);
//       }
//     );
//   }

//   //Function to create a new project
//   function createProject() {
//     //Get value from projectName component
//     const name = document.getElementById("projectName").value;

//     Axios.post(
//       "http://localhost:8000/api/projects",
//       { name, users: [localStorage.getItem("userID")] },
//       { withCredentials: true }
//     )
//       .then((res) => {
//         const updatedProjects = [...projects, res.data.project];
//         setProjects(updatedProjects);
//       })
//       .catch((err) => console.log(err));
//   }

//   //Sign out function
//   function signOut() {
//     localStorage.clear();
//     navigate("/login");
//     // Axios.delete('http://localhost:8000/api/logout').then((res) => {
//     //     console.log('Successfully logged out');
//     //     localStorage.clear();
//     //     navigate('/login');
//     // });
//   }

//   useEffect(() => {
//     //Load projects

//     Axios.get(
//       "http://localhost:8000/api/projects/user/" +
//         localStorage.getItem("userID"),
//       { withCredentials: true }
//     ).then((projects) => {
//       setProjects(projects.data);
//     });
//   }, [setProjects]);

//   //Component wrapper on Bootstrap Dropdown to make sure dropdown menu doesn't close after selecting something
//   const DropdownPersist = (props) => {
//     const [open, setOpen] = useState(false);
//     const onToggle = (isOpen, ev, metadata) => {
//       if (metadata.source === "select" || metadata.source === "change") {
//         setOpen(true);
//         return;
//       }
//       setOpen(isOpen);
//     };
//     return <Dropdown show={open} onToggle={onToggle} {...props}></Dropdown>;
//   };

//   return (
//     <div className={styles.header}>
//       <div>
//         <img
//           className={styles.logo}
//           src="https://cdn.dribbble.com/users/317366/screenshots/3696949/dribbble-icecream.png"
//           alt="logo"
//         />
//         <span className={styles.brandName}>Geera Software</span>
//         <span className={styles.headerLinks}>Your Work</span>
//         <DropdownPersist as={ButtonGroup}>
//           <DropdownToggle
//             style={{
//               backgroundColor: "transparent",
//               border: "none",
//             }}
//           >
//             <span className={styles.headerLinks}>Projects</span>
//           </DropdownToggle>
//           <Dropdown.Menu>
//             {projects &&
//               projects.map((project) => (
//                 <Dropdown.Item
//                   key={project._id}
//                   onSelect={() => selectProject(project, project._id)}
//                 >
//                   {project.name}
//                 </Dropdown.Item>
//               ))}
//             <Dropdown.Divider />
//             <Dropdown.Item onSelect={createProject}>
//               + Create New Project
//             </Dropdown.Item>
//             <FormControl
//               id="projectName"
//               type="text"
//               placeholder="New project name"
//             />
//           </Dropdown.Menu>
//         </DropdownPersist>
//         <span className={styles.headerLinks}>Filters</span>
//         <button className={styles.createButton} onClick={props.showModal}>
//           Create
//         </button>
//       </div>

//       <NavDropdown
//         title={
//           <div className={styles.logoDiv}>
//             <img
//               className={styles.userLogo}
//               src="https://www.underconsideration.com/brandnew/archives/boundless_logo_detail.png"
//               alt="user"
//             />
//             <span className={styles.userProfileText}>
//               Your profile and settings
//             </span>
//           </div>
//         }
//         id="nav-dropdown"
//       >
//         <NavDropdown.ItemText>
//           {localStorage.getItem("userName")}
//         </NavDropdown.ItemText>
//         <NavDropdown.Divider />
//         <NavDropdown.Item onSelect={signOut}>Sign Out</NavDropdown.Item>
//       </NavDropdown>
//     </div>
//   );
// }

//  New code

import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import {
  Dropdown,
  ButtonGroup,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const {
    projects,
    setProjects,
    setCurrentProject,
    setTasks,
    setFilteredTasks,
  } = props;

  const navigate = useNavigate(); // ✅ initialize navigate hook

  //Function to handle when a project is selected in the dropdown menu
  function selectProject(project) {
    setCurrentProject(project);
    Axios.get("http://localhost:8000/api/projects/" + project._id).then(
      (res) => {
        setTasks(res.data.tasks);
        setFilteredTasks(res.data.tasks);
      }
    );
  }

  //Function to create a new project
  function createProject() {
    const name = document.getElementById("projectName").value;

    Axios.post(
      "http://localhost:8000/api/projects",
      { name, users: [localStorage.getItem("userID")] },
      { withCredentials: true }
    )
      .then((res) => {
        const updatedProjects = [...projects, res.data.project];
        setProjects(updatedProjects);
      })
      .catch((err) => console.log(err));
  }

  //Sign out function
  function signOut() {
    localStorage.clear();
    navigate("/login"); // ✅ useNavigate replaces navigate()
  }

  useEffect(() => {
    Axios.get(
      "http://localhost:8000/api/projects/user/" +
        localStorage.getItem("userID"),
      { withCredentials: true }
    ).then((projects) => {
      setProjects(projects.data);
    });
  }, [setProjects]);

  const DropdownPersist = (props) => {
    const [open, setOpen] = useState(false);
    const onToggle = (isOpen, ev, metadata) => {
      if (metadata.source === "select" || metadata.source === "change") {
        setOpen(true);
        return;
      }
      setOpen(isOpen);
    };
    return <Dropdown show={open} onToggle={onToggle} {...props}></Dropdown>;
  };

  return (
    <div className={styles.header}>
      <div>
        <img
          className={styles.logo}
          src="https://cdn.dribbble.com/users/317366/screenshots/3696949/dribbble-icecream.png"
          alt="logo"
        />
        <span className={styles.brandName}>Geera Software</span>
        <span className={styles.headerLinks}>Your Work</span>
        <DropdownPersist as={ButtonGroup}>
          <DropdownToggle
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <span className={styles.headerLinks}>Projects</span>
          </DropdownToggle>
          <Dropdown.Menu>
            {projects &&
              projects.map((project) => (
                <Dropdown.Item
                  key={project._id}
                  onSelect={() => selectProject(project, project._id)}
                >
                  {project.name}
                </Dropdown.Item>
              ))}
            <Dropdown.Divider />
            <Dropdown.Item onSelect={createProject}>
              + Create New Project
            </Dropdown.Item>
            <FormControl
              id="projectName"
              type="text"
              placeholder="New project name"
            />
          </Dropdown.Menu>
        </DropdownPersist>
        <span className={styles.headerLinks}>Filters</span>
        <button className={styles.createButton} onClick={props.showModal}>
          Create
        </button>
      </div>

      <NavDropdown
        title={
          <div className={styles.logoDiv}>
            <img
              className={styles.userLogo}
              src="https://www.underconsideration.com/brandnew/archives/boundless_logo_detail.png"
              alt="user"
            />
            <span className={styles.userProfileText}>
              Your profile and settings
            </span>
          </div>
        }
        id="nav-dropdown"
      >
        <NavDropdown.ItemText>
          {localStorage.getItem("userName")}
        </NavDropdown.ItemText>
        <NavDropdown.Divider />
        <NavDropdown.Item onSelect={signOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
