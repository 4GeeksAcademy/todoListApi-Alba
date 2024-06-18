import React, { useState, useEffect } from "react";

const Tareas = () => {
    const [todos, setTodos] = useState([]);
    const [tareasValue, setTareasValue] = useState("");



    const agregarNuevaAlerta = () => {
        setTodos(todos.concat([tareasValue]))
        setTareasValue("")
        alert("tarea guardada")

    }
    const handleDelete = (index) => {
        const newArray = [...todos]
        newArray.splice(index, 1)
        setTodos(newArray)
    }

    const [user, setUser] = useState ("");
    const [userName, setUserName] = useState ('');

    const createUser = async () =>{
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/users/${user}`,{
                method: "POST",
                headers: {
                    "accept": "application/json"
                }
            })
            const result = await response.json()
            setUserName(user)
            setUser('')
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
    const getUser = async () =>{
        try {
            const response = await fetch ('https://playground.4geeks.com/todo/users/Alba')
            const result = await response.json()
            if(!result == ok){
                createUser()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const TodoListF = async () => {
        try {
            const bodyToDo = {
                "label": tareasValue,
                "is_done": false
            }
            const response = await fetch("https://playground.4geeks.com/todo/todos/Alba", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToDo)

            })

            const result = await response.json()
            getList()
        } catch (error) {
            console.log(error)
        }
    }

    const getList = async () => {
        try {
            const getTodo = await fetch ('https://playground.4geeks.com/todo/users/Alba')
            const data =  await getTodo.json()
            const dataList = data
            console.log(dataList)
            setTodos(dataList.todos)
            
        } catch (error) {
            console.log(error)
        }
    }

    const putList = async (index) => {
        try {

            const putTodo = {
                "label": tareasValue.trim().length === 0 ? el.label : tareasValue,
                "is_done": false,
                "id": 33 
            }
                console.log(id)
            const obtainPut = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(putTodo)
            })
    
            const obtainResult = await obtainPut.json() 
            console.log(obtainResult)
        } catch (error) {
            console.log(error)
        }
    }
    

useEffect(() => {
    getList()
    getUser()
},[])


    const deleteList = async (id) => {
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "accept": "application/json"
                }
                
            })
            const result = await response.text()
            getList()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }




    return (

        <div className="container">
            <h1 className="tittle">ToDos</h1>
                <p>{userName}</p>
            <li>
                <input
                type="text"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === "Enter"){
                        createUser()
                    }
                }}
                placeholder="add user">
                
               
                </input>
                
            </li>

            <ul>
                <li>
                    <input
                        type="text"
                        onChange={(event) => setTareasValue(event.target.value)}
                        value={tareasValue}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                TodoListF()
                                
                                agregarNuevaAlerta()
                            }
                          
                        }}
                        placeholder="What do I need to do?"></input>
                </li>
                { todos.length > 0 ? ( 
                    todos.map((todo, index) => {
                        return (
                            <li key={index}>{todo.label}

                                <button className="x" onClick={() => deleteList(todo.id)}>x</button>
                                
                            </li>
                        )
                    })
                ) : <li>No hay tareas</li>
                }

            </ul>

            <button className="clickme" onClick={agregarNuevaAlerta}>click me </button>
        </div>
    );
};

export default Tareas;