class Todo {

    constructor(title, des, ddate, prio) {
        this.title = title;
        this.description = des;
        this.dueDate = ddate;
        this.priority = prio;

        //set to incomplete by default
        this.isCompleted = false;
        this.id = crypto.randomUUID();
    }

    //toggles Completion
    complete() {

        if (this.isCompleted)
            this.isCompleted = false;
        else
            this.isCompleted = true;

    }

    //takes in a newInfo object by assignment
    set setter(newInfo) {
        this.title = newInfo.title;
        this.description = newInfo.description;
        this.dueDate = newInfo.dueDate;
        this.priority = newInfo.priority;
    }

    //used this getter because the fields were private at first
    //but that made saving to localStorage very hard, so I made them public
    //left this how it was since a lot of code was built using it 

    get info() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            isCompleted: this.isCompleted,
            dueDate: this.dueDate
        };

    }
    //function that takes a plain stringified todo and returns a proper one, adding methods
    static fromJSON(plain) {
        const realTodo = new Todo(plain.title, plain.description, plain.dueDate, plain.priority);
        realTodo.isCompleted = plain.isCompleted;
        realTodo.id = plain.id;

        return realTodo;
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
        console.log(`adding the todo ${title}`);
        this.todos.push(new Todo(title, description, dueDate, priority));

        //sorts todos according to priority
        this.todos.sort((a, b) => a.info.priority - b.info.priority);
        //saves to local storage after creating new Todo
        setStorage();
    }

    removeTodo(index) {
        if (!this.todos.length) return;

        console.log(`Deleting To-do "${this.todos[index].info.title}"`);
        this.todos.splice(index, 1);

        //saves to local storage after deleting Todo
        setStorage();
    }

    editTodo(index, title, description, dueDate, priority) {
        //use the setter method from Todo to take in new info
        this.todos[index].setter = { title, description, dueDate, priority };

        //sort them again
        this.todos.sort((a, b) => a.info.priority - b.info.priority);
    }

    getIndex(id) {
        return this.todos.findIndex((td) => td.info.id === id);
    }

    toggleCompletion(index) {
        this.todos[index].complete();
    }

    //take a plain project and return a proper one with all properties
    static fromJSON(plain) {
        const realProject = new Project(plain.title, plain.description);
        realProject.todos = plain.todos.map(todo => Todo.fromJSON(todo));
        realProject.id = plain.id;
        return realProject;
    }
}

//declare the AppArray which contains the projects,
//Therefore representing the entirety of the data for this todo list
export let AppArray = [];



export function setStorage() {
    console.log("setting local storage");
    //This JSON.stringify function makes the data storable and displayable
    //however it removes any functions.
    //These functions have to be re added
    localStorage.setItem("wholeApp", JSON.stringify(AppArray));
    console.log("we just stored the below array");
    console.log(JSON.parse(localStorage.getItem("wholeApp")));
}

export function getStorage() {
    if (localStorage.getItem("wholeApp")) {
        console.log("retrieving data from localStorage");

        //return the parsed data but without methods
        let parsedArray = JSON.parse(localStorage.getItem("wholeApp"));

        //add methods to it so it is ready now
        AppArray = parsedArray.map(project => Project.fromJSON(project));
    } else {
        //the original default behaviour of AppArray
        console.log("loading default AppArray");

        //there should be a default project for when the user clicks to create a todo but has no projects.
        AppArray = [new Project("default", "This is the default project. When you create a todo without a project it goes here.")];
        console.log(`AppArray is ${JSON.stringify(AppArray)}`);
    }
}
