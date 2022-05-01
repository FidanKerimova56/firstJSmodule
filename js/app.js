const form = document.getElementById("formSubmit");
const todoInput = document.getElementById("todo-input");
const element = document.getElementsByTagName("ol")[0];
const todoContainer = document.getElementById("container-todo");
const sortButton = document.getElementById("icon-sorter");
const searchInput = document.getElementById("search");
const deleteAllButton = document.getElementById("delete-all");
let edit = document.querySelectorAll("fa-pen-to-square");

let isDisabledSearch;
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTask);
  element.addEventListener("click", deleteValuesFromUIAndStorage);
  sortButton.addEventListener("click", sortTodosIfDefined);
  searchInput.addEventListener("keyup", filterData);
  deleteAllButton.addEventListener("click", clearUIAndStorage);
  document.addEventListener("DOMContentLoaded", add_UIFromStorage);
}

function addTask(e) {
  let newTodo =
    todoInput.value.trim().length > 0 ? todoInput.value.trim() : null;
  let lowerNewTodo = newTodo ? newTodo.toLowerCase() : null;

  let todos = getTodosFromStorage();
  let lowerTodos;

  if (todos) {
    lowerTodos = todos.map(function (todo) {
      return todo.toLowerCase();
    });
  }

  if (newTodo && todoContainer) {
    if (lowerTodos.indexOf(newTodo) === -1) {
      addUI(newTodo);
      addTodosToStorage(newTodo);
    } else {
    }

    clearInput(todoInput, todoContainer);
  } else if (todoContainer.style.display === "none") {
    todoContainer.style.display = "block";
  } else {
    alert("please add an item");
  }

  e.preventDefault();
}

function addUI(paramsTodo) {
  element.innerHTML += `

  <li class="input-cont">
     <p id="edit-p" class="list-style li-value">${paramsTodo}</p>
      <div class="delete-icon">
          <a class="editAndDelete" href="#">
              <i class="fa-solid fa-pen-to-square"></i>
              <i id="pl-11" class="fa-solid fa-circle-xmark"></i>
          </a>
      </div>
  </li>

  `;

  if (searchInput.getAttribute("disabled")) {
    searchInput.removeAttribute("disabled");
    localStorage.removeItem("searchKey");
  }
}

function clearInput(paramsInput, paramsContainer) {
  paramsInput.value = "";
  paramsContainer.style.display = "none";
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodosToStorage(paramsTodo) {
  let todos = getTodosFromStorage();
  todos.push(paramsTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function add_UIFromStorage() {
  let todos = getTodosFromStorage();

  if (localStorage.getItem("searchKey") || todos.length === 0) {
    searchInput.setAttribute("disabled", "disabled");
  } else {
    todos.forEach(function (todo) {
      addUI(todo);
    });
  }
}

function deleteValuesFromUIAndStorage(e) {
  let targetSpace = e.target;
  if (targetSpace.className === "fa-solid fa-circle-xmark") {
    targetSpace.parentElement.parentElement.parentElement.remove();
    let clickedContent =
      targetSpace.parentElement.parentElement.previousElementSibling.textContent.trim();
    deleteValuesFromStorage(clickedContent);
    if (getTodosFromStorage().length === 0) {
      searchInput.setAttribute("disabled", "disabled");
    }
  } else if (targetSpace.className === "fa-solid fa-pen-to-square") {
    if (
      targetSpace.parentElement.parentElement.previousElementSibling
        .contentEditable === "false"
    ) {
      targetSpace.parentElement.parentElement.previousElementSibling.contentEditable = true;
      targetSpace.parentElement.parentElement.previousElementSibling.addEventListener(
        "keyup",
        function (e) {
          if (e.key === "Enter") {
            targetSpace.parentElement.parentElement.previousElementSibling.contentEditable = false;
            editValueFromStorageAsyncUI(
              targetSpace.parentElement.parentElement.previousElementSibling.textContent.trim()
            );
          }
        }
      );

      editValueFromStorageAsyncUI(
        targetSpace.parentElement.parentElement.previousElementSibling.textContent.trim()
      );
    } else {
      targetSpace.parentElement.parentElement.previousElementSibling.contentEditable = false;
    }
  }
}

function editValueFromStorageAsyncUI(paramsTextContent) {
  let lists = Array.from(document.querySelectorAll(".list-style.li-value")).map(
    (li) => li.textContent.trim()
  );

  let tasks = [...lists];

  localStorage.setItem("todos", JSON.stringify(tasks));
}

function deleteValuesFromStorage(paramsTextContent) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === paramsTextContent) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function sortTodosIfDefined() {
  let todos = getTodosFromStorage().sort();
  let reverseTodos = [...todos].reverse();

  if (todos && todos.length > 0) {
    if (this.className === "fa-solid fa-arrow-down-short-wide") {
      this.className = "fa-solid fa-arrow-up-short-wide";
      while (element.firstElementChild !== null) {
        element.removeChild(element.firstElementChild);
      }

      todos.forEach(function (todo) {
        addUI(todo);
      });
    } else {
      this.className = "fa-solid fa-arrow-down-short-wide";
      while (element.firstElementChild !== null) {
        element.removeChild(element.firstElementChild);
      }

      reverseTodos.forEach(function (todo) {
        addUI(todo);
      });
    }
  }
}

function filterData() {
  let searchedTodo = searchInput.value.trim().toLowerCase();

  let todos = Array.from(document.querySelectorAll("li"));

  if (getTodosFromStorage().length > 0) {
    todos.forEach(function (todo) {
      let text = todo.firstElementChild.textContent.trim().toLowerCase();

      if (text.indexOf(searchedTodo) === -1) {
        todo.setAttribute("style", "display:none");
      } else {
        todo.setAttribute("style", "display:flex");
      }
    });
  } else {
    alert("no any data to filter");
    searchInput.value = "";
    searchInput.setAttribute("disabled", "disabled");
    localStorage.setItem("searchKey", "disabled");
  }
}

function clearUIAndStorage() {
  let todos = getTodosFromStorage();

  if (confirm("are you sure delete todos ?")) {
    if (todos && todos.length > 0) {
      while (element.firstElementChild !== null) {
        element.removeChild(element.firstElementChild);
      }
      alert(`${todos.length} eded todo sildiniz`);
      localStorage.clear();
    } else {
      alert("no any todo");
    }
  } else {
    alert("true choise build your future");
  }
}
const ol = document.querySelector("ol")
new Sortable(ol,{
  Animation:300
})
