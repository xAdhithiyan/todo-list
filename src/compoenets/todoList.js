import { sub } from "date-fns";
import pubsub from "../pubSub";

// to display and update todoList(module pattern)
const todoList = function(){
    let todos = ["Home",];
    let count = 1;
    let projects = [];
    pubsub.subscribe("deleteTodo", deleteTodo);
    pubsub.subscribe("editTodo", editTodo);
    pubsub.subscribe("checkTodo", checkTodo);
    pubsub.subscribe("decidingTab", decidingTab);
    pubsub.subscribe("updateProjects", updateProjects)
    pubsub.subscribe("BrowserRefreshTodos", BrowserRefreshTodos);
    pubsub.subscribe("BrowserRefreshProjects", BrowserRefreshProjects);
    

    function allTodos(){
        return todos;
    }
    
    function allProjects(){
        return projects;
    }

    // to create a single todo and update the todoList
    function updateTodos(title, description, dueDate, priority, today, projectTab){
        todos.push({
            id: count,
            title,
            description,
            dueDate,
            priority,
            today,
            projectTab,
            finished: "no",
        }); 
        count++
        // console.log(todos)
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
                todo.today = editedTodoDetails.details[4];
                todo.projectTab = editedTodoDetails.details[5];
            }
        })
        pubsub.publish("todosUpdated",todos);
    }

    function checkTodo(checkDetails){
        todos.forEach(todo => {
            if(todo.id == checkDetails.id){
                todo.finished = checkDetails.val;
            }
        })
        pubsub.publish("todosUpdated",todos);
    }

    function decidingTab(tab){
        todos[0] = tab;
        pubsub.publish("todosUpdated", todos);
    }

    function BrowserRefreshTodos(newTodos){
        todos = newTodos;
        pubsub.publish("todosUpdated", todos);
    }

    function updateProjects(newProject){
        projects.push(newProject);
    }

    function BrowserRefreshProjects(newProject){
        projects = newProject;
        pubsub.publish("BrowserLoadProjects", projects)
    }

    return {
        allTodos,
        updateTodos,
        allProjects
    }

}();


export default todoList;











