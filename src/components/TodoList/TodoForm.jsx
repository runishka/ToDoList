import React, { useState } from 'react';

export function TodoForm({ onAdd }) {
    const [newTask, setNewTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAdd(newTask);
            setNewTask("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input-section">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button type="submit">Add</button>
        </form>
    );
}