import { useState } from "react";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

function Column({ id, title, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        textAlign: "center",
        backgroundColor: isOver ? "#e0f7fa" : "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        minHeight: "300px",
      }}
    >
      <h2 style={{ marginBottom: "12px", fontSize: "18px" }}>{title}</h2>
      {children}
    </div>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", text: "Learn React" },
      { id: "2", text: "Build Todo App" },
    ],
    inProgress: [],
    completed: [],
  });

  // ✅ Add new task into "todo" column
  const handleAddTask = (text) => {
    const newTask = { id: Date.now().toString(), text };
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;

    const fromColumn = Object.keys(tasks).find((col) =>
      tasks[col].some((t) => t.id === active.id)
    );
    const toColumn = over.id;

    if (fromColumn !== toColumn) {
      const movingTask = tasks[fromColumn].find((t) => t.id === active.id);

      setTasks((prev) => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter((t) => t.id !== active.id),
        [toColumn]: [...prev[toColumn], movingTask],
      }));
    }
  };

  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        margin: "20px auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "1200px",
      }}
    >
      {/* ✅ Input at the top */}
      <TodoInput onAdd={handleAddTask} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          <Column id="todo" title="📝 Todo">
            {tasks.todo.map((task) => (
              <TodoItem key={task.id} todo={task} />
            ))}
          </Column>

          <Column id="inProgress" title="🚧 In Progress">
            {tasks.inProgress.map((task) => (
              <TodoItem key={task.id} todo={task} />
            ))}
          </Column>

          <Column id="completed" title="✅ Completed">
            {tasks.completed.map((task) => (
              <TodoItem key={task.id} todo={task} />
            ))}
          </Column>
        </div>
      </DndContext>
    </div>
  );
}
