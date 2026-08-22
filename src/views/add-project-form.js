import { FormDisplay } from "./DOMView";
import { projectDataExtraction } from "../controllers/form-submit-controller";

function createProjectTab() {
    const tabName = "project";
    const dataExtract = projectDataExtraction;
    const projectTab = document.createElement("div");
    projectTab.classList.add("add-project-div");

    const formElement = document.createElement("form");
    formElement.classList.add("add-project-form");
    //formElement.setAttribute("method", "POST");
    const nameList = ["project-name"]
    const nameField = FormDisplay.createTextInputField("Project Name", nameList[0]);

    const submitDiv = FormDisplay.createSubmitButton();

    formElement.appendChild(nameField);
    formElement.appendChild(submitDiv.submitButtonDiv);
    projectTab.appendChild(formElement);

    return { projectTab, formElement, tabName, submitDiv, nameList, dataExtract };
}

export { createProjectTab };