import pubsub from "../pubSub";

// to display and update todoList(module pattern)
const todoList = function(){
    let todos = [];
    let count = 1;
    pubsub.subscribe("deleteTodo", deleteTodo);
    pubsub.subscribe("editTodo", editTodo);

    function allTodos(){
        return todos;
    }

    // to create a single todo and update the todoList
    function updateTodos(title, description, dueDate, priority,){
        todos.push({
            id: count,
            title,
            description,
            dueDate,
            priority,
        }); 
        console.log(todos)
        count++
        pubsub.publish("todosUpdated", todos);
    }

    function deleteTodo(deleteTodoId){
        todos = todos.filter(e => e.id != deleteTodoId);
        pubsub.publish("todosUpdated", todos);
    }

    function editTodo(editedTodoDetails){
        todos.forEach(todo => {
            if(todo.id == editedTodoDetails.id){
                todo.title = editedTodoDetails.details[0];
                todo.description = editedTodoDetails.details[1];
                todo.dueDate = editedTodoDetails.details[2];
                todo.priority = editedTodoDetails.details[3];
                console.log(todo)
            }
        })
        pubsub.publish("todosUpdated",todos)
    }

    return {
        allTodos,
        updateTodos
    }

}();


export default todoList;











