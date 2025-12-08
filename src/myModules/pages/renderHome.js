//get Project so you can create a new project on this page.
import { Project } from "../code/todo.js";
import { format } from "date-fns";
import { renderProject } from "./renderProject.js";

export const renderHome = (AppArray) => {
    const paraText = "Get-It-Done is a todo list app here to help you stay on top of your tasks. Add tasks and keep them organized in projects so you never miss a step or do one out of order. Enjoy the productivity and peace of mind that our proper record keeping offers."

    const CONTENT = document.querySelector("#content");
    CONTENT.innerHTML = "";

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("mainContainer");
    CONTENT.appendChild(mainContainer);

    //all these below elements go in mainContainer
    mainContainer.innerHTML += `
        <h2>Welcome!</h2>
        <p>${paraText}</p>
        <hr>
        <h3>Projects</h3>
    `;


    let createProjectBtn = document.createElement("button");
    createProjectBtn.textContent = "Create Project";
    createProjectBtn.addEventListener("click", toggleCreateProjDiv);

    let createTodoBtn = document.createElement("button");
    createTodoBtn.textContent = "Create Todo";
    //a listener that brings you to the default project page
    createTodoBtn.addEventListener("click", () => sendToDefault(AppArray));

    mainContainer.appendChild(createProjectBtn);
    mainContainer.appendChild(createTodoBtn);

    //Append the div for creating a project.
    createProjectDiv(AppArray, mainContainer);

    AppArray.toReversed().forEach((proj, index) => {
        //Append the div for a project.
        printProject(proj, mainContainer, index, AppArray);
    });
    addExtraEvents(AppArray);
}

function printProject(proj, mainContainer, index, arr) {

    const projContainer = document.createElement("div");
    projContainer.classList.add("projCont");
    projContainer.setAttribute("data-id", `${proj.id}`)

    let h5 = document.createElement("h5");
    h5.textContent = proj.title;
    projContainer.appendChild(h5);

    //Print the todos of the project
    let todosList = document.createElement("ul");
    //for each todo in the project, we make an li and
    //append it to todosList
    proj.todos.toReversed().forEach((todo) => {
        //retrieve the title then due date of the todo
        const title = todo.info.title;
        const dueDate = format(todo.info.dueDate, "dd/MMM/yyyy");
        //make the li and set its textContent to the retrieved info
        let listItem = document.createElement("li");
        listItem.innerHTML = `${title} <span class="minorTextHome">- Due ${dueDate}</span>`;
        //add the li to the ul
        todosList.appendChild(listItem);
    });
    projContainer.appendChild(todosList);

    //only add a delete button if it's not the first one ie. the default project
    if (index != arr.length - 1)
        projContainer.innerHTML += `
            <div class="btnDiv">
                <button class="deleteProjBtn">Delete</button>
            </div>
        `;
    projContainer.addEventListener("click", () => {
        console.log(`the proj event listener is the problem`);
        renderProject(proj);
    })
    mainContainer.appendChild(projContainer);
}

function addExtraEvents(AppArray) {
    const deleteProjBtns = Array.from(document.querySelectorAll(".deleteProjBtn"));

    deleteProjBtns.forEach((btn) => btn.addEventListener("click", (e) => { deleteProject(e, AppArray); }));
};

function deleteProject(event, arr) {
    event.stopPropagation();
    const projDiv = event.currentTarget.parentElement.parentElement;
    const projId = projDiv.dataset.id;
    console.log(`the id retrieved is ${projId}`);
    const index = arr.findIndex((p) => p.id === projId);
    console.log(`the index retrieved is ${index}`);

    let result = confirm(`You are about to delete the project "${arr[index].title}".`);
    if (result) {
        //delete the project and refresh
        arr.splice(index, 1);
        renderHome(arr);
    }
}

function saveNewProject(arr) {
    let newTitle = document.getElementById("newProjName").value;
    let newDesc = document.getElementById("newProjDesc").value;
    //Create new project and push it to AppArray, using the Class we imported
    arr.push(new Project(newTitle, newDesc));
    //hide the create form
    toggleCreateProjDiv();
    //reload page
    renderHome(arr);
}

function toggleCreateProjDiv() {
    document.getElementById("createProjCont").classList.toggle("show");
}
function sendToDefault(AppArray) {
    renderProject(AppArray[0], 1);
}

function createProjectDiv(AppArray, mainContainer) {

    const crProjectContainer = document.createElement("div");
    //add class for design
    crProjectContainer.classList.add("projCont");
    crProjectContainer.classList.add("createProjForm");
    //make it invisible by default
    crProjectContainer.setAttribute("id", "createProjCont");

    //Title element
    const crProjTitle = document.createElement("h5");
    crProjTitle.textContent = "Create New Project";
    crProjectContainer.appendChild(crProjTitle);
    //then add the name text box and the two buttons and append them
    const nameBox = document.createElement("input");
    nameBox.setAttribute("type", "text");
    nameBox.setAttribute("placeholder", "Project-name");
    nameBox.setAttribute("id", "newProjName");
    crProjectContainer.appendChild(nameBox);

    const descBox = document.createElement("textarea");
    descBox.setAttribute("placeholder", "Project-description");
    descBox.setAttribute("id", "newProjDesc");
    crProjectContainer.appendChild(descBox);

    //div for the save and cancel buttons
    const newProjectTwoBtns = document.createElement("div");

    const npSaveBtn = document.createElement("button");
    const npCancelBtn = document.createElement("button");
    npSaveBtn.textContent = "Save";
    npCancelBtn.textContent = "Cancel";
    npSaveBtn.addEventListener("click", () => { saveNewProject(AppArray); });
    npCancelBtn.addEventListener("click", toggleCreateProjDiv);
    //add the two buttons to the div
    newProjectTwoBtns.appendChild(npSaveBtn);
    newProjectTwoBtns.appendChild(npCancelBtn);
    //add the div to the container
    crProjectContainer.appendChild(newProjectTwoBtns);

    mainContainer.appendChild(crProjectContainer);
}
