import { createAddForm } from "../views/add-form";
import { initProjectTab, initTodoTab } from "./init-form-tabs";
import { assignSwitchEvent } from "./switch-tab-controller";

function initEditForm(type, target) {
    const form = createAddForm();
    const addForm = {
        projectTab: form.formNav.projectTab,
        todoTab: form.formNav.todoTab,
        exitForm: form.addForm.exitButton,
        formContent: form.addForm.formContent,
        formDiv: form.addForm.formDiv,
    };

    if (type === "project") {
        initProjectTab(addForm.formContent, target);
        addForm.todoTab.style.display = "none";
    }
    else {
        initTodoTab(addForm.formContent, target);
        addForm.projectTab.style.display = "none";
    }
    assignSwitchEvent(addForm);
}

export { initEditForm };