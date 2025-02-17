import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import "./Column.css";

const Column = ({ title, tasks, onMoveTask, onEdit, onDelete, onAddTask, status }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      onMoveTask(item.id, status);
    },
  });

  return (
    <div ref={drop} className="column">
      <h3>{title}</h3>
      <div className="task-cards">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      <button className="add-task-btn" onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
};

export default Column;
