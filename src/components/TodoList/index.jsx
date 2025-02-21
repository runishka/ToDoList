import React from 'react';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import { useTodos } from '../../hooks/useTodos';
import './TodoList.css';

export default function TodoList() {
    const { 
        tasks,
        addTask,
        deleteTask,
        toggleComplete
    } = useTodos();

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <TodoForm onAdd={addTask} />
            
            <ol className="task-list">
                {!tasks.length && <li className="empty-state">No tasks yet! Add one above</li>}
                
                {tasks.map((task, index) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        index={index}
                        onDelete={deleteTask}
                        onToggle={toggleComplete}
                    />
                ))}
            </ol>
        </div>
    );
}