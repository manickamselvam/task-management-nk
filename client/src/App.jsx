import { useState } from "react";
import "./App.css";
import JiraKanbanBoard from "./pages/JiraKanbanBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <JiraKanbanBoard />
    </>
  );
}

export default App;
