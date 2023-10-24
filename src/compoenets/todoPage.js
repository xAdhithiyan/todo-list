import elFactory from "../createDomElements";
import pubsub from "../pubSub";
import "../css/todoPage.css"
import deleteImg from "/images/delete.svg"
import editImg from "/images/edit.svg"
import viewImg from "/images/view.svg"
import todoList from "./todoList";
import { format } from "date-fns";


function addTodoPage(todos){
    let todoDiv = document.querySelector(".todos");
    todoDiv.innerHTML = "";
    
    // console.log(todos)
    todos.forEach(todo => {

        let div = elFactory("div", {id: `${todo.id}`}, "");
        // checkbox
        let todoBox = elFactory("input", {type: "checkbox"}, "");
        todoCheckbox(todoBox, div);
        // title and date
        div.appendChild(elFactory("div", {}, todo["title"]));
        div.appendChild(elFactory("div", {class: "dueDate"}, todo["dueDate"]));
        viewTodo(div);
        editTodo(div);
        deleteTodo(div);

        checkPriority(div, todo);
        CheckTodo(div, todo, todoBox);

        todoDiv.appendChild(div);
    })
}

function todoPage(){
    pubsub.subscribe("todosUpdated", addTodoPage);
}   

function deleteTodo(parentDiv){
    let div = elFactory("div", {}, "");
    div.addEventListener("click",e => {
        pubsub.publish("deleteTodo", e.target.parentNode.parentNode.id);
    })
    div.appendChild(elFactory("img", {src: deleteImg, alt: "delete"}, ""))
    parentDiv.appendChild(div);
}

function editTodo(parentDiv){
    let div = elFactory("div", {}, "");
    div.appendChild(elFactory("img", {src: editImg, alt: "edit"}, ""))
    div.addEventListener("click", e => {
        let modal = document.querySelector(".modal");
        modal.setAttribute("id", e.target.parentNode.parentNode.id);
        
        // to get the todo details of the current todo to display in the modal
        let todo = todoList.allTodos().filter(n => n.id == e.target.parentNode.parentNode.id);
        let allInputs = document.querySelectorAll(".modalInputs");
        allInputs[0].value = todo[0].title;
        allInputs[1].value = todo[0].description;
        
        // i have stored it as dd-mm-yyyy but js defualt is yyyy-mm-dd
        let newDate = todo[0].dueDate.split("-");
        allInputs[2].value = `${newDate[2]}-${newDate[1]}-${newDate[0]}`
        
        if(todo[0].priority == "high"){
            allInputs[3].checked = true;
        }else{
            allInputs[4].checked = true;
        }
        
        modal.showModal();
    })
    parentDiv.appendChild(div);
}

function viewTodo(parentDiv){
    let div = elFactory("div", {}, "");
    div.appendChild(elFactory("img", {src: viewImg, alt: "view"}, ""))
    let viewModal = document.querySelector(".viewModal");
    let closeButton = document.querySelector(".modalCloseButton");
    div.addEventListener("click", e => {
        let todo = todoList.allTodos().filter(n => n.id == e.target.parentNode.parentNode.id);

        document.querySelector(".viewTitle").textContent = todo[0].title;
        document.querySelector(".viewDesc").textContent = todo[0].description;
        document.querySelector(".viewDueDate").textContent = todo[0].dueDate;
        document.querySelector(".viewPriority").textContent = todo[0].priority;
        
        closeButton.addEventListener("click", e => viewModal.close())
        viewModal.showModal();

    })
    parentDiv.appendChild(div); 
}

function todoCheckbox(todoBox, parentDiv){
    todoBox.addEventListener("click", e => {
        let todo = todoList.allTodos().filter(n => n.id == e.target.parentNode.id);
        if(e.target.checked){
            pubsub.publish("checkTodo", {id: todo[0].id, val:"yes"})
        }else{
            pubsub.publish("checkTodo" , {id: todo[0].id, val:"no"});
        }
    })
    parentDiv.appendChild(todoBox);
}

function checkPriority(div, todo){
    if(todo.priority == "high"){
        div.classList.add("highPriority")
    }else{
        div.classList.add("lowPriority")
    }
}

function CheckTodo(parentDiv, todo, todoBox){
    // to check if a todo is checked and to add styling
    if(todo.finished == "yes"){
        todoBox.checked = true
        parentDiv.classList.add("checkedTodos")
    }
}

export default todoPage;