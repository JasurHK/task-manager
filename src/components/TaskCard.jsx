import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import "./TaskCard.css";

const TaskCard = ({ task, onEdit, onDelete, status }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, status: status }, // Pass task id and status
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="task-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="task-card-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="task-card-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
