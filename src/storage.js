import { List } from "./list.js";

export function saveLists(listArray){
    try {
      localStorage.setItem("lists", JSON.stringify(listArray));
      console.log("Save Successfull!");
    } catch {
        alert("Could not save!");
    }
}

export function loadLists() {
    try {
      const jsonListArray = localStorage.getItem("lists");

      if (!jsonListArray) {
        return [(new List("Inbox"))];
      }

      return JSON.parse(jsonListArray).map(
        list => new List(list.title, list.id, list.todoList)
      );
    } catch {
      return [(new List("Inbox"))];
    }
}