import React, { useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline';
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("all"); // all, active, completed
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, active: true }]);
    setInput("");
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, active: !task.active } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDeleteAllCompleted = () => {
    setTasks(tasks.filter((task) => task.active));
  };

  const filteredTasks = tasks.filter((task) => {
    if (tab === "active") return task.active;
    if (tab === "completed") return !task.active;
    return true;
  });

  return (
    <div className="container">
      <h1 className="title">#todo</h1>

      {/* Tabs */}
      <div className="tabs">
        {["all", "active", "completed"].map((t) => (
          <button
            key={t}
            className={`tab-button ${tab === t ? "active-tab" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Add Task Form */}
      {tab !== "completed" && (
        <div className="form">
          <input
            className="input"
            placeholder="add details"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>
      )}

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={!task.active}
                onChange={() => handleToggle(task.id)}
              />
              <span className={task.active ? "" : "completed-task"}>
                {task.text}
              </span>
            </label>
            {tab === "completed" && (
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                <TrashIcon width={20}/>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Delete All Completed */}
      {tab === "completed" && filteredTasks.length > 0 && (
        <button
          className="delete-all-button"
          onClick={handleDeleteAllCompleted}
        >
          <TrashIcon width={15}/> Delete all
        </button>
      )}
    </div>
  );
}
