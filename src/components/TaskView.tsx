import axios from "axios";
import { useState } from "react";
import { ITask } from "../App";

interface TaskViewProps {
  editedTask: string;
  task: ITask;
  setEditedTask: React.Dispatch<React.SetStateAction<string>>;
  fetchTasks: () => Promise<void>;
  fetchCompletedTasks: () => Promise<void>;
}

export function TaskView({
  setEditedTask,
  editedTask,
  task,
  fetchTasks,
  fetchCompletedTasks,
}: TaskViewProps): JSX.Element {
  const [contentEditable, setContentEditable] = useState(false);
  const handleSubmitEdit = async (task: ITask) => {
    setContentEditable(false);
    await axios.patch(
      `https://mariatens-todo-sql-backend.onrender.com/tasks/${task.id}`,
      { task: editedTask }
    );
    await fetchTasks();
    setEditedTask("")
  };
  return (
    <div className="task" key={task.id}>
      <div className="task-txt" id={String(task.id)}>
        {task.task}
      </div>
      {/* button to edit  */}
      {contentEditable ? (
        <>
          <input className = "edit-input"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button
            disabled = {editedTask === ""} 
            onClick={() => handleSubmitEdit(task)}> Update</button>
        </>
      ) : (
        <button onClick={() => setContentEditable(true)}>✍️</button>
      )}
      <div className="btn-ctn">
        <small className="time"> {task.time.slice(0, 10)}</small>

        {/* button to mark as complete*/}
        <button
          onClick={async () => {
            await axios.delete(
              `https://mariatens-todo-sql-backend.onrender.com/tasks/${task.id}`
            );
            await fetchTasks();
            await axios.post(
              "https://mariatens-todo-sql-backend.onrender.com/completed-tasks",
              {
                task: task.task,
                time: new Date().toISOString().substring(1, 10),
              }
            );

            await fetchCompletedTasks();
          }}
        >
          ✔️
        </button>
        {/* button to delete */}
        <button
          className="del-btn"
          onClick={async () => {
            await axios.delete(
              `https://mariatens-todo-sql-backend.onrender.com/tasks/${task.id}`
            );
            fetchTasks();
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
