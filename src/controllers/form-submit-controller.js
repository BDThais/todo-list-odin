import { Project, projectTab, Todo } from "../data_model/data-model";

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

    const todoObj = new Todo (formDataList,nameList);
    projectTab.addTodo(todoObj);
}

function projectDataExtraction(event, nameList, form) {
    event.preventDefault();
    const formData = new FormData(form);

    const formDataList = nameList.reduce((acc, ele) => getFormData(acc, ele, formData), {});
    console.log("Project form data:");
    console.log(formDataList)

    const projName = new Project (formDataList[nameList[0]]);
    projectTab.addProject(projName);
}

function assignSubmitEvent(activeTab) {
    const form = activeTab.formElement;
    const nameList = activeTab.nameList;

    form.addEventListener("submit", (event) => activeTab.dataExtract(event, nameList, form))

}

export { assignSubmitEvent, todoDataExtraction, projectDataExtraction }