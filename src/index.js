import "./styles.css";
import { loadHome } from "./home.js";

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

const contentDiv = document.getElementById("content");

//Load the home page as the initial load
loadHome(contentDiv);

const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", function() {
        loadHome(contentDiv);
    });