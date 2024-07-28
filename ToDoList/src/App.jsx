import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./App.css";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allToDos, setToDos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const handleAddToDo = ()=>{
        let newToDoItem = {
            title: newTitle,
            description: newDescription,
        };

        let updatedToDoArray = [...allToDos];
        updatedToDoArray.push(newToDoItem);
        setToDos(updatedToDoArray);
        localStorage.setItem('todolist',JSON.stringify(updatedToDoArray));

    };

    useEffect(()=>{
        let savedToDo = JSON.parse(localStorage.getItem('todolist'))
        if(savedToDo){
            setToDos(savedToDo);
        }
    },[])

    return (
        <div className="App">
            <div className="todo-head">
                <h1>My ToDos</h1>
            </div>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task Title" />
                    </div>
                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
                    </div>
                    <div className="todo-input-item">
                        <button type="buttton" onClick={handleAddToDo} className="primaryBtn">
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
                    {allToDos.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div className="list-item">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <div>
                                    <MdDelete className="icon" />
                                    <FaCheck className="check-icon" />
                                    <FaEdit className="edit-icon" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default App;
