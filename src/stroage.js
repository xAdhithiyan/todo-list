import pubsub from "./pubSub";
import todoList from "./compoenets/todoList";

function storage(){
    // is triged when the tab closes or browser refreshes 
    window.addEventListener("unload", e => {
        localStorage.setItem("myArray", JSON.stringify(todoList.allTodos()));
        localStorage.setItem("myProjects", JSON.stringify(todoList.allProjects()))
        localStorage.setItem("count", 1);
        // localStorage.clear();
    })

    // is triged when the tab is opened
    window.addEventListener("load",e => {
        // to skip the first load when unload event is not run yet
        if(localStorage.getItem("count") == 1){
            pubsub.publish("BrowserRefreshTodos",JSON.parse(localStorage.getItem("myArray")));   
            pubsub.publish("BrowserRefreshProjects",JSON.parse(localStorage.getItem("myProjects")));
        }
    })
}

export default storage;