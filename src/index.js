import "/node_modules/normalize.css/normalize.css"
import "./css/index.css"

import header from "./compoenets/header";
import todoPage from "./compoenets/todoPage"
import modalPage from "./compoenets/modalPage";
import subHeading from "./compoenets/subHeading"
import footer from "./compoenets/footer"
import todoList from "./compoenets/todoList"; // needs to be deleted


header();
todoPage();
modalPage();
subHeading();
footer();

todoList.updateTodos("Cooking","need to Cook Dinner","11-10-2023","high", "no", "houseWork"); // needs to be deleted
todoList.updateTodos("Write Record","need to write Physics Record","24-10-2023","low", "no" , "collegeStuff"); // needs to be deleted
todoList.updateTodos("Coding","need to finish the odin project","24-10-2023","low", "no", "collegeStuff"); // needs to be deleted

