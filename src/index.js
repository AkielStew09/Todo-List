import "./style.css";
import { renderHome } from "./myModules/pages/renderHome.js";
import { renderAbout } from "./myModules/pages/renderAbout.js";
import { renderProject } from "./myModules/pages/renderProject.js";
import { AppArray } from "./myModules/code/todo.js";

//grab the date picker and set its minimum to today
//let dPicker = document.querySelector("#dueDate");
//dPicker.setAttribute("min", format(Date.now(), "yyyy-MM-dd"));

const YourProjectsBtn = document.querySelector(".projectsLink");
YourProjectsBtn.addEventListener("click", () => renderHome(AppArray));

const AboutBtn = document.querySelector(".aboutLink");
AboutBtn.addEventListener("click", renderAbout);

renderHome(AppArray);
