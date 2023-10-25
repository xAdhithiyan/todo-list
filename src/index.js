import "/node_modules/normalize.css/normalize.css"
import "./css/index.css"

import header from "./compoenets/header";
import todoPage from "./compoenets/todoPage"
import modalPage from "./compoenets/modalPage";
import subHeading from "./compoenets/subHeading"
import footer from "./compoenets/footer"
import storage from "./stroage";
import todoList from "./compoenets/todoList"; 


header();
todoPage();
modalPage();
subHeading();
footer();
storage();


todoList.updateTodos("Cooking","need to Cook Dinner","11-10-2023","high", "no", "houseWork"); 
todoList.updateTodos("Write Record","need to write Physics Record","24-10-2023","low", "no" , "collegeStuff"); 
todoList.updateTodos("Coding","need to finish the odin project","24-10-2023","low", "no", "collegeStuff");

