import "./style.css";
import { renderHome } from "./myModules/pages/renderHome.js";
import { toggleDark } from "./myModules/pages/darkMode.js";
import { AppArray } from "./myModules/code/todo.js";

const YourProjectsBtn = document.querySelector(".projectsLink");
YourProjectsBtn.addEventListener("click", () => renderHome(AppArray));

const darkBtn = document.querySelector(".darkModeBtn");
darkBtn.addEventListener("click", toggleDark);

renderHome(AppArray);
