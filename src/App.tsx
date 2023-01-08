import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { Input } from "./components/Input";
import { TaskView } from "./components/TaskView";

export interface ITask {
  task: string;
  id: number;
  time: string;
}
export type View = "TodoTasks" | "CompletedTasks";

function App(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editedTask, setEditedTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [contentEditable, setContentEditable] = useState(false);
  const [view, setView] = useState<View>("TodoTasks");

  const fetchTasks = async () => {
    const response = await fetch(
      "https://mariatens-todo-sql-backend.onrender.com/tasks"
    );
    const jsonBody = await response.json();
    setTasks(jsonBody);
  };
  useEffect(() => {
    fetchTasks();
  }, [completedTasks]);
  const fetchCompletedTasks = async () => {
    const response = await fetch(
      "https://mariatens-todo-sql-backend.onrender.com/completed-tasks"
    );
    const jsonBody = await response.json();
    setCompletedTasks(jsonBody);
  };
  useEffect(() => {
    fetchCompletedTasks();
  }, []);
  const handleToDoInput = (toDoInput: string) => {
    setInput(toDoInput);
  };
  const handleEnter = async () => {
    await axios.post("https://mariatens-todo-sql-backend.onrender.com/tasks", {
      task: input,
      time: new Date().toISOString().substring(1, 10),
    });
    await fetchTasks();
    setInput("");
  };
  const handleSubmitEdit = async (task: ITask) => {
    setContentEditable(false);
    await axios.patch(
        `https://mariatens-todo-sql-backend.onrender.com/tasks/${task.id}`,
      { task: editedTask })
    await fetchTasks();
    }

  if (view === "TodoTasks") {
    return (
      <>
        <NavBar setView={setView} />
        <Input
          handleEnter={handleEnter}
          handleToDoInput={handleToDoInput}
          input={input}
        />
        <div className="task-ctn">
          {/* saved todos */}
          {tasks &&
            tasks.map((task) => (
              <TaskView editedTask={editedTask} setEditedTask = {setEditedTask}setContentEditable={setContentEditable} handleSubmitEdit={handleSubmitEdit} key={task.id} contentEditable={contentEditable} fetchCompletedTasks={fetchCompletedTasks} fetchTasks={fetchTasks} task={task}/>))}
  </div></>)
  } else {
    return (
      <>
        <NavBar setView={setView} />
        <Input
          handleEnter={handleEnter}
          handleToDoInput={handleToDoInput}
          input={input}
        />
        <h2 className="title">Completed tasks</h2>
        <div className="task-ctn">
          {completedTasks.map((compTask) => (
            <div className="task" key={compTask.id}>
              <div>
                <s>{compTask.task}</s>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default App;
