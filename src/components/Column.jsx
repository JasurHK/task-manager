import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { ItemTypes } from "../utils/ItemTypes";
import "./Column.css";

const Column = ({ title, tasks, onEdit, onDelete, status, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    // drop: (item) => onDrop(item, status), // Pass the correct status here
    drop: (item) => {
      console.log('Item dropped:', item);  // This will confirm if the drop event fires
      onDrop(item, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`column ${isOver ? "highlight" : ""}`}>
      <h3>{title}</h3>
      <div className="task-cards">
        {tasks.length === 0 ? <p>No tasks</p> : tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Column;