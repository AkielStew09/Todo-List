export class Todo {
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
        this.id = crypto.randomUUID();
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority));

    }

    removeTodo(id) {
        //if there are no todos
        if (!this.todos.length) return;

        this.todos.forEach((todo_, index) => {
            //walk through the array until we find the right one, delete it and end the function
            if (todo_.info.id === id) todo_ = null;
            this.todos.splice(index, 1);

            return;
        });
    }

    get count() {
        return this.todos.length;
    }
}

//there should be a default project for when the user clicks to create a todo but has no projects.
export let AppArray = [new Project("Project Title", "This is a real todo. If someone uploads something, it goes here. I want to show this on the page")];
