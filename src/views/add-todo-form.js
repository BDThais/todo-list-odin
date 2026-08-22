import { FormDisplay } from "./DOMView";
import { todoDataExtraction } from "../controllers/form-submit-controller";
import { activeProject } from "../controllers/active-project-handler";
import { activeProjField } from "./form-display-components";
import { createActiveProjectField } from "./form-display-components";

const nameList = ["title","description","dueDate","priority","dueDateMode"];

function createTodoTab() {
    const tabName = "todo";
    const dataExtract = todoDataExtraction;
    const todoTab = document.createElement("div");
    todoTab.classList.add("add-todo-div");

    const formElement = document.createElement("form");
    formElement.classList.add("add-todo-form");

    const titleField = FormDisplay.createTextInputField("Title", nameList[0]);
    const descField = FormDisplay.createTextAreaField("Description", nameList[1]);
    const dateField = FormDisplay.createDateInputField("Due Date", nameList[2]);
    const prioField = FormDisplay.createPrioritySelectionField("Priority", nameList[3]);

    activeProjField.fieldWrapper = createActiveProjectField(activeProject.getCurrentActive().name).fieldWrapper;
    activeProjField.newLabel.textContent = activeProject.getCurrentActive().name;

    const submitDiv = FormDisplay.createSubmitButton();
    formElement.appendChild(titleField);
    formElement.appendChild(descField);
    formElement.appendChild(dateField);
    formElement.appendChild(prioField);
    formElement.appendChild(activeProjField.fieldWrapper);
    formElement.appendChild(submitDiv.submitButtonDiv);
    todoTab.appendChild(formElement);
    return { todoTab, formElement, tabName, submitDiv, nameList, dataExtract };
}

function updateActiveField(projectName) {
    activeProjField.newLabel.textContent = "";
    const newField = createActiveProjectField(projectName);
    activeProjField.fieldWrapper.appendChild(newField.newLabel);
}

export { createTodoTab, updateActiveField, nameList };