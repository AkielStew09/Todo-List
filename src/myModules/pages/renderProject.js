//get Todo so we can edit our todos
import { Todo } from "../code/todo.js";

export const renderProject = (project) => {
    //retrieve the content div and put all the page stuff in it via innerHTML
    const CONTENT = document.getElementById("content");
    CONTENT.innerHTML = `
        <div class="mainContainerProj">
            <h2>${project.title}<h2>
            <p>
                ${project.description}
            </p>
            <hr>
            <h3>Tasks To Do</h3>
            <button id="addTodoBtn">Add Todo</button>
            ${printAddForm() + printTodos(project)}
        </div >
        ${printEditForm()}
    `;
    //add event listeners to the buttons we just put on the screen
    addTheEvents(project);
}

const printTodos = (project) => {
    //project.todos is the project's array of todos.
    //I'm returning an array of divs, each based on a todo using map
    //then joining them into one string with join("")
    let todoDivs = project.todos.toReversed().map(
        (todo) => `
            <div class="listedTodos" data-id=${todo.info.id}>
                <h5>${todo.info.title}</h5>
                <span> - ${todo.info.description}</span>
                <div class="formBtns">
                    <button id="completeBtn" class="completeBtn">Incomplete</button>
                    <button id="editTodoBtn" class="editTodoBtn">Edit</button>
                    <button id="deleteBtn" class="deleteBtn">Delete</button>
                </div>
            </div >
        `
    );
    return todoDivs.join("");
}
//print the Add Todo form, invisible by default
const printAddForm = () => {

    return `
    <div id="addTodoForm" class="listedTodos addTodoForm">
        <h4>Add a New Todo</h4>
        <input id="newTitleBox" type="text" placeholder="Title:" class="todoTextbox">
        <br>
        <textarea id="newDescriptionBox" placeholder="Description:" rows="3" cols="43"></textarea>
        <label for="dueDate">Due Date:</label>
        <br>
        <input id="newDueDate" type="date"> 
        <select name="" id="newPriority">
            <option value="" selected disabled>Priority</option>
            <option value="low">Low</option>
            <option value="regular">Regular</option>
            <option value="high">High</option>
        </select>
        <div class="formBtns">
            <button id="saveAdd">Add</button>
            <button id="cancelAdd">Cancel</button>
        </div>
    </div>
    `;
}

//print the Edit Todo form, invisible by default
const printEditForm = () => {
    return `
    <div class="overlay">
        <div id = "editTodoForm" class="listedTodos editTodoForm">
            <h4>Edit Todo</h4>
            <input id="titleBox" type="text" placeholder="Title" class="todoTextbox">
            <br>
            <textarea id="descriptionBox" placeholder="Description" rows="3" cols="43"></textarea>
            <label for="dueDate">Due Date:</label>
            <br>
            <input id="dueDate" type="date"> 
            <select name="" id="priority">
                <option value="" selected disabled>Priority</option>
                <option value="low">Low</option>
                <option value="regular">Regular</option>
                <option value="high">High</option>
            </select>
            <div class="formBtns">
                <button id="saveEdit">Save</button>
                <button id="cancelEdit">Cancel</button>
            </div>
        </div>
    </div>
    `;
}


const addTheEvents = (project) => {
    document.getElementById("saveAdd").addEventListener("click", () => { addNewTodo(project) });
    document.getElementById("addTodoBtn").addEventListener("click", toggleAddTodoForm);
    document.getElementById("cancelAdd").addEventListener("click", toggleAddTodoForm);
    //program all the todos' buttons with forEach
    //get doesn't return an array, so convert it with Array.from()
    Array.from(document.getElementsByClassName("editTodoBtn")).forEach((editBtn) => {
        editBtn.addEventListener("click", (e) => { populateEditTodoForm(getIndex(e, project), project) });
    });
    document.getElementById("cancelEdit").addEventListener("click", toggleEditTodoForm);
    document.getElementById("saveEdit").addEventListener("click", (e) => saveEdit(getIndex(e, project), project));
}

const getIndex = (e, project) => {
    let todoDiv = e.currentTarget.parentElement.parentElement;
    if (todoDiv.id) alert(`the element selected is ${todoDiv.tagName}#${todoDiv.id}`);
    alert(`its random id is ${todoDiv.dataset.id}`);
    let todoId = todoDiv.dataset.id;
    return project.getIndex(todoId);
}

const addNewTodo = (project) => {
    const newTitle = document.getElementById("newTitleBox").value;
    const newDesc = document.getElementById("newDescriptionBox").value;
    const newDate = document.getElementById("newDueDate").valueAsDate;
    const newPrio = document.getElementById("newPriority").value;
    //make new todo based on form input
    project.addTodo(newTitle, newDesc, newDate, newPrio);
    //reload the page
    renderProject(project);
}

const toggleAddTodoForm = () => { document.querySelector("#addTodoForm").classList.toggle("show") }
const toggleEditTodoForm = () => { document.querySelector(".overlay").classList.toggle("show") }


const populateEditTodoForm = (i, proj) => {
    let oldInfo = proj.todos[i].info;
    const edForm = document.querySelector("#editTodoForm");
    const titleBox = document.querySelector("#titleBox");
    const descriptionBox = document.querySelector("#descriptionBox");
    const datePicker = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    edForm.dataset.id = oldInfo.id;
    titleBox.value = oldInfo.title;
    descriptionBox.value = oldInfo.description;
    datePicker.valueAsDate = oldInfo.dueDate;
    priority.value = oldInfo.priority;
    toggleEditTodoForm();
}

const saveEdit = (i, prj) => {
    const ttl = document.querySelector("#titleBox").value;
    const desc = document.querySelector("#descriptionBox").value;
    const date = document.querySelector("#dueDate").valueAsDate;
    const prio = document.querySelector("#priority").value;

    prj.editTodo(i, ttl, desc, date, prio);
    toggleEditTodoForm();
    //reload the page
    renderProject(prj);
}
