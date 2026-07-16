const openModalButton = document.querySelector(".open-modal-button");
const modalScreen = document.querySelector(".modal-screen");
const closeModalButton = document.querySelector(".close-modal-x");
const cancelButton = document.querySelector(".cancel");
const createTodoButton = document.querySelector(".create");
const todoInput = document.querySelector(".input");
const todosContainer = document.querySelector(".todos-container");

let todos = loadTodos();

openModalButton.addEventListener("click", toggleModal);
closeModalButton.addEventListener("click", toggleModal);
cancelButton.addEventListener("click", toggleModal);

createTodoButton.addEventListener("click", createTodo);

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createTodo();
  }
});

todosContainer.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete");

  if (!deleteButton) return;

  const todoElement = deleteButton.closest(".todo");
  const todoId = Number(todoElement.id);

  deleteTodo(todoId);
  todoElement.remove();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modalScreen.classList.contains("hidden")) {
    toggleModal();
  }
});

function loadTodos() {
  return JSON.parse(localStorage.getItem("todos") ?? "[]");
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo() {
  const title = todoInput.value.trim();

  if (!title) {
    alert("لطفا عنوان تودو را پر کنید! :)");
    return;
  }

  const newTodo = {
    id: Date.now(),
    title: title,
  };

  todos.push(newTodo);
  saveTodos();

  renderTodo(newTodo);

  todoInput.value = "";
  toggleModal();
}

function renderTodo(todo) {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo");
  todoElement.id = todo.id;

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-data");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;

  const todoActions = document.createElement("div");
  todoActions.classList.add("todo-buttons");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "حذف کردن";

  todoContent.append(todoTitle);
  todoActions.append(deleteButton);

  todoElement.append(todoContent, todoActions);

  todosContainer.append(todoElement);
}

function deleteTodo(todoId) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === todoId;
  });

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
}

function toggleModal() {
  modalScreen.classList.toggle("hidden");
  todoInput.value = "";
}

todos.forEach(renderTodo);
