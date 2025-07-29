import { useState } from "react";
import "./App.css";
import JiraKanbanBoard from "./pages/JiraKanbanBoard";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <JiraKanbanBoard /> */}
      <Register />
    </>
  );
}

export default App;
