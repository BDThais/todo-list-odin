import { projectTab } from "../data_model/data-model";
import { updateTodoTab } from "../views/todo-tab";
import { Project } from "../data_model/data-model";
import { updateActiveField } from "../views/add-todo-form";

class ActiveProjHandler {
    constructor() {
        this.activeProject;
    }
    set0ActiveProject() {
        this.activeProject = new Project();
    }
    getCurrentActive() { return this.activeProject; }
    getCurrentActiveIndex() {
        for (let i = 0; i < projectTab.projectList.length; ++i) {
            if (projectTab.projectList[i] === this.activeProject) {
                return i;
            }
        }
    }
    updateActiveProject(project) {
        if (project !== undefined) {
            this.activeProject = project;
            updateTodoTab();
            updateActiveField(activeProject.getCurrentActive().name);
        }
        else if (projectTab.projectList.length > 0) {
            this.activeProject = projectTab.projectList[projectTab.projectList.length - 1];
            updateTodoTab();
        }
        
    }
}

let activeProject = new ActiveProjHandler();

export { activeProject };