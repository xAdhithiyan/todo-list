import { format } from "date-fns";
import elFactory from "../createDomElements";
import todoList from "./todoList";
import addImage from "/images/add.svg";
import "../css/modalPage.css"
import pubsub from "../pubSub";

function createModalPage(){
    let form = document.querySelector("form")
    form.appendChild(template("Title", "text", "title"));
    form.appendChild(template("Description", "text", "description"));
    form.appendChild(template("Date", "date", "date"));
    
    let priorityDiv = elFactory("div", {class: "priorityDiv"}, "");
    priorityDiv.appendChild(elFactory("div", {}, "Priority"))
    priorityDiv.appendChild(template("High", "radio", "priority", "high"));
    priorityDiv.appendChild(template("Low", "radio", "priority", "low"));
    form.append(priorityDiv)

    let btn =  elFactory("div", {class: "modalBtns"}, "");
    btn.appendChild(elFactory("button", {type: "submit", class: "formSubmit"}, "submit"));
    btn.appendChild(elFactory("button", {type: "button", class: "formClose"}, "close"));
    form.appendChild(btn)
}

function template(title, type , name, value = ""){
    let div = elFactory("div");
    let label = elFactory("label", {for: name}, title);
    let input = elFactory("input", {type: type, id: name , name: name, required: "true", value: value, class: "modalInputs" , autocomplete: "off"})
    div.appendChild(label);
    div.appendChild(input);
    return div;
}


function modalPage(){
    let modal = document.querySelector(".modal");
    let submitBtn = document.querySelector(".formSubmit");
    let closeBtn = document.querySelector(".formClose");

   
    let img = elFactory("img" ,{src: addImage, alt: "add", class: "addTodos"}, "");
    img.addEventListener("click", () => modal.showModal());
    document.querySelector("body").appendChild(img);

    closeBtn.addEventListener("click", () => {
        modal.close();
        if(modal.id){
            let allInputs = document.querySelectorAll(".modalInputs");
            allInputs.forEach(e => {
                if(e.type != "radio"){
                    e.value = "";
                }
            });
            modal.removeAttribute("id", modal.id);
        }
    });
    submitBtn.addEventListener("click", (e) => {
        if(document.querySelector("form").reportValidity()){
            e.preventDefault();
            let allInputs = document.querySelectorAll(".modalInputs");
            
            // converting the format of the date(obtained from input box) using format function of date-fns package
            let newDate = format(new Date(allInputs[2].value) , "dd-MM-yyyy");

            if(modal.id){
                pubsub.publish("editTodo", {id: modal.id, details: [allInputs[0].value, allInputs[1].value, newDate, allInputs[3].checked ? allInputs[3].value : allInputs[4].value],});
                modal.removeAttribute("id", modal.id);
            }else{
                // updated the todoList -> could have used pub/sub, but since only one module depends on these values I just imported that module
                todoList.updateTodos(allInputs[0].value, allInputs[1].value, newDate, allInputs[3].checked ? allInputs[3].value : allInputs[4].value,);
            }

            // reset all the values 
            allInputs.forEach(e => {
                if(e.type != "radio"){
                    e.value = "";
                }
            })  

            modal.close();

        }
    })
}

createModalPage();

export default modalPage;
