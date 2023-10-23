import "/node_modules/normalize.css/normalize.css"
import "./css/index.css"

import header from "./compoenets/header";
import todoPage from "./compoenets/todoPage"
import modalPage from "./compoenets/modalPage";
import subHeading from "./compoenets/subHeading"
import todoList from "./compoenets/todoList"; // needs to be deleted


header();
todoPage();
modalPage();
subHeading();

todoList.updateTodos("Cooking","need to Cook Dinner","2023-10-11","high","true"); // needs to be deleted
todoList.updateTodos("Sleeping","need to Sleep at 8","2023-10-12","high","true"); // needs to be deleted

