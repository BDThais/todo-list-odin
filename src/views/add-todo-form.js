import { FormDisplay } from "./DOMView";
import { todoDataExtraction } from "../controllers/form-submit-controller";
import { activeProject } from "../controllers/active-project-handler";
import { activeProjField } from "./form-display-components";
import { createActiveProjectField } from "./form-display-components";

const nameList = ["title","description","dueDate","priority","dueDateMode"];

function createTodoTab(editTarget) {
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

    if (editTarget) {
        titleField.querySelector("input").value = editTarget.title;
        descField.querySelector("textarea").value = editTarget.description;
        dateField.querySelector("select").value = editTarget.dueDate === "Daily" ? "Daily" : "Specific date";
        dateField.querySelector("input").value = editTarget.dueDate === "Daily" ? "" : editTarget.dueDate;
        dateField.querySelector("input").disabled = editTarget.dueDate === "Daily";
        dateField.querySelector("input").required = editTarget.dueDate !== "Daily";
        prioField.querySelector("select").value = editTarget.priority;
    }

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
    return { todoTab, formElement, tabName, submitDiv, nameList, dataExtract, editTarget };
}

function updateActiveField(projectName) {
    activeProjField.newLabel.textContent = "";
    const newField = createActiveProjectField(projectName);
    activeProjField.fieldWrapper.appendChild(newField.newLabel);
}

export { createTodoTab, updateActiveField, nameList };