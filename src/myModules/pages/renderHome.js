//get Project so you can create a new project on this page.
import { Project } from "../code/todo.js";


export const renderHome = (AppArray) => {
    const paraText = "Get-It-Done is a todo list app here to help you stay on top of your tasks. Add tasks and keep them organized in projects so you never miss a step or do one out of order. Enjoy the productivity and peace of mind that our proper record keeping offers."

    const CONTENT = document.querySelector("#content");
    CONTENT.innerHTML = "";

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("mainContainer");
    CONTENT.appendChild(mainContainer);

    //all these below elements go in mainContainer
    let h2 = document.createElement("h2");
    h2.textContent = "Welcome!";
    mainContainer.appendChild(h2);

    const introText = document.createElement("p");
    introText.textContent = paraText;
    mainContainer.appendChild(introText);

    let hr = document.createElement("hr");
    mainContainer.appendChild(hr);


    let h3 = document.createElement("h3");
    h3.textContent = "Projects";
    mainContainer.appendChild(h3);

    //
    let createProjectBtn = document.createElement("button");
    createProjectBtn.textContent = "Create Project";
    createProjectBtn.addEventListener("click", toggleCreateProjDiv);

    let createTodoBtn = document.createElement("button");
    createTodoBtn.textContent = "Create Todo";
    //this should have a listener that brings you to default's project page

    mainContainer.appendChild(createProjectBtn);
    mainContainer.appendChild(createTodoBtn);

    //The div for creating a project. It will give a name textbox and 
    //show save and edit buttons
    createProjectDiv(AppArray, mainContainer);

    AppArray.forEach((proj) => {
        printProject(proj, mainContainer);
    });

}

function createProjectDiv(AppArray, mainContainer) {

    const crProjectContainer = document.createElement("div");
    //add class for design
    crProjectContainer.classList.add("projCont");
    //make it invisible by default
    crProjectContainer.classList.add("gone");
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
    npCancelBtn.addEventListener("click", cancelNewProject);
    //add the two buttons to the div
    newProjectTwoBtns.appendChild(npSaveBtn);
    newProjectTwoBtns.appendChild(npCancelBtn);
    //add the div to the container
    crProjectContainer.appendChild(newProjectTwoBtns);

    mainContainer.appendChild(crProjectContainer);
}

function toggleCreateProjDiv() {
    document.getElementById("createProjCont").classList.toggle("gone");
}

function printProject(proj, mainContainer) {

    const projContainer = document.createElement("div");
    projContainer.classList.add("projCont");
    projContainer.setAttribute("data-id", `${proj.id}`)

    let h5 = document.createElement("h5");
    h5.textContent = proj.title;
    projContainer.appendChild(h5);

    let tasksList = document.createElement("ul");

    proj.todos.forEach((todo) => {
        //make the li
        let listItem = document.createElement("li");
        listItem.textContent = `${todo.info.title} - ${todo.info.dueDate}`;
        //add the li to the ul
        tasksList.appendChild(listItem);
    });


    projContainer.appendChild(tasksList);
    mainContainer.appendChild(projContainer);
}

function saveNewProject(arr) {
    let newTitle = document.getElementById("newProjName").value;
    let newDesc = document.getElementById("newProjDesc").value;
    //This is where we use the Project class we imported
    arr.push(new Project(newTitle, newDesc));
    cancelNewProject();
    renderHome(arr);
}

function cancelNewProject() {
    document.getElementById("createProjCont").classList.add("gone");
}
