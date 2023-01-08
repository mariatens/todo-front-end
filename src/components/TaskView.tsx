import axios from "axios";
import { ITask } from "../App";


interface TaskViewProps{
    editedTask:string;
    task:ITask;
    setEditedTask: React.Dispatch<React.SetStateAction<string>>;
    contentEditable: boolean;
    fetchTasks: () => Promise<void>;
    setContentEditable: React.Dispatch<React.SetStateAction<boolean>>;
    fetchCompletedTasks: () => Promise<void>;
    handleSubmitEdit: (task: ITask) => Promise<void>;
}

export function TaskView({setEditedTask, handleSubmitEdit, editedTask, task, contentEditable,fetchTasks,fetchCompletedTasks,setContentEditable}: TaskViewProps): JSX.Element{
    return (
<div className="task" key={task.id}>
                <div
                  className="task-txt"
                  id={String(task.id)}
                >
                  {task.task}
                </div>
                  {/* button to edit  */}
                  {contentEditable ? (
                    <>
                   <input
                   value={editedTask}
                   onChange={(e) => setEditedTask(e.target.value)}
                 /> 
                 <button onClick = {()=>handleSubmitEdit(task)}> Update</button></>) : 
                  <button
                  onClick={()=>setContentEditable(true)}
                >
                  ✍️</button>}
                    <div className="btn-ctn">
                  <small className="time"> {task.time.slice(0,10)}</small>
                  
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
              </div>)}
          