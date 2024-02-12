"use strict";
const form = document.querySelector(".form");
const todoContainer = document.querySelector(".container-todo");
let data = [];
////////////////////////////////////////////
const model = function (input) {
  let id;
  class TODO {
    constructor(input, id) {
      this.description = input.value;
      this.id = id;
    }
  }
  id = data.length > 0 ? data.at(-1).id + 1 : 0;
  const todoDAta = new TODO(input, id);
  data.push(todoDAta);
  return todoDAta;
};

const displayTodo = function (todo) {
  const html = `
    <p id="${
      todo.id
    }"><button class="font"><i class="fa-solid fa-xmark"></i></button><span>${
    todo.id + 1
  }</span>${todo.description}</p>
    `;
  todoContainer.insertAdjacentHTML("beforeend", html);
};

const clear = (input) => {
  input.value = "";
  input.focus();
};


const setLocalStorage = function () {
  localStorage.setItem("data", JSON.stringify(data));
};

const getlocalStorage = function () {
  const localdata = JSON.parse(localStorage.getItem("data"));
  if (!localdata) return;
  data = localdata;
  data.forEach((el) => {
    displayTodo(el);
  });
};
getlocalStorage();

const controller = function () {
  const addData = function (e) {
    e.preventDefault();
    //getting input value
    const input = document.querySelector(".input");
    if (!input.value) return;
    //creating todo object and add to data
    const todo = model(input);
    //Dispalying data
    displayTodo(todo);
    //clear input feild
    clear(input);
    //set data to lacal storage
    setLocalStorage();
  };

  const deleteData = function (e) {
    const btn = e.target.closest(".font");
    if (!btn) return;
    //Getting ELEMENT that going to delelte 
    const todoDelete = btn.closest("p");
    const deleteID = todoDelete.getAttribute("id");
    const deleteIndex = data.findIndex((el) => el.id === +deleteID);
    //removing the todo
    data.splice(deleteIndex, 1);
    //clear the list
    todoContainer.innerHTML = "";
    //updating the list
    data.forEach((el) => {
      displayTodo(el);
    });
    setLocalStorage();
  };

  form.addEventListener("submit", addData);
  todoContainer.addEventListener("click", deleteData);
};
controller();



