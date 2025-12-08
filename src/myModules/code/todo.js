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

    //toggles Completion
    complete() {

        if (this.#isCompleted)
            this.#isCompleted = false;
        else
            this.#isCompleted = true;

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
        this.todos = [];
        // this.todos = [new Todo("eg Todo", "placeholder todo", new Date("2026-05-25T23:59:00"), 1)];
        this.id = crypto.randomUUID();
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority));
        this.todos.sort((a, b) => a.info.priority - b.info.priority);
    }

    removeTodo(index) {
        if (!this.todos.length) return;

        console.log(`Deleting To-do "${this.todos[index].info.title}"`);
        this.todos.splice(index, 1);
    }

    editTodo(index, title, description, dueDate, priority) {
        this.todos[index].setter = { title, description, dueDate, priority };
        this.todos.sort((a, b) => a.info.priority - b.info.priority);
    }

    getIndex(id) {
        return this.todos.findIndex((td) => td.info.id === id);
    }

    toggleCompletion(index) {
        this.todos[index].complete();
    }
}

//there should be a default project for when the user clicks to create a todo but has no projects.
export let AppArray = [new Project("default", "This is the default project. When you create a todo without a project it goes here.")];
