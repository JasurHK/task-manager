import React, { useState, useEffect } from "react"; 
import { useDrag, useDrop } from "react-dnd";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage";
import "./Board.css";

const DragAndDropContainer = () => {
  const [tasks, setTasks] = useState(() =>
    loadFromLocalStorage("tasks", [
      { id: "1", title: "Task 1", description: "Task description", status: "To Do" },
      { id: "2", title: "Task 2", description: "Task description", status: "In Progress" },
      { id: "3", title: "Task 3", description: "Task description", status: "Done" }
    ])
  );

  useEffect(() => {
    saveToLocalStorage("tasks", tasks);
  }, [tasks]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  // Dragging task logic
  const moveTask = (taskId, status) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      return updatedTasks;
    });
  };

  // Column and task drag-and-drop hooks
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item, monitor) => {
      moveTask(item.id, monitor.getItem().status);
    },
  });

  const renderTask = (task, index) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task.id, status: task.status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className={`task-card ${isDragging ? "dragging" : ""}`}
      >
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <button onClick={() => setActiveTask(task)}>Edit</button>
        <button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="board">
      <h2>Task Board</h2>
      <div className="columns" ref={drop}>
        {["To Do", "In Progress", "Done"].map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);
          return (
            <div key={status} className="column">
              <Column title={status}>
                {filteredTasks.map((task, index) => renderTask(task, index))}
              </Column>
            </div>
          );
        })}
      </div>

      <button className="add-task-btn" onClick={() => setFormVisible(true)}>
        + Add Task
      </button>

      {isFormVisible && (
        <TaskForm
          onSave={(newTask) => setTasks([...tasks, { ...newTask, id: `${tasks.length + 1}`, status: "To Do" }])}
          onCancel={() => setFormVisible(false)}
          task={activeTask}
        />
      )}
    </div>
  );
};

export default DragAndDropContainer;