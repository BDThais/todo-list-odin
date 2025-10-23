import { projectTab } from "../data_model/data-model";

function updateStatusView(status) {
    if (status) {return "🟢";}
    else if (!status) {return "🔴";}
}

function createTodoDiv(todo) {
    const todoDiv = document.createElement('div');
    const title = document.createElement('div');
    const description = document.createElement('div');
    const dueDate = document.createElement('div');
    const priority = document.createElement('div');
    const status = document.createElement('div');
    const deleteButton = document.createElement('button');

    todoDiv.classList.add("todo-view-div");
    title.classList.add("todo-title-card");
    description.classList.add("todo-description-card");
    dueDate.classList.add("todo-due-date-card");
    priority.classList.add("todo-priority-card");
    status.classList.add("todo-status-card");
    deleteButton.classList.add("todo-delete-card");
    deleteButton.setAttribute("type", "button");

    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = `Due Date: ${todo.dueDate}`;
    priority.textContent = `Difficulty: ${todo.priority}`;
    status.textContent = updateStatusView(todo.isCompleted);
    deleteButton.textContent = "🗑️";

    todoDiv.appendChild(title);
    todoDiv.appendChild(description);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(priority);
    todoDiv.appendChild(status);
    todoDiv.appendChild(deleteButton);

    return { todoDiv, deleteButton, status };
}

function updateTodoTab() {
    const todoTabContent = document.querySelector(".todo-tab-content");
    todoTabContent.innerHTML = "";

    if (projectTab.getTodo() !== false) {
        projectTab.getTodo().forEach(element => {
            const todo = createTodoDiv(element);
            todo.deleteButton.addEventListener("click", () => projectTab.deleteTodo(element));
            todo.status.addEventListener("click", () => projectTab.changeTodoStatus(element));
            todoTabContent.appendChild(todo.todoDiv);
        });
    }
}

export { updateTodoTab, }