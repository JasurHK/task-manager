import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSave, onCancel, task }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="task-form">
      <h3>{task ? "Edit Task" : "New Task"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="task-form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
