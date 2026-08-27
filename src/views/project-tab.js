import { projectTab } from "../data_model/data-model";
import { activeProject } from "../controllers/active-project-handler";

function createProjectDiv(project) {
    const projectDiv = document.createElement('div');
    const projectLabel = document.createElement('label');
    const deleteButton = document.createElement('button');
    projectLabel.textContent = project.name;
    deleteButton.textContent = '🗑️';

    projectDiv.classList.add("project-label-div");
    if (activeProject.getCurrentActive() === project) {
        projectDiv.classList.add("active-project-field-wrapper");
    }
    deleteButton.setAttribute('type', 'button');

    projectDiv.appendChild(projectLabel);
    projectDiv.appendChild(deleteButton);

    projectDiv.addEventListener("click", (event) => {
        if (event.target !== deleteButton) {
            activeProject.updateActiveProject(project);
        }
    });

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        projectTab.deleteProject(project);
    });

    return projectDiv;
}

function updateProjectTab() {
    const projectTabContent = document.querySelector('.project-tab-content');
    projectTabContent.innerHTML = "";

    if (projectTab.projectList.length !== 0) {
        projectTab.projectList.forEach((element) => {
            projectTabContent.appendChild(createProjectDiv(element));
        });
    }

}

export { updateProjectTab, }