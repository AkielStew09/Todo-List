//get Todo so we can add new todos
import { Todo } from "../code/todo.js";

export const renderProject = (project) => {
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
            ${addTodoForm() +
        printTodos(project) +
        showEditForm()}
        </div >

    `;
    addTheEvents(project);
}

const printTodos = (project) => {
    let todoDivs = project.todos.map(
        (todo) => `
            <div class="listedTodos">
                <h5>${todo.info.title}</h5>
                <span> - ${todo.info.description}</span>
                <div class="formBtns">
                    <button id="completeBtn">Incomplete</button>
                    <button id="editTodoBtn">Edit</button>
                    <button id="deleteBtn">Delete</button>
                </div>
            </div >
        `
    );
    return todoDivs.join("");
}

const addTodoForm = () => {

    return `
    <div id="addTodoForm" class="listedTodos addTodoForm gone">
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

const showEditForm = () => {
    return `
    <div id = "" class="listedTodos editTodoForm gone">
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
    `;
}

const toggleAddTodoForm = () => { document.querySelector("#addTodoForm").classList.toggle("gone") }

const addTheEvents = (project) => {
    document.getElementById("addTodoBtn").addEventListener("click", toggleAddTodoForm);
    document.getElementById("cancelAdd").addEventListener("click", toggleAddTodoForm);
    document.getElementById("saveAdd").addEventListener("click", () => { addNewTodo(project) });
}

const addNewTodo = (project) => {
    const newTitle = document.getElementById("newTitleBox").value;
    const newDesc = document.getElementById("newDescriptionBox").value;
    const newDate = document.getElementById("newDueDate").valueAsDate;
    const newPrio = document.getElementById("newPriority").value;
    project.addTodo(newTitle, newDesc, newDate, newPrio);
    renderProject(project);
}
