import { useDraggable } from "@dnd-kit/core";

export default function TodoItem({ todo }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "#fff",
    cursor: "grab",
    width: "90%",
    textAlign: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {todo.text}
    </div>
  );
}
