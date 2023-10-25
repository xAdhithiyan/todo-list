import pubsub from "../pubSub";
import { format, sub } from "date-fns";
import "../css/subHeading.css"
import elFactory from "../createDomElements";
import todoList from "./todoList";

function updateSubHeading(todos){
    homeTodosList(todos);
    todayTodosList(todos);
    projectTodoList(todos);
    
}

function subHeading(){
    pubsub.subscribe("todosUpdated", updateSubHeading)
}

function decidingSubHeading(){
    document.querySelector(".home").addEventListener("click", e => {
        pubsub.publish("decidingTab", "Home")
        document.querySelector(".home").classList.add("increaseFont");
        document.querySelector(".today").classList.remove("increaseFont");
        removeBtnClass();
    })
    document.querySelector(".today").addEventListener("click", e => {
        pubsub.publish("decidingTab", "today");
        document.querySelector(".today").classList.add("increaseFont");
        document.querySelector(".home").classList.remove("increaseFont");
        removeBtnClass();
    })
}

//for already present projects
function projectHeading(){
    let projects = document.querySelector(".projects").children;
    projects = Array.from(projects);
    projects.shift();
    projects.forEach(proj => {
        proj.addEventListener("click", e => {
            pubsub.publish("decidingTab", proj.children[1].classList.value);
            document.querySelector(".today").classList.remove("increaseFont");
            document.querySelector(".home").classList.remove("increaseFont");
            removeBtnClass()
            e.target.classList.add("increaseFont")
        })
    })
}

function homeTodosList(todos){
    let home = document.querySelector(".home");
    let homeNumber = home.nextElementSibling
    let newTodos = todos.filter(todo => todo.finished == "no")
    homeNumber.textContent = newTodos.length;

}

function todayTodosList(todos){
    let today = document.querySelector(".today")
    let todayNumber = today.nextElementSibling;
    
    // number of today todos
    let todayDate = format(new Date() , "dd-MM-yyyy");
    let todayTodos = todos.filter(todo => todayDate == todo.dueDate)
    let todayTodosLength = todos.filter(todo => todayDate == todo.dueDate && todo.finished == "no")
    todayNumber.textContent = todayTodosLength.length;
}

function projectTodoList(todos){
    let projects = document.querySelector(".projects").children;
    projects = Array.from(projects);
    projects.shift();
    projects.forEach(proj => {
        let newTodos = todos.filter(todo => todo.projectTab ==  proj.children[1].classList.value && todo.finished == "no")
        proj.children[1].textContent = newTodos.length
    })
}
function addProjectButton(){
    let btn = document.querySelector(".addProject");
    let submitBtn = document.querySelector(".addProjectSubmitBtn");
    let closeBtn = document.querySelector(".addProjectCloseBtn");
    let modal = document.querySelector(".addProjectModal");
    
    btn.addEventListener("click", e => {
        modal.showModal();
    })
    closeBtn.addEventListener("click", e => {
        modal.close();
    })
    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        let inputBox = document.querySelector(".addProjectInput");
        let projectName = inputBox.value;
        let projectClassName = projectName.split(" ")[0];
        
        pubsub.publish("updateProjects", {[projectName]: projectClassName});
        addProjectButtonEvent(projectName, projectClassName);

        inputBox.value = "";
        modal.close();

    })

}

function addProjectButtonEvent(projectName, projectClassName){
    // creating the div
    let projectsDiv = document.querySelector(".projects");
    let div = elFactory("div", {} , "");
    let tabBtn = elFactory("button", {} , projectName)
    tabBtn.addEventListener("click", e => {
        pubsub.publish("decidingTab", projectClassName);
        document.querySelector(".today").classList.remove("increaseFont");
        document.querySelector(".home").classList.remove("increaseFont");
        removeBtnClass();
        e.target.classList.add("increaseFont")
    })
    div.append(tabBtn);
    div.appendChild(elFactory("div", {class: projectClassName}, "0"));
    projectsDiv.append(div);
    
    //adding class to dropdown
    let dropdown = document.querySelector(".dropdown");
    dropdown.appendChild(elFactory("option" , {value: projectClassName}, projectName));
}


function removeBtnClass(){
    let projects = document.querySelector(".projects").children;
    projects = Array.from(projects);
    projects.shift();
    projects.forEach(n => {
        n.children[0].classList.remove("increaseFont")
    });

}

decidingSubHeading();
projectHeading();
addProjectButton();
pubsub.subscribe("BrowserLoadProjects", projects => {
    projects.forEach(proj => {
        let key = Object.keys(proj)[0];
        addProjectButtonEvent(key, proj[key]);
    })
    projectTodoList(todoList.allTodos());

    // button increase font on referesh
    let subHeadingBtn = todoList.allTodos()[0];
    if(subHeadingBtn == "Home"){
        document.querySelector(`.home`).classList.add("increaseFont");
    }else if(subHeadingBtn == "today"){
        document.querySelector(`.today`).classList.add("increaseFont");
    }else{
        document.querySelector(`.${todoList.allTodos()[0]}`).previousElementSibling.classList.add("increaseFont")
    }
})
export default subHeading;