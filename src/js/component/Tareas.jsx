import React, { useState, useEffect } from "react";


const Tareas = () => {
    const [todos, setTodos] = useState([]);
    const [tareasValue, setTareasValue] = useState("");
    const [user, setUser] = useState ("");
    const [userName, setUserName] = useState ('Alba');



    const agregarNuevaAlerta = () => {
        setTodos(todos.concat([tareasValue]))
        setTareasValue("")
        TodoListF()
        alert("tarea guardada")

    }
   
    const createUser = async (user) =>{
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
            console.log('usuario creado', result)
            getList()
        } catch (error) {
            console.log(error, "error user");
        }
    }
    const getUser = async (user) =>{
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/users/${userName}`)
            const result = await response.json()
            console.log('usuario obtenido', result);
            
        } catch (error) {
            console.log('error no obtine usuario', error);
        }
    }
    const getList = async () => {
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/users/${user}`)
            const data =  await response.json()
            setTodos(data.todos || [])
            console.log(data, 'get data list')
            
            
        } catch (error) {
            console.log(error, 'list error')
        }
    }
    const TodoListF = async () => {
        if (tareasValue.trim()==='') return
        const bodyToDo = {
            "label": tareasValue,
            "is_done": false
        }
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToDo)

            })

            const result = await response.json()
            setTareasValue('')
            getList()
            alert('tarea guardada')
            console.log(result, 'tarea result');
            
            
        } catch (error) {
            console.log(error, 'error tarea guardada')
        }
    }

    
    const putList = async (index, todo) => {
        const updatedTodo = {
            ...todo,
            "label": tareasValue.trim().length === 0 ? el.label : tareasValue,
            "is_done": todo.is_done,
        }
        try {
            
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)
            })
            
            const obtainResult = await obtainPut.json() 
            console.log(obtainResult, 'obtain result')
            getList()
        } catch (error) {
            console.log(error, 'error putlist')
        }
    }
    
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
            console.log(result, 'tarea eliminada')
        } catch (error) {
            console.log(error, 'error al eliminar tarea')
        }
    }

useEffect(() => {
    getList()
    
},[userName])








    return (

        <div className="container">
            <h1 className="tittle">ToDos</h1>
                <p className="d-flex justify-content-center">{userName}</p>
            <li>
                <input
                type="text"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === "Enter"){
                        createUser(user)
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
                                
                                
                                agregarNuevaAlerta()
                            }
                          
                        }}
                        placeholder="What do I need to do?"></input>
                </li>
                {todos.length > 0 ? ( 
                    todos?.map((todo, index) => {
                        return (
                            <li key={todo.id}>
                                {todo.label}

                                <button className="x" onClick={() => deleteList(todo.id)}>x</button>
                                <button onClick={() => putList(index, todo)}>Edit</button>
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