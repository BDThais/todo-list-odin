import { projectTab } from "../data_model/data-model";
import { updateTodoTab } from "../views/todo-tab";
import { Project } from "../data_model/data-model";
import { updateActiveField } from "../views/add-todo-form";
import { updateProjectTab } from "../views/project-tab";

class ActiveProjHandler {
    constructor() {
        this.activeProject = null;
        this.activeProjectIndex = -1;
    }
    set0ActiveProject() {
        this.activeProject = new Project();
        this.activeProjectIndex = -1;
    }
    getCurrentActive() { return this.activeProject; }
    getCurrentActiveIndex() {
        if (this.activeProject === null) {
            return -1;
        }

        const index = projectTab.projectList.findIndex((project) => project === this.activeProject);
        if (index >= 0) {
            this.activeProjectIndex = index;
            return index;
        }

        return this.activeProjectIndex;
    }
    updateActiveProject(project) {
        if (project !== undefined) {
            this.activeProject = project;
            this.activeProjectIndex = projectTab.projectList.findIndex((item) => item === project);
            updateProjectTab();
            updateTodoTab();
            if (this.activeProject !== null) {
                updateActiveField(this.activeProject.name);
            }
            return;
        }

        if (projectTab.projectList.length > 0) {
            this.activeProject = projectTab.projectList[projectTab.projectList.length - 1];
            this.activeProjectIndex = projectTab.projectList.length - 1;
            updateProjectTab();
            updateTodoTab();
        }
    }
}

let activeProject = new ActiveProjHandler();

export { activeProject };