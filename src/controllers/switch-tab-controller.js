import { initProjectTab, initTodoTab } from "./init-form-tabs";
import { getActiveTab } from "./init-form-tabs";
import { removeForm } from "./init-form-tabs";

function switchToNone(form) {
    removeForm(form)
    console.log(getActiveTab());
}

function switchToProject(content) {
    initProjectTab(content);
    console.log(getActiveTab().tabName);
}

function switchToTodo(content) {
    initTodoTab(content);
    console.log(getActiveTab().tabName);
}

function assignSwitchEvent(addForm) {
    addForm.projectTab.addEventListener("click", () => switchToProject(addForm.formContent));
    addForm.todoTab.addEventListener("click", () => switchToTodo(addForm.formContent));
    addForm.exitForm.addEventListener("click", () => switchToNone(addForm.formDiv));
}

export { assignSwitchEvent, switchToProject, switchToTodo, switchToNone };