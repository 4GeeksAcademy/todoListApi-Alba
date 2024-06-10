import React from react;

const TodoListF = () => {
    fetch("https://playground.4geeks.com/todo/users/AlbaL", {
        method: "POST",
        headers:{
            "accept": "application/json"
        },
    }).then(response=>{
        console.log(response)
    })
}
export default TodoListF;