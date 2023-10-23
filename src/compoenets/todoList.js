import pubsub from "../pubSub";

// to display and update todoList(module pattern)
const todoList = function(){
    let todos = [];

    function allTodos(){
        return todos;
    }

    // to create a single todo and update the todoList
    function updateTodos(title, description, dueDate, priority,){
        todos.push({
            title,
            description,
            dueDate,
            priority,
        }); 
        // console.log(todos)
        pubsub.publish("todosUpdated", todos);
    }

    return {
        allTodos,
        updateTodos
    }

}();


export default todoList;











