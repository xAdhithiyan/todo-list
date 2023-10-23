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

todoList.updateTodos("Cooking","need to Cook Dinner","11-10-2023","high","true"); // needs to be deleted
todoList.updateTodos("Sleeping","need to Sleep at 8","12-10-2023","low","true"); // needs to be deleted

