import { format } from "date-fns";

export const renderProject = (project, showAddForm = 0) => {
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
    if (showAddForm) toggleAddTodoForm();
}

const printTodos = (project) => {
    //I'm returning an array of divs, each based on a todo using map
    //then joining them into one string with join("")
    //this fn returns that string
    let todoDivs = project.todos.toReversed().map(
        (todo) => {
            const info = todo.info;

            const id = info.id;
            const title = info.title;
            const desc = info.description;
            const dateStr = format(info.dueDate, "dd MMM yyyy");
            //this makes the first letter of the priority uppercase
            const prio = info.priority.slice(0, 1).toUpperCase() + info.priority.slice(1);
            const done = info.isCompleted;
            // prefix for the className on the complete button
            const prefix = done ? "" : "in";
            return `
            <div class="listedTodos" data-id=${id}>
                <h5>${title}</h5>
                <span class="minorTextProj">- ${prio} Priority, Due ${dateStr}</span>
                ${desc}
                <div class="formBtns">
                    <button id="completeBtn" class="${prefix}completeBtn">${done ? "Complete" : "Incomplete!"}</button>
                    <button id="editTodoBtn" class="editTodoBtn">Edit</button>
                    <button id="deleteBtn" class="deleteBtn">Delete</button>
                </div>
            </div >
            `;
        }
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
            <input id="dueDate" type="date" min="${format(Date.now(), "yyyy-MM-dd")}">
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

const deleteTodo = (event, project) => {
    const index = getIndex(event, project);
    project.removeTodo(index);
    renderProject(project);
}


//Fill in the values to the edit form
const populateEditTodoForm = (event, proj) => {
    const i = getIndex(event, proj);
    const oldInfo = proj.todos[i].info;
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

//Saves Changes to a Todo
const saveEdit = (event, prj) => {
    const i = getIndex(event, prj);

    const ttl = document.querySelector("#titleBox").value;
    const desc = document.querySelector("#descriptionBox").value;
    const date = document.querySelector("#dueDate").valueAsDate;
    const prio = document.querySelector("#priority").value;

    prj.editTodo(i, ttl, desc, date, prio);
    toggleEditTodoForm();
    //reload the page
    renderProject(prj);
}


//returns the index of a todo given the event and the project
const getIndex = (e, project) => {
    let todoDiv = e.currentTarget.parentElement.parentElement;
    let todoId = todoDiv.dataset.id;
    return project.getIndex(todoId);
}


const toggleAddTodoForm = () => { document.querySelector("#addTodoForm").classList.toggle("show") }
const toggleEditTodoForm = () => { document.querySelector(".overlay").classList.toggle("show") }

//Put all the event listeners on the buttons we need
const addTheEvents = (project) => {
    document.getElementById("saveAdd").addEventListener("click", () => { addNewTodo(project) });
    document.getElementById("addTodoBtn").addEventListener("click", toggleAddTodoForm);
    document.getElementById("cancelAdd").addEventListener("click", toggleAddTodoForm);
    //program all the todos' buttons with forEach
    //getElements doesn't return an array, so convert it to one with Array.from()
    const editButtons = Array.from(document.getElementsByClassName("editTodoBtn"));
    editButtons.forEach((editBtn) => {
        editBtn.addEventListener("click", (e) => { populateEditTodoForm(e, project) });
    });
    const deleteButtons = Array.from(document.getElementsByClassName("deleteBtn"));
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => { deleteTodo(e, project) });
    });
    document.getElementById("cancelEdit").addEventListener("click", toggleEditTodoForm);
    document.getElementById("saveEdit").addEventListener("click", (e) => saveEdit(e, project));
}
