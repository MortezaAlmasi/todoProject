const openModalButton = document.querySelector(".open-modal-button");
const modalScreen = document.querySelector(".modal-screen");
const modal = document.querySelector(".modal");
const closeModalX = document.querySelector(".close-modal-x");
const input = document.querySelector(".input");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create");
const todosContainer = document.querySelector(".todos-container");
openModalButton.addEventListener("click", toggleModal);

create.addEventListener("click", createTodo);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    createTodo();
  }
});
cancel.addEventListener("click", toggleModal);
closeModalX.addEventListener("click", toggleModal);
todosContainer.addEventListener("click", function (e) {
  const deleteButton = e.target.closest(".delete");
  if (deleteButton) {
    deleteButton.closest(".todo").remove();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalScreen.classList.contains("hidden")) {
    toggleModal();
    input.value = "";
  }
});
function createTodo() {
  if (input.value.trim() === "") {
    alert("لطفا عنوان تودو را پر کنید! :)");
    input.value = "";
  } else {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    const todoData = document.createElement("div");
    todoData.classList.add("todo-data");
    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");

    const todoButtons = document.createElement("div");
    todoButtons.classList.add("todo-buttons");
    const todoRemoveButton = document.createElement("button");
    todoRemoveButton.classList.add("delete");
    todoRemoveButton.textContent = "حذف کردن";
    todo.append(todoData, todoButtons);
    todoData.append(todoTitle);
    todoTitle.textContent = input.value;
    todoButtons.append(todoRemoveButton);
    todosContainer.append(todo);
    modalScreen.classList.add("hidden");
    input.value = "";
  }
}
function toggleModal() {
  modalScreen.classList.toggle("hidden");
  input.value = "";
}
