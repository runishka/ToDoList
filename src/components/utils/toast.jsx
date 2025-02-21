import React from 'react';
import toast from 'react-hot-toast';
import './toast.css';

export const showToastWithUndo = (message, undoAction = null, type = 'default') => {
    if (type === 'error') {
        return toast.error(message);
    }

    if (type === 'success') {
        return toast.success(message);
    }

    if (undoAction) {
        return toast((t) => (
            <div className="toast-content">
                <span>{message}</span>
                <button 
                    onClick={() => {
                        undoAction();
                        toast.dismiss(t.id);
                    }}
                    className="toast-button"
                >
                    Undo
                </button>
            </div>
        ), { duration: 5000 });
    }

    return toast(message);
}; 