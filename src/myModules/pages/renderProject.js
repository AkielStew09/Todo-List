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
                    <button id="completeBtn" class="${prefix}completeBtn switch">${done ? "Complete" : "Incomplete!"}</button>
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
    //get today's date in the accepted string format. 
    //then set that as the minimum and default value for the datePicker
    //so I never get a null value from this date input
    const minDate = format(Date.now(), "yyyy-MM-dd");
    return `
    <div id="addTodoForm" class="listedTodos addTodoForm">
        <h4>Add a New Todo</h4>
        <input id="newTitleBox" type="text" placeholder="Title:" class="todoTextbox">
        <br>
        <textarea id="newDescriptionBox" placeholder="Description:" rows="3" cols="43"></textarea>
        <label for="dueDate">Due Date:</label>
        <br>
        <input id="newDueDate" type="date" min="${minDate}" value="${minDate}"> 
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
    const minDate = format(Date.now(), "yyyy-MM-dd");
    return `
    <div class="overlay">
        <div id = "editTodoForm" class="listedTodos editTodoForm">
            <h4>Edit Todo</h4>
            <input id="titleBox" type="text" placeholder="Title" class="todoTextbox">
            <br>
            <textarea id="descriptionBox" placeholder="Description" rows="3" cols="43"></textarea>
            <label for="dueDate">Due Date:</label>
            <br>
            <input id="dueDate" type="date" min="${minDate}">
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
//ADD
const addNewTodo = (project) => {
    //.value gives a date string and I add the T stuff so it doesn't assume UTC midnight
    const dateString = document.getElementById("newDueDate").value + "T23:59:00";

    const newTitle = document.getElementById("newTitleBox").value;
    const newDesc = document.getElementById("newDescriptionBox").value;
    const newDate = new Date(dateString);
    const newPrio = document.getElementById("newPriority").value;
    //make new todo based on form input
    project.addTodo(newTitle, newDesc, newDate, newPrio);
    //reload the page
    renderProject(project);
}


//DELETE
const deleteTodo = (event, project) => {
    const index = getIndex(event, project);
    let result = confirm(`You are about to delete the todo "${project.todos[index].info.title}".`);
    if (result) {
        project.removeTodo(index);
        renderProject(project);
    } else
        return;
}

//TOGGLE COMPLETE
const completeTodo = (event, project) => {
    //get the index
    const index = getIndex(event, project);
    //complete or uncomplete the todo given the index
    project.toggleCompletion(index);
    //reload page to show completion change
    renderProject(project);
}

//EDIT
const saveEdit = (event, prj) => {
    //retrieve the new info inputted
    const ttl = document.querySelector("#titleBox").value;
    const desc = document.querySelector("#descriptionBox").value;
    let dateInput = document.querySelector("#dueDate").value;
    const prio = document.querySelector("#priority").value;
    //add the T time part so it doesn't default to 
    //UTC midnight, which implies the previous day for Jamaica,
    //which sets the date back a day
    let dateString = dateInput + "T23:59:00";
    const date = new Date(dateString);

    const index = getIndex(event, prj);
    prj.editTodo(index, ttl, desc, date, prio);
    toggleEditTodoForm();
    //reload the page
    renderProject(prj);
}

//Fill in the values of the edit form
const populateEditTodoForm = (event, proj) => {
    const index = getIndex(event, proj);
    //retrieve the todo's old info
    const oldInfo = proj.todos[index].info;

    //retrieve the whole form div so I can give it a data attribute to store the todo id
    const edForm = document.querySelector("#editTodoForm");
    //retrieve the input elements
    const titleBox = document.querySelector("#titleBox");
    const descriptionBox = document.querySelector("#descriptionBox");
    const datePicker = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    //set the data attribute and show the old input values
    edForm.dataset.id = oldInfo.id;
    titleBox.value = oldInfo.title;
    descriptionBox.value = oldInfo.description;
    datePicker.value = format(oldInfo.dueDate, "yyyy-MM-dd");
    priority.value = oldInfo.priority;
    toggleEditTodoForm();
}

//return the index of a todo given the event and the project
const getIndex = (e, project) => {
    let todoDiv = e.currentTarget.parentElement.parentElement;
    let todoId = todoDiv.dataset.id;
    return project.getIndex(todoId);
}

//functions for showing the add and edit forms
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

    const completeButtons = Array.from(document.getElementsByClassName("switch"));
    completeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => { completeTodo(e, project) });
    });
    document.getElementById("saveEdit").addEventListener("click", (e) => saveEdit(e, project));
    document.getElementById("cancelEdit").addEventListener("click", toggleEditTodoForm);
}
