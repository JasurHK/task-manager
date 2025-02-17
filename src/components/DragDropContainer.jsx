import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
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

  // Handle the drag event when a task is moved
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // Task dropped outside the board

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return; // Task hasn't moved
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task.id === draggableId);
    
    // Update task status when moved between columns
    movedTask.status = destination.droppableId;

    // Reorder the tasks in the original column and the new column
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

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

  return (
    <div className="board">
      <h2>Task Board</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns">
          <Droppable droppableId="To Do">
            {(provided) => (
              <Column
                title="To Do"
                tasks={tasks.filter((task) => task.status === "To Do")}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onAddTask={() => setFormVisible(true)}
                provided={provided}
              />
            )}
          </Droppable>
          
          <Droppable droppableId="In Progress">
            {(provided) => (
              <Column
                title="In Progress"
                tasks={tasks.filter((task) => task.status === "In Progress")}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onAddTask={() => setFormVisible(true)}
                provided={provided}
              />
            )}
          </Droppable>
          
          <Droppable droppableId="Done">
            {(provided) => (
              <Column
                title="Done"
                tasks={tasks.filter((task) => task.status === "Done")}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onAddTask={() => setFormVisible(true)}
                provided={provided}
              />
            )}
          </Droppable>
        </div>
      </DragDropContext>

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
