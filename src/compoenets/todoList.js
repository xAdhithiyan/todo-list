import pubsub from "../pubSub";

// to display and update todoList(module pattern)
const todoList = function(){
    let todos = [];

    function allTodos(){
        return todos;
    }

    // to create a single todo and update the todoList
    function updateTodos(title, description, dueDate, priority, checklist){
        todos.push({
            title,
            description,
            dueDate,
            priority,
            checklist
        }); 
        console.log(todos)
    }

    return {
        allTodos,
        updateTodos
    }

}();

todoList.updateTodos("ads","sdasdads","9th","high","true");

export default todoList;











