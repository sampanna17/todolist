import React, { useState } from "react";
import { MdDelete, MdMargin } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./App.css";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    return (
        <div className="App">
            <div className="todo-head">
                <h1>My ToDos</h1>
            </div>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type="text" placeholder="Task Title" />
                    </div>
                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" placeholder="Description" />
                    </div>
                    <div className="todo-input-item">
                        <button type="buttton" className="primaryBtn">
                            Add
                        </button>
                    </div>
                </div>

                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list">
                    <div className="todo-list-item">
                        <div className="list-item">
                            <h3>Task-1</h3>
                            <p>Description-1</p>
                        </div>

                        <div>
                            <MdDelete className="icon" />
                            <FaCheck className="check-icon" />
                            <FaEdit className="edit-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
