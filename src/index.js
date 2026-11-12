import "./styles.css";
import { Todo, toggleDone, updateTodo } from "./todo.js";
import { List } from "./list.js";
import { saveLists } from "./storage.js";
import { loadLists } from "./storage.js";
import * as display from "./display.js";

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

//Declare page elements created in template.html
const listContainer = document.getElementById("listContainer");
const todoContainer = document.getElementById("todoContainer");
const currentListDisplay = document.getElementById("currentListDisplay");
const addListBtn = document.getElementById("addListBtn");
const addTodoBtn = document.getElementById("addTodoBtn");
const dialog = document.getElementById("todoDialog");

//This will hold the todo which that is currently being edited.
//It is set when an edit button is pressed  
let editingTodo = null;

//Load the current data from localstorage.  
//If no data exists it will just create the default inbox list
const listArray = loadLists();

//This variable will hold the current list.  Upon page load
//it will default to inbox which will always be the first list
let currentList = listArray[0];

display.displayLists(listContainer, listArray);
display.displayTodos(todoContainer, currentList, currentListDisplay);

addListBtn.addEventListener("click", function() {
  const listName = prompt("Enter list name");
  
  if (listName !== null && listName !== ""){
    const newList = new List(listName);
    listArray.push(newList);
    display.displaySingleList(listContainer, newList);
  }
  
  saveLists(listArray);
});

//Set up an event listener to switch current list
listContainer.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;
  
  if (e.target.matches(".delete-list-btn")) {
    //If deleting the current list reassign it back
    //to inbox
    if (currentList.id === id){
      currentList = listArray[0];
    }

    const index = listArray.findIndex(t => t.id === id);

    if (index !== -1){
      listArray.splice(index, 1);
    }
    saveLists(listArray);
    display.displayLists(listContainer, listArray);
    display.displayTodos(todoContainer, currentList, currentListDisplay);
  } else {
    currentList = listArray.find(l => l.id === id);
    display.displayTodos(todoContainer, currentList, currentListDisplay);
  }
});

//Set up event listeners to display the dialog
addTodoBtn.addEventListener("click", function() {
  editingTodo = null;
  form.reset();
  document.getElementById("dialogLabel").textContent = "New Todo";
  dialog.showModal();
});

todoContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".todo");
  if (!card) return;

  const todo = currentList.findTodo(card.dataset.id);

  if (e.target.matches(".edit-btn")) {
    openEditDialog(todo);
  } else if (e.target.matches(".delete-btn")) {
    deleteTodo(todo);
  }
});

function openEditDialog(todo) {  
  editingTodo = todo;

  //prefill dialog with current values
  document.getElementById("dialogLabel").textContent = "Edit Todo";
  document.getElementById("dialogTitle").value = todo.title;
  document.getElementById("dialogDesc").value = todo.description;
  document.getElementById("dialogDueDate").value = todo.dueDate;
  document.getElementById("dialogPriority").value = todo.priority;

  dialog.showModal();
}

function deleteTodo(todo) {
  currentList.removeTodo(todo);
  saveLists(listArray);
  display.displayLists(listContainer, listArray);
  display.displayTodos(todoContainer, currentList, currentListDisplay);
}

//Set up event listener when checkmarking a todo for completion
todoContainer.addEventListener("change", (e) => {
  if (!e.target.matches(".todo-checkbox")) return;
  
  const id = e.target.closest(".todo").dataset.id;
  const todo = currentList.findTodo(id);

  toggleDone(todo);
  e.target.closest(".todo").classList.toggle("done", todo.done);
  saveLists(listArray);
});

//Set eventlistener for the form submit.
//It can come from mulltiple places.
const form = dialog.querySelector("form");

form.addEventListener("submit", (e) => {
  const title = document.getElementById("dialogTitle").value;
  const description = document.getElementById("dialogDesc").value;
  const dueDate = document.getElementById("dialogDueDate").value;
  const priority = document.getElementById("dialogPriority").value;
  
  if (editingTodo){
    updateTodo(editingTodo, title, description, dueDate, priority);
  } else {
    currentList.addTodo(new Todo(title, description, dueDate, priority));
  }

  display.displayLists(listContainer, listArray);
  display.displayTodos(todoContainer, currentList, currentListDisplay);
  saveLists(listArray);
  form.reset();
});