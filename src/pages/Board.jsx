import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import { ItemTypes } from "../utils/ItepTypes";  // You'll define this in a separate file
import "./Board.css";

const Board = () => {
  const initialTasks = [
    { id: "1", title: "Task 1", description: "Task description", status: "To Do" },
    { id: "2", title: "Task 2", description: "Task description", status: "In Progress" },
    { id: "3", title: "Task 3", description: "Task description", status: "Done" }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: `${tasks.length + 1}`, status: "To Do" }]);
    setFormVisible(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setActiveTask(task);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setActiveTask(null);
    setFormVisible(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === activeTask.id ? { ...task, ...updatedTask } : task)));
    setActiveTask(null);
    setFormVisible(false);
  };

  // Drag-and-drop hook to handle task dropping
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item, monitor) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDrop = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };
  

  return (
    <div className="board">
      <h2>Task Board</h2>
      <div className="columns" ref={drop}>
        <Column
          title="To Do"
          tasks={tasks.filter((task) => task.status === "To Do")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onAddTask={() => setFormVisible(true)}
          status="To Do"
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "In Progress")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onAddTask={() => setFormVisible(false)}
          status="In Progress"
        />
        <Column
          title="Done"
          tasks={tasks.filter((task) => task.status === "Done")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onAddTask={() => setFormVisible(false)}
          status="Done"
        />
      </div>
      {isFormVisible && (
        <TaskForm
          onSave={activeTask ? handleUpdateTask : handleAddTask}
          onCancel={handleCancel}
          task={activeTask}
        />
      )}
    </div>
  );
};

export default Board;
