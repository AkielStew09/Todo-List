import "./style.css";
import { renderHome } from "./myModules/pages/renderHome.js";
import { Project } from "./myModules/code/todo.js";
import { format } from "date-fns";

//grab the date picker and set its minimum to today
//let dPicker = document.querySelector("#dueDate");
//dPicker.setAttribute("min", format(Date.now(), "yyyy-MM-dd"));

const ProjectBtn = document.querySelector(".projectsLink");
ProjectBtn.addEventListener("click", renderHome);


renderHome();
