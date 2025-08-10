import React, { useState } from "react";
import axios from "axios";
import Select from "react-dropdown-select";

export default function TaskLabels({ currentTask }) {
  const [labels, setLabels] = useState(currentTask.labels);
  // const [allLabels, setAllLabels] = useState(currentTask.labels);

  // useEffect(() => {
  //     axios
  //         .get('http://localhost:8000/api/tasks/', { withCredentials: true })
  //         .then((res) => {
  //             console.log(res.data);
  //             for (const task in res.data) {
  //                 console.log(task);
  //                 if (task.labels.length > 0) {
  //                     console.log(task.labels);
  //                     // for (const label in task.labels) {
  //                     //     setAllLabels([...allLabels, label]);
  //                     // }
  //                 }
  //             }
  //         })
  //         .catch(console.log);
  // }, []);

  const handleChange = (value) => {
    if (labels === undefined) {
      setLabels([value[0]["value"]]);
    } else {
      setLabels([...labels, value[0]["value"]]);
    }

    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask.number}`,
        { labels: value[0]["value"] },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
  };

  if (labels === undefined) return "Loading...";

  return (
    <div>
      <Select
        options={labels}
        onChange={(values) => handleChange(values)}
        multi={true}
        clearable={true}
        searchable={true}
        dropdownHandle={false}
        // labelField="value"
        create={true}
        values={[labels.find((label) => label === currentTask.labels)]}
      />
    </div>
  );
}
