import pubsub from "../pubSub";
import { format } from "date-fns";
import "../css/subHeading.css"

function updateSubHeading(todos){
    // home subheading
    let home = document.querySelector(".home");
    home.textContent = todos.length;
    
    // today subheading
    let today = document.querySelector(".today")
    let todayDate = format(new Date() , "dd-MM-yyyy");
    let todayTodos = todos.filter(todo => todayDate == todo.dueDate)
    today.textContent = todayTodos.length;
    
}

function subHeading(){
    pubsub.subscribe("todosUpdated", updateSubHeading)
}


export default subHeading;