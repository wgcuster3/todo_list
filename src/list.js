export class List {
    id;
    title;
    todoList;

    constructor (title, id = crypto.randomUUID(), todoList = []) {
        this.id = id;
        this.title = title;
        this.todoList = todoList;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    removeTodo(todo){
        const index = this.todoList.findIndex(t => t.id === todo.id);

        if (index !== -1){
            this.todoList.splice(index, 1);
        }

    }

    findTodo(todoId){
        return this.todoList.find(t => t.id === todoId);
    }
}