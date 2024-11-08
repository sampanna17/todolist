import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./App.css";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allToDos, setToDos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [CompletedToDos, setCompletedToDos] = useState([]);
    const [currentEdit, setCurrentEdit] = useState("");
    const [currentEditedItem, setCurrentEditedItem] = useState("");

    const handleAddToDo = () => {
        let newToDoItem = {
            title: newTitle,
            description: newDescription,
        };

        let updatedToDoArray = [...allToDos];
        updatedToDoArray.push(newToDoItem);
        setToDos(updatedToDoArray);
        localStorage.setItem('todolist', JSON.stringify(updatedToDoArray));
    };

    const handleDelete = (index) => {
        let reducedToDO = [...allToDos];
        reducedToDO.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(reducedToDO));
        setToDos(reducedToDO);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        let hour = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();
        let completedOn = day + '-' + month + "-" + year + " " + "at " + hour + ":" + min + ":" + sec;

        let filteredItem = {
            ...allToDos[index],
            completedOn: completedOn
        }

        let updatedCompletedArray = [...CompletedToDos];
        updatedCompletedArray.push(filteredItem);
        setCompletedToDos(updatedCompletedArray);
        handleDelete(index)
        localStorage.setItem('completedToDos', JSON.stringify(updatedCompletedArray));
    };

    const handleDeleteCompleted = (index) => {
        let reducedCompleted = [...CompletedToDos];
        reducedCompleted.splice(index, 1);
        localStorage.setItem('completedToDos', JSON.stringify(reducedCompleted));
        setCompletedToDos(reducedCompleted);
    };

    const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem(item);
    }

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, title: value };
        });
    };
    
    const handleUpdateDescription = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, description: value };
        });
    };
    
    const handleUpdateToDo = () => {
        let newToDo = [...allToDos];
        newToDo[currentEdit] = currentEditedItem;
        setToDos(newToDo);
        setCurrentEdit("");
        localStorage.setItem('todolist', JSON.stringify(newToDo));
    };

    useEffect(() => {
        let savedToDo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompleted = JSON.parse(localStorage.getItem('completedToDos'));
        let savedUpdate = JSON.parse(localStorage.getItem('newToDo'));

        if (savedToDo) {
            setToDos(savedToDo);
        }

        if (savedCompleted) {
            setCompletedToDos(savedCompleted);
        }

        if (savedUpdate) {
            setCurrentEdit(savedUpdate);
        }

    }, []);

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
                    {isCompleteScreen === false && allToDos.map((item, index) => {
                        if (currentEdit === index) {
                            return (
                                <div key={index} className="edit-wrapper">
                                    <input
                                        placeholder="Updated Title"
                                        onChange={(e) => handleUpdateTitle(e.target.value)}
                                        value={currentEditedItem.title}
                                    />
                                    <textarea
                                        placeholder="Updated Description"
                                        rows={4}
                                        onChange={(e) => handleUpdateDescription(e.target.value)}
                                        value={currentEditedItem.description}
                                    />
                                    <button type="buttton" onClick={handleUpdateToDo} className="UpdateBtn">
                                        Update
                                    </button>
                                </div>
                            );

                        } else {
                            return (
                                <div className="todo-list-item" key={index}>
                                    <div className="list-item">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>

                                    <div>
                                        <MdDelete className="icon" onClick={() => handleDelete(index)} title="Delete?" />
                                        <FaCheck className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                                        <FaEdit className="edit-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
                                    </div>
                                </div>
                            );
                        }
                    })}

                    {isCompleteScreen === true && CompletedToDos.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div className="list-item">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on: {item.completedOn}</small></p>
                                </div>

                                <div>
                                    <MdDelete className="icon" onClick={() => handleDeleteCompleted(index)} title="Delete?" />
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
