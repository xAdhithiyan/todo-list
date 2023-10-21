import elFactory from "../createDomElements";
import todoList from "./todoList";

function createModalPage(){
    let form = document.querySelector("form")
    form.appendChild(template("Title", "text", "title"));
    form.appendChild(template("Description", "text", "description"));
    form.appendChild(template("Date", "date", "date"));
    form.appendChild(template("High", "radio", "priority", "high"));
    form.appendChild(template("Low", "radio", "priority", "low"));
    form.appendChild(elFactory("button", {type: "submit", class: "formSubmit"}, "submit"));
    form.appendChild(elFactory("button", {type: "button", class: "formClose"}, "close"));
}

function template(title, type , name, value = ""){
    let div = elFactory("div");
    let label = elFactory("label", {for: name}, title);
    let input = elFactory("input", {type: type, id: name , name: name, required: "true", value: value, class: "modalInputs" })
    div.appendChild(label);
    div.appendChild(input);
    return div;
}



function modalPage(){
    // let todos = document.querySelector(".todos");
    let modal = document.querySelector(".modal");
    let btn = elFactory("button", {class: "addTodos"} , "Add");
    let submitBtn = document.querySelector(".formSubmit");
    let closeBtn = document.querySelector(".formClose");

    btn.addEventListener("click", () => modal.showModal());
    document.querySelector("body").appendChild(btn);

    closeBtn.addEventListener("click", () => modal.close());
    submitBtn.addEventListener("click", (e) => {
        if(document.querySelector("form").reportValidity()){
            e.preventDefault();
            let allInputs = document.querySelectorAll(".modalInputs");
            console.log(allInputs)
            
            // updated the todoList -> could have used pub/sub, but since only one module depends on these values i just imported that module
            todoList.updateTodos(allInputs[0].value, allInputs[1].value, allInputs[2].value, allInputs[3].checked ? allInputs[3].value : allInputs[4].value,);

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
