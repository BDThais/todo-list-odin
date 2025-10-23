import { updateProjectTab } from "../views/project-tab";
import { projectTab } from "../data_model/data-model";
import { updateTodoTab } from "../views/todo-tab";
import { activeProject } from "./active-project-handler";

function updateProject() {
    if (!(projectTab.noActiveProject())) {
        updateProjectTab();
        activeProject.updateActiveProject();
        updateTodoTab();
    }
    else {
        projectTab.initializeData();
    }

}

export { updateProject, }