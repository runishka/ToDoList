import React from 'react';
import { Toaster } from 'react-hot-toast';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    return (
        <div className="App">
            <TodoList />
            <Toaster position="bottom-right" />
        </div>
    );
}

export default App;