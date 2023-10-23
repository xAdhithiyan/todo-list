import elFactory from "../createDomElements";
import pubsub from "../pubSub";
import "../css/todoPage.css"

function addTodoPage(todos){
    let todoDiv = document.querySelector(".todos");
    todoDiv.innerHTML = "";
    
    // console.log(todos)
    todos.forEach(todo => {

        let div = elFactory("div", {}, "");
        div.appendChild(elFactory("input", {type: "checkbox"}, ""));
        div.appendChild(elFactory("div", {}, todo["title"]));
        div.appendChild(elFactory("div", {class: "dueDate"}, todo["dueDate"]));

        let btn1 = elFactory("button", {type: "button"}, "");
        btn1.appendChild(elFactory("img", {src: "", alt: "view"}, ""))
        div.appendChild(btn1);

        let btn2 = elFactory("button", {type: "button"}, "");
        btn2.appendChild(elFactory("img", {src: "", alt: "edit"}, ""))
        div.appendChild(btn2);
        
        let btn3 = elFactory("button", {type: "button"}, "");
        btn3.appendChild(elFactory("img", {src: "", alt: "delete"}, ""))
        div.appendChild(btn3);
        
        
        todoDiv.appendChild(div);
    })
}

function todoPage(){
    pubsub.subscribe("todosUpdated", addTodoPage);
}   

export default todoPage;