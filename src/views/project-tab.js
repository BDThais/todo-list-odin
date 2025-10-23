import { projectTab } from "../data_model/data-model";
import { activeProject } from "../controllers/active-project-handler";

function createProjectDiv(project) {
    const projectDiv = document.createElement('div');
    const projectLabel = document.createElement('label');
    const deleteButton = document.createElement('button');
    projectLabel.textContent = project.name;
    deleteButton.textContent = '🗑️';

    projectDiv.classList.add("project-label-div");
    deleteButton.setAttribute('type', 'button');

    projectDiv.appendChild(projectLabel);
    projectDiv.appendChild(deleteButton);

    projectLabel.addEventListener("click", () => {
        return activeProject.updateActiveProject(project);
    })

    deleteButton.addEventListener("click", () => projectTab.deleteProject(project))

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