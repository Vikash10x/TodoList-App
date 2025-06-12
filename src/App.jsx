import { useState, useEffect } from "react";
import { Navbar } from "./components/navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { parse, v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
      saveToLS();
    });

    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo"
    );
    if (confirmDelete) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      alert("Todo deleted!");
      saveToLS();
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-violet-200 my-5 rounded-xl p-5 min-h-[85vh] md:w-[40%]">
        <h1 className="font-bold text-center text-2xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo flex flex-col my-5 gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your todo"
              className="w-full px-3 py-1 rounded-lg"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-2 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-3 gap-2"
          onChange={toggleFinished}
          type="checkbox"
          id="show"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>

        <h2 className="text-xl font-bold">Your todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className="m-3">No Todos to display</div>}
          {todos.map((item, index) => {
            return (
              (showFinished || !item.iscompleted) && (
                <div key={index} className="todo flex  my-4 justify-between">
                  <div className="flex gap-4">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.iscompleted}
                      id=""
                    />
                    <div className={item.iscompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
