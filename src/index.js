import "./style.css";
import { Project } from "./myModules/todo.js";
import { format } from "date-fns";

//grab the date picker and set its minimum to today
let dPicker = document.querySelector("#dueDate");
dPicker.setAttribute("min", format(Date.now(), "yyyy-MM-dd"));
