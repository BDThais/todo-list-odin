function createHeaderNav() {
    const headerNav = document.createElement("nav");
    headerNav.classList.add("add-form-nav");
    const projectTab = document.createElement("div");
    projectTab.setAttribute("id", "project-tab-button")
    projectTab.innerHTML = "Chapter";
    const todoTab = document.createElement("div");
    todoTab.setAttribute("id", "todo-tab-button")
    todoTab.innerHTML = "Order";

    headerNav.appendChild(projectTab);
    headerNav.appendChild(todoTab);

    return { headerNav, projectTab, todoTab };
}

function createAddFormLayout(headerNav) {
    const body = document.querySelector("body");

    const formDiv = document.createElement("div");
    formDiv.classList.add("add-form-div");

    const formHeader = document.createElement("div");
    formHeader.classList.add("add-form-header");

    const exitButton = document.createElement("button");
    exitButton.classList.add("form-exit");
    exitButton.setAttribute("type", "button");
    exitButton.innerHTML = "×";

    const formContent = document.createElement("div");
    formContent.classList.add("add-form-content");

    formHeader.appendChild(headerNav);
    formHeader.appendChild(exitButton);
    formDiv.appendChild(formHeader);
    formDiv.appendChild(formContent);
    body.appendChild(formDiv);

    return { formDiv, formContent, exitButton };
}

function createAddForm() {
    const formNav = createHeaderNav();
    const addForm = createAddFormLayout(formNav.headerNav);
    return { addForm, formNav };

}

export { createAddForm };