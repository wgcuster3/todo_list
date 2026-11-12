export class Todo {
    id;
    title;
    description;
    dueDate;
    priority;
    done;

    constructor (title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }
}

export function toggleDone(todo){
    todo.done = !todo.done;
}

export function updateTodo(todo, title, description, dueDate, priority){
     todo.title = title;
     todo.description = description;
     todo.dueDate = dueDate;
     todo.priority = priority;
}