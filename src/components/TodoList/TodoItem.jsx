import React from "react";

export function TodoItem({ task, index, onDelete, onToggle }) {
    return (
        <li className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-content">
                <span className="task-number">{index + 1}.</span>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <span className="task-text">{task.text}</span>
            </div>
            <button 
                onClick={() => onDelete(task.id)}
                className="delete-button"
            >
                Delete
            </button>
        </li>
    );
}