import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import { ItemTypes } from "../utils/ItemTypes";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage";
import "./Board.css";

const Board = () => {
  const [tasks, setTasks] = useState(() =>
    loadFromLocalStorage("tasks", [
      { id: "1", title: "Task 1", description: "Task description", status: "To Do" },
      { id: "2", title: "Task 2", description: "Task description", status: "In Progress" },
      { id: "3", title: "Task 3", description: "Task description", status: "Done" },
    ])
  );

  useEffect(() => {
    saveToLocalStorage("tasks", tasks);
  }, [tasks]);

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

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === activeTask.id ? { ...task, ...updatedTask } : task)));
    setActiveTask(null);
    setFormVisible(false);
  };

  const handleDrop = (item, newStatus) => {
    console.log('Dropped Item:', item);
    console.log('New Status:', newStatus);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === item.id ? { ...task, status: newStatus } : task))
    );
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => handleDrop(item, item.status), // This should update the task's status
  });

  return (
    <div className="board" ref={drop}>
      <h2>Task Board</h2>
      <div className="columns">
        {["To Do", "In Progress", "Done"].map((status) => (
          <Column
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            status={status}
            onDrop={handleDrop}
          />
        ))}
      </div>
      <button className="add-task-btn" onClick={() => setFormVisible(true)}>
        + Add Task
      </button>
      {isFormVisible && (
        <TaskForm
          onSave={activeTask ? handleUpdateTask : handleAddTask}
          onCancel={() => setFormVisible(false)}
          task={activeTask}
        />
      )}
    </div>
  );
};

export default Board;