// import React, { useState, useEffect } from "react";
// import styles from "./issues.module.css";
// import io from "socket.io-client";
// import { Dropdown, ButtonGroup } from "react-bootstrap";
// import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
// import { navigate } from "@reach/router";

// // import { useDispatch} from 'react-redux';

// export default function Issues({ filteredTasks, setTaskNumber, id, task }) {
//   const [issues, setIssues] = useState(null);
//   const [highlighted, setHighlighted] = useState(null);
//   const [socket] = useState(() => io(":8000"));

//   // const dispatch = useDispatch();

//   const handleClick = (issue) => {
//     setHighlighted(issue.number);
//     setTaskNumber(issue._id);
//     navigate("/home/geer/" + issue._id);
//     // dispatch({
//     //     type: 'TASK_NUMBER',
//     //     task: {
//     //         number: issueNum,
//     //     },
//     // });
//   };

//   useEffect(() => {
//     if (task) {
//       setHighlighted(task.number);
//     }
//   }, [task]);

//   useEffect(() => {
//     setIssues(filteredTasks);
//   }, [filteredTasks]);

//   useEffect(() => {
//     socket.on("new task added", (newTask) => {
//       setIssues((prevIssues) => {
//         return [...prevIssues, newTask];
//       });
//     });

//     return () => socket.disconnect(true);
//   }, [socket]);

//   if (issues === null) return "Loading...";

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

//   const sort = (field) => {
//     function merge(left, right) {
//       let result = [];
//       let i = 0;
//       let j = 0;
//       while (i < left.length && j < right.length) {
//         if (left[i][field] < right[j][field]) {
//           result.push(left[i]);
//           i++;
//         } else {
//           result.push(right[j]);
//           j++;
//         }
//       }
//       while (i < left.length) {
//         result.push(left[i]);
//         i++;
//       }
//       while (j < right.length) {
//         result.push(right[j]);
//         j++;
//       }
//       return result;
//     }

//     function mergeSort(dataset) {
//       if (dataset.length < 2) {
//         return dataset;
//       } else {
//         let middle = Math.floor(dataset.length / 2);
//         let left = mergeSort(dataset.slice(0, middle));
//         let right = mergeSort(dataset.slice(middle, dataset.length));
//         return merge(left, right);
//       }
//     }
//     setIssues(mergeSort(issues));
//   };

//   return (
//     <div className={styles.panel}>
//       <DropdownPersist as={ButtonGroup}>
//         <DropdownToggle
//           style={{ backgroundColor: "transparent", border: "none" }}
//         >
//           <span style={{ color: "black" }}>Sort by</span>
//         </DropdownToggle>
//         <Dropdown.Menu>
//           <Dropdown.Item onSelect={() => sort("createdAt")}>
//             Created
//           </Dropdown.Item>
//           <Dropdown.Item onSelect={() => sort("priority")}>
//             Priority
//           </Dropdown.Item>
//           <Dropdown.Item onSelect={() => sort("status")}>Status</Dropdown.Item>
//         </Dropdown.Menu>
//       </DropdownPersist>
//       <div className={styles.issueGroup}>
//         {issues.map((issue) => {
//           return (
//             <div
//               key={issue._id}
//               className={
//                 issue.number === highlighted
//                   ? `${styles.selected} ${styles.issue}`
//                   : `${styles.notSelected} ${styles.issue}`
//               }
//               onClick={() => handleClick(issue)}
//             >
//               <span>{issue.name}</span>
//               <br />
//               <span className={styles.issueNumber}>
//                 <img
//                   className={styles.checkbox}
//                   src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png"
//                   alt="check"
//                 />
//                 GEER-{issue.number}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//       <div className={styles.bottom}>
//         <span className={styles.bottomText}>
//           {highlighted !== null
//             ? `issue ${highlighted} of ${issues.length}`
//             : " "}
//         </span>
//       </div>
//     </div>
//   );
// }

// New Code

import React, { useState, useEffect } from "react";
import styles from "./issues.module.css";
import io from "socket.io-client";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useNavigate } from "react-router-dom";

export default function Issues({ filteredTasks, setTaskNumber, id, task }) {
  const [issues, setIssues] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const [socket] = useState(() => io(":8000"));
  const navigate = useNavigate();

  const handleClick = (issue) => {
    setHighlighted(issue.number);
    setTaskNumber(issue._id);
    navigate(`/home/geer/${issue._id}`);
  };

  useEffect(() => {
    if (task) {
      setHighlighted(task.number);
    }
  }, [task]);

  useEffect(() => {
    setIssues(filteredTasks);
  }, [filteredTasks]);

  useEffect(() => {
    socket.on("new task added", (newTask) => {
      setIssues((prevIssues) => [...prevIssues, newTask]);
    });

    return () => socket.disconnect(true);
  }, [socket]);

  if (issues === null) return "Loading...";

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

  const sort = (field) => {
    function merge(left, right) {
      let result = [];
      let i = 0;
      let j = 0;
      while (i < left.length && j < right.length) {
        if (left[i][field] < right[j][field]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      return [...result, ...left.slice(i), ...right.slice(j)];
    }

    function mergeSort(dataset) {
      if (dataset.length < 2) return dataset;
      let middle = Math.floor(dataset.length / 2);
      let left = mergeSort(dataset.slice(0, middle));
      let right = mergeSort(dataset.slice(middle));
      return merge(left, right);
    }

    setIssues(mergeSort(issues));
  };

  return (
    <div className={styles.panel}>
      <DropdownPersist as={ButtonGroup}>
        <DropdownToggle
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <span style={{ color: "black" }}>Sort by</span>
        </DropdownToggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => sort("createdAt")}>
            Created
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => sort("priority")}>
            Priority
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => sort("status")}>Status</Dropdown.Item>
        </Dropdown.Menu>
      </DropdownPersist>

      <div className={styles.issueGroup}>
        {issues.map((issue) => (
          <div
            key={issue._id}
            className={
              issue.number === highlighted
                ? `${styles.selected} ${styles.issue}`
                : `${styles.notSelected} ${styles.issue}`
            }
            onClick={() => handleClick(issue)}
          >
            <span>{issue.name}</span>
            <br />
            <span className={styles.issueNumber}>
              <img
                className={styles.checkbox}
                src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png"
                alt="check"
              />
              GEER-{issue.number}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span className={styles.bottomText}>
          {highlighted !== null
            ? `issue ${highlighted} of ${issues.length}`
            : " "}
        </span>
      </div>
    </div>
  );
}
