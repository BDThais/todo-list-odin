import { createAddForm } from "../views/add-form";
import { assignSwitchEvent, switchToProject } from "./switch-tab-controller";
import { getActiveTab } from "./init-form-tabs";

function initAddForm() {
    if (!(getActiveTab())) {
        const form = createAddForm();
        const addForm = {
            projectTab: form.formNav.projectTab,
            todoTab: form.formNav.todoTab,
            exitForm: form.addForm.exitButton,
            formContent: form.addForm.formContent,
            formDiv: form.addForm.formDiv,
        }
        switchToProject(addForm.formContent);
        assignSwitchEvent(addForm);
    }
}

export { initAddForm };