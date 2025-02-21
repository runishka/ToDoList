import { useState, useEffect } from "react";
import { showToastWithUndo } from "../components/utils/toast.jsx";

export function useTodos() {
    const [tasks, setTasks] = useState([]);
    const [undoStack, setUndoStack] = useState([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskText) => {
        const newTaskObj = { 
            id: Date.now(), 
            text: taskText.trim(), 
            completed: false 
        };
        setTasks([...tasks, newTaskObj]);
        showToastWithUndo('Task added!', null, 'success');
    };

    const deleteTask = (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        setTasks(tasks.filter(task => task.id !== taskId));
        
        const undoAction = {
            type: 'DELETE',
            task: taskToDelete,
            index: taskIndex,
            timestamp: Date.now()
        };
        setUndoStack([...undoStack, undoAction]);

        showToastWithUndo(
            'Task deleted',
            () => handleUndo(undoAction)
        );
    };

    const toggleComplete = (taskId) => {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        const previousState = tasks[taskIndex].completed;

        setTasks(tasks.map(task =>
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));

        const undoAction = {
            type: 'TOGGLE',
            taskId,
            previousState,
            timestamp: Date.now()
        };
        setUndoStack([...undoStack, undoAction]);

        showToastWithUndo(
            `Task ${previousState ? 'uncompleted' : 'completed'}`,
            () => handleUndo(undoAction)
        );
    };

    const handleUndo = (action) => {
        if (Date.now() - action.timestamp > 5000) {
            showToastWithUndo('Undo time expired', null, 'error');
            return;
        }

        if (action.type === 'DELETE') {
            setTasks(prevTasks => {
                const newTasks = [...prevTasks];
                newTasks.splice(action.index, 0, action.task);
                return newTasks;
            });
            showToastWithUndo('Task restored', null, 'success');
        } 
        else if (action.type === 'TOGGLE') {
            setTasks(tasks.map(task =>
                task.id === action.taskId 
                    ? { ...task, completed: action.previousState }
                    : task
            ));
            showToastWithUndo('Task status restored', null, 'success');
        }

        setUndoStack(undoStack.filter(item => item !== action));
    };

    return {
        tasks,
        addTask,
        deleteTask,
        toggleComplete
    };
}