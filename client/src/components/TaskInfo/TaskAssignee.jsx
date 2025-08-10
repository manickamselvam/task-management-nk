import React, { useState } from "react";
import axios from "axios";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import styles from "./task.module.css";

export default function TaskAssignee({ currentTask, allUsers }) {
  const [assignee, setAssignee] = useState(
    currentTask.assignee ? currentTask.assignee : "Unassigned"
  );

  const handleChange = async (value) => {
    setAssignee(value);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${currentTask._id}`,
        { assignee: value === "Unassigned" ? null : value },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating assignee:", error);
    }
  };

  if (assignee === undefined) return "Loading...";

  return (
    <div className={styles.dropdown}>
      <h5 className="mb-2 font-semibold text-gray-800">Assignee</h5>
      <Select.Root value={assignee} onValueChange={handleChange}>
        <Select.Trigger className="flex items-center justify-between px-3 py-2 border rounded-lg shadow-sm bg-white text-sm w-52">
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon size={16} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <Select.Viewport className="p-1">
              <Select.Item
                value="Unassigned"
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <Select.ItemText>Unassigned</Select.ItemText>
                {assignee === "Unassigned" && <CheckIcon size={14} />}
              </Select.Item>

              {allUsers.map((user) => (
                <Select.Item
                  key={user._id}
                  value={user._id}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <Select.ItemText>{user.name}</Select.ItemText>
                  {assignee === user._id && <CheckIcon size={14} />}
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
