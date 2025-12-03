class Todo {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #isCompleted;

    constructor(title, des, ddate, prio) {
        this.#title = title;
        this.#description = des;
        this.#dueDate = ddate;
        this.#priority = prio;
        this.#isCompleted = false;
        this.#id = crypto.randomUUID();
    }

    complete() {
        this.#isCompleted = true;
    }
    uncomplete() {
        this.#isCompleted = false;
    }

    //takes in a newInfo object by assignment
    set setter(newInfo) {
        this.#title = newInfo.title;
        this.#description = newInfo.description;
        this.#dueDate = newInfo.dueDate;
        this.#priority = newInfo.priority;
    }
    get info() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            priority: this.#priority,
            isCompleted: this.#isCompleted,
            dueDate: this.#dueDate
        };

    }
}

export class Project {
    //This class will have a title and an array of todos in it
    constructor(title, description = "") {
        this.title = title;
        this.description = description;
        this.todos = [new Todo("eg Todo", "this is a placeholder todo for me to try and edit", new Date(2026, 4, 25), "high")];
        this.id = crypto.randomUUID();
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority));

    }

    removeTodo(id) {
        if (!this.todos.length) return;

        let index = this.todos.findIndex((td) => td.info.id === id);
        console.log(`Deleting To-do "${this.todos[index].info.title}"`);
        this.todos.splice(index, 1);
    }

    editTodo(index, title, description, dueDate, priority) {
        alert(`the index passed to the project.edit funtion is ${index}`);
        this.todos[index].setter = { title, description, dueDate, priority };
    }

    getIndex(id) {
        alert(`the id received by project.getIndex() is ${id}`);
        return this.todos.findIndex((td) => td.info.id === id);
    }

    get count() {
        return this.todos.length;
    }
}

//there should be a default project for when the user clicks to create a todo but has no projects.
export let AppArray = [new Project("default", "This is the default project. When you create a todo without a project it goes here.")];
