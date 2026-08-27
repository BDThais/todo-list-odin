import { Project, projectTab, Todo } from "../data_model/data-model";
import { removeForm } from "./init-form-tabs";

function getFormData(accumulator, name, formData) {
    const value = formData.get(name);
    accumulator[name] = value;
    return accumulator;
}

function todoDataExtraction(event, nameList, form) {
    event.preventDefault();
    const formData = new FormData(form);

    const formDataList = nameList.reduce((acc, ele) => getFormData(acc, ele, formData), {});
    console.log("Todo form data:");
    console.log(formDataList)

    const succeeded = form.editTarget
        ? projectTab.updateTodo(form.editTarget, formDataList)
        : projectTab.addTodo(new Todo(formDataList, nameList));
    if (succeeded) { removeForm(form.closest(".add-form-div")); }
}

function projectDataExtraction(event, nameList, form) {
    event.preventDefault();
    const formData = new FormData(form);

    const formDataList = nameList.reduce((acc, ele) => getFormData(acc, ele, formData), {});
    console.log("Project form data:");
    console.log(formDataList)

    const succeeded = form.editTarget
        ? projectTab.updateProject(form.editTarget, formDataList[nameList[0]])
        : projectTab.addProject(new Project(formDataList[nameList[0]]));
    if (succeeded) { removeForm(form.closest(".add-form-div")); }
}

function assignSubmitEvent(activeTab) {
    const form = activeTab.formElement;
    const nameList = activeTab.nameList;

    form.editTarget = activeTab.editTarget;
    form.addEventListener("submit", (event) => activeTab.dataExtract(event, nameList, form))

}

export { assignSubmitEvent, todoDataExtraction, projectDataExtraction }