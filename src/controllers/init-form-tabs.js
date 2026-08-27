import { createProjectTab } from "../views/add-project-form";
import { createTodoTab } from "../views/add-todo-form";
import { assignSubmitEvent } from "./form-submit-controller";

let activeTab = false;

function getActiveTab() {
    if (activeTab) { return activeTab; }
    else { return false }
}

function initProjectTab(content, editTarget) {
    activeTab = createProjectTab(editTarget);
    assignSubmitEvent(activeTab);
    content.innerHTML = "";
    content.appendChild(activeTab.projectTab);
}

function initTodoTab(content, editTarget) {
    activeTab = createTodoTab(editTarget);
    assignSubmitEvent(activeTab);
    content.innerHTML = "";
    content.appendChild(activeTab.todoTab);
}

function removeForm(form) {
    form.remove();
    activeTab = false;
}

export { initProjectTab, initTodoTab, getActiveTab, removeForm };