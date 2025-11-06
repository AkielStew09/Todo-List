export class Todo{
    #id;
    #name;
    #description;
    #priority;
    #isCompleted;
    #dueDate;

    constructor(name, priority){
        this.#name = name.trim();
        this.#priority = priority;
        this.#isCompleted = false;
        this.#id = crypto.randomUUID();
    }

    set priority(prio){
        this.#priority = prio;
    }

    set description(des){
        this.#description = des;
    }

    set dueDate(ddate){
        this.#dueDate = ddate;
    }

    complete(){
        this.#isCompleted = true;
    }
    uncomplete(){
        this.#isCompleted = false;
    }


    get info(){
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            priority: this.#priority,
            isCompleted: this.#isCompleted,
            dueDate: this.#dueDate
        };
    }
}
