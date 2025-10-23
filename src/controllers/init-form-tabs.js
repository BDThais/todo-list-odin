import { createProjectTab } from "../views/add-project-form";
import { createTodoTab } from "../views/add-todo-form";
import { assignSubmitEvent } from "./form-submit-controller";

let activeTab = false;

function getActiveTab() {
    if (activeTab) { return activeTab; }
    else { return false }
}

function initProjectTab(content) {
    activeTab = createProjectTab();
    assignSubmitEvent(activeTab);
    content.innerHTML = "";
    content.appendChild(activeTab.projectTab);
}

function initTodoTab(content) {
    activeTab = createTodoTab();
    assignSubmitEvent(activeTab);
    content.innerHTML = "";
    content.appendChild(activeTab.todoTab);
}

function removeForm(form) {
    form.remove();
    activeTab = false;
}

export { initProjectTab, initTodoTab, getActiveTab, removeForm };