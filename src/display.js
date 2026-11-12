import { format, parseISO } from 'date-fns';

export function displayTodos(container, list, currentListDisplay){
    displayCurrentListName(currentListDisplay, list);

    container.replaceChildren();

    for (const todo of list.todoList) {
      displaySingleTodo(container, todo);
    }
}

function displaySingleTodo(container, todo) {
    const div = document.createElement('div');
    div.dataset.id = todo.id
    div.classList.add("todo", `priority-${todo.priority}`);

    if (todo.done) {
        div.classList.add("done");
    }

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.classList.add("todo-checkbox");

    const todoDiv = document.createElement('div');
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.textContent = todo.title;

    const date = new Date(todo.dueDate);
    p.textContent = todo.dueDate
      ? format(parseISO(todo.dueDate), "MMMM do, yyyy")
      : "No due date";

    todoDiv.append(h4, p);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    div.append(checkbox, todoDiv, editButton, deleteButton);

    container.appendChild(div);
}

export function displayCurrentListName(currentListName, list){
    currentListName.textContent = list.title;
}

export function displayLists(container, listArr){
    container.replaceChildren();

    listArr.forEach((list, index) => {
        //The first list (Inbox) can't be deleted, so it gets no delete button
        displaySingleList(container, list, index !== 0);
    });
}

export function displaySingleList(container, list, deletable = true){
    const li = document.createElement('li');
    li.dataset.id = list.id;

    const name = document.createElement('span');
    name.classList.add("list-name");
    name.textContent = list.title;

    const count = document.createElement('span');
    count.classList.add("list-count");
    count.textContent = list.todoList.length;

    li.append(name, count);

    if (deletable) {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-list-btn");
        deleteBtn.textContent = "x";
        deleteBtn.setAttribute("aria-label", `Delete ${list.title}`);
        li.append(deleteBtn);
    } else {
        //Empty spot the same width as the delete button so counts line up
        const placeholder = document.createElement('span');
        placeholder.classList.add("delete-list-placeholder");
        li.append(placeholder);
    }

    container.appendChild(li);
}