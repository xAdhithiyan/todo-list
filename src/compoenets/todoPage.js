import elFactory from "../createDomElements";
import pubsub from "../pubSub";

function addTodoPage(todos){
    let todoDiv = document.querySelector(".todos");
    todoDiv.innerHTML = "";
    
    console.log(todos)
    todos.forEach(todo => {

        let div = elFactory("div", {}, "");
        div.appendChild(elFactory("input", {type: "checkbox"}, ""));
        div.appendChild(elFactory("div", {}, todo["title"]));
        div.appendChild(elFactory("div", {}, todo["dueDate"]));
        div.appendChild(elFactory("img", {src: "", alt: "view"}, ""));
        div.appendChild(elFactory("img", {src: "", alt: "edit"}, ""));
        div.appendChild(elFactory("img", {src: "", alt: "delete"}, ""));

        todoDiv.appendChild(div);
    })
}

function todoPage(){
    pubsub.subscribe("todosUpdated", addTodoPage);
}   

export default todoPage;